import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AccountInfo, JWTData, UserMetrics } from '../../../shared-types/index';
import { followAccount, getAccount, getAccountsFollowers, getUserMetrics, unfollowAccount } from '@/services/accountService';
import FollowersModal from '@/components/followersModal';
import FollowingModal from '@/components/followingModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoggedIn] = useState(Cookies.get('authToken'));

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

  const handleFollow = async () => {
    if (!isLoggedIn || !id) {
      return;
    }

    if (isFollowing) {
      try {
        await unfollowAccount(id);
        setIsFollowing(false);
      }
      catch(e) {
        alert(e);
      }
    }

    else {
      try {
        await followAccount(id);
        setIsFollowing(true);
      }
      catch(e) {
        alert(e);
      }
    }
  }

  const checkIsFollowing = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const authToken = Cookies.get('authToken');
      const decoded = jwtDecode(authToken!)
      const loggedInID = (decoded as JWTData).id;
      const accountFollowers = await getAccountsFollowers(id!);
      if (accountFollowers.some(follower => follower.id === loggedInID)) {
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Failed to check following status:', err);
    }
  }

  useEffect(() => {
    if (id) {
      handleUserInfo();
      checkIsFollowing();
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
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">
          {user ? `${user.display_name} (@${user.username})` : `Account ${id}`}
        </h1>
        {isLoggedIn && <Button onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>}
      </div> 
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
      <Tabs defaultValue="recipes" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="recipes">
            <div>
              {metrics?.recipe_count === 1
                ? '1 recipe uploaded'
                : `${metrics?.recipe_count ?? 0} recipes uploaded`}
            </div>
          </TabsTrigger>
          <TabsTrigger value="savedRecipes">
            <div>
              {metrics?.savedrecipe_count === 1
                ? '1 recipe saved'
                : `${metrics?.savedrecipe_count ?? 0} recipes saved`}
            </div>
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <div>
              {metrics?.review_count === 1
                ? '1 review made'
                : `${metrics?.review_count ?? 0} reviews made`}
            </div>
          </TabsTrigger>
          
        </TabsList>
        <TabsContent value="savedRecipes">View your saved recipes.</TabsContent>
        <TabsContent value="reviews">View all your reviews.</TabsContent>
        <TabsContent value="recipes">View your uploaded recipes.</TabsContent>
      </Tabs>
    </div>
  );
}

export default UserPage; 