import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AccountInfo, UserMetrics, JWTData } from '../../../shared-types/index';
import { getAccount, getUserMetrics, getFollowStatus, followUser, unfollowUser } from '@/services/accountService';
import FollowersModal from '@/components/followersModal';
import FollowingModal from '@/components/followingModal';
import DeleteAccountModal from '@/components/deleteAccountModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setAccount] = useState<AccountInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const authToken = Cookies.get('authToken');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  let accountId = null;

  if (authToken) {
    const decoded = jwtDecode(authToken);
    accountId = (decoded as JWTData).id;
  }

  const isOwner = accountId?.toString() === id?.toString();

  const handleUserInfo  = async () => {
    if (!id) {
      setError('No account ID provided');
      return;
    }

    setError(null);

    try {
      const account = await getAccount(id);
      setAccount(account);

      const metrics = await getUserMetrics(id);
      setMetrics(metrics);
      
    } catch (err) {
      setError('Failed to load user account');
      console.error('Failed loading user account:', err)
    }
  };

  const handleFollow = async () => {
    if (!id) return;
    try {
      if (isFollowing) {
        await unfollowUser(id);
        setIsFollowing(false);
      } else {
        await followUser(id);
        setIsFollowing(true);
      }
      const newMetrics = await getUserMetrics(id);
      setMetrics(newMetrics);
    } catch (err) {
      console.error('Failed to update follow status:', err);
    }
  };

  const checkFollowStatus = async () => {
    if (!id) return;
    try {
      const status = await getFollowStatus(id);
      setIsFollowing(status);
    } catch (err) {
      console.error('Failed to get follow status:', err);
    }
  };

  useEffect(() => {
    if (id) {
      handleUserInfo();
      if (authToken) {
        checkFollowStatus();
      }
    }
  }, [id, authToken]);

  return (
    <div className="p-6">

      {error && (
        <p className="text-red-500 mb-4">Error: {error}</p>
      )}

      <div className='flex flex-row justify-between items-center mb-4'>
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold">
            {user ? `${user.display_name} (@${user.username})` : `Account ${id}`}
          </h1>
          {!isOwner && authToken && (
            <Button onClick={handleFollow} variant={isFollowing ? 'secondary' : 'default'}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
        
        {isOwner && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='p-2 rounded-md hover:bg-gray-200 cursor-pointer'><EllipsisVertical className="w-6 h-6" /></div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowDeleteConfirm(true)}>
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      
      < DeleteAccountModal 
        open={showDeleteConfirm} 
        onOpenChange={setShowDeleteConfirm}
      />
      
      <div className="flex !flex-row items-center gap-8">
        <FollowersModal followerCount={metrics?.follower_count} />
        <FollowingModal followingCount={metrics?.following_count}/>
      </div>

      <p className="text-gray-600 text-sm my-2">
        {metrics?.member_since
          ? `Member since ${new Date(metrics.member_since).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}`
          : ''}
      </p>
      <Tabs defaultValue="recipes" className="justify-center w-full">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="recipes">
              <div>
                {metrics?.recipe_count === 1
                  ? '1 recipe uploaded'
                  : `${metrics?.recipe_count ?? 0} recipes uploaded`}
              </div>
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <div>
                {metrics?.review_count === 1
                  ? '1 review made'
                  : `${metrics?.review_count ?? 0} reviews made`}
              </div>
            </TabsTrigger>
            {isOwner && (
              <TabsTrigger value="savedRecipes">
                <div>
                  {metrics?.savedrecipe_count === 1
                    ? '1 recipe saved'
                    : `${metrics?.savedrecipe_count ?? 0} recipes saved`}
                </div>
              </TabsTrigger>
            )}
          </TabsList>
        </div>
          <TabsContent value="savedRecipes">View your saved recipes.</TabsContent>
          <TabsContent value="reviews">View all your reviews.</TabsContent>
          <TabsContent value="recipes">View your uploaded recipes.</TabsContent>
        </Tabs>
    </div>
  );
}

export default UserPage; 