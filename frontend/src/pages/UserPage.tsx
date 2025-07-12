import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { AccountInfo, UserMetrics, JWTData } from '../../../shared-types/index';
import { getAccount, getUserMetrics, deleteAccount } from '@/services/accountService';
import FollowersModal from '@/components/followersModal';
import FollowingModal from '@/components/followingModal';
import DeleteAccountModal from '@/components/deleteAccountModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const authToken = Cookies.get('authToken');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  let accountId = null;

  if (authToken) {
    const decoded = jwtDecode(authToken);
    console.log(decoded); 
    accountId = (decoded as JWTData).id;
  }

  const isOwner = accountId?.toString() === id?.toString();

  const handleUserInfo  = async () => {
    if (!id) {
      setError('No account ID provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const account = await getAccount(id);
      setAccount(account);

      const metrics = await getUserMetrics(id);
      setMetrics(metrics);
      
    } catch (err) {
      setError('Failed to load user account');
      console.error('Failed loading user account:', err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleUserInfo();
    }
  }, [id]);

  return (
    <div className="p-6">
    
      {loading && (
        <p className="text-gray-500 mb-4">Loading user account...</p>
      )}

      {error && (
        <p className="text-red-500 mb-4">Error: {error}</p>
      )}

      <div className='flex flex-row justify-between'>
        <h1 className="text-2xl font-bold mb-4">
          {user ? `${user.display_name} (@${user.username})` : `Account ${id}`}
        </h1>

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
      
      <div className="flex !flex-row items-center gap-2">
        <FollowersModal />
        <FollowingModal />
      </div>

      <p className="text-gray-600 text-sm m-2">
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