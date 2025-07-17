import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AccountInfo, UserMetrics, JWTData, Recipe, Review } from '../../../shared-types/index';
import { getAccount, getUserMetrics, getFollowStatus, followUser, unfollowUser } from '@/services/accountService';
import { getRecipesFromAccount, getSavedRecipes } from '@/services/recipeService';
import { getReviewsByAccount } from '@/services/reviewService';

import FollowersModal from '@/components/followersModal';
import FollowingModal from '@/components/followingModal';
import DeleteAccountModal from '@/components/deleteAccountModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import RecipeCard from '@/components/recipeCard';
import ReviewCard from '@/components/reviewCard';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setAccount] = useState<AccountInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const authToken = Cookies.get('authToken');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [recipes, setRecipesFromAccount] = useState<Recipe[]>([]);
  const [reviews, setReviewsFromAccount] = useState<Review[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  let accountId = null;

  if (authToken) {
    const decoded = jwtDecode(authToken);
    accountId = (decoded as JWTData).id;
  }

  const isOwner = accountId?.toString() === id?.toString();

  const handleGetUserRecipes = async () => {
    if (!id) {
      setError('No account ID provided');
      return;
    }

    try {
      const recipes = await getRecipesFromAccount(id);
      setRecipesFromAccount(recipes);
    } catch (err) {
      setError('Failed to load user recipes');
      console.error('Failed loading user recipes:', err)
    }
  };

  const handleGetUserReviews = async () => {
    if (!id) {
      setError('No account ID provided');
      return;
    }

    try {
      const reviews = await getReviewsByAccount(id);
      setReviewsFromAccount(reviews);
    } catch (err) {
      setError('Failed to load user reviews');
      console.error('Failed loading user reviews:', err)
    }
  };

  const handleGetSavedRecipes = async () => {
    try {
      const recipes = await getSavedRecipes();
      setSavedRecipes(recipes);
    } catch (err) {
      setError('Failed to load saved recipes');
      console.error('Failed loading saved recipes:', err)
    }
  };

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
      handleGetUserRecipes();
      handleGetUserReviews();
      if (isOwner) {
        handleGetSavedRecipes();
      }
      if (authToken) {
        checkFollowStatus();
      }
    }
  }, [id, authToken, isOwner]);

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
          <TabsContent value="savedRecipes">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </TabsContent>
          <TabsContent value="reviews">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </TabsContent>
          <TabsContent value="recipes">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </TabsContent>
        </Tabs>
    </div>
  );
}

export default UserPage; 