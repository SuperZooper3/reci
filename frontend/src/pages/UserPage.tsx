import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AccountInfo } from '../../../shared-types/index';
import { getAccount } from '@/services/accountService';
import FollowersModal from '@/components/followersModal';
import FollowingModal from '@/components/followingModal';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setAccount] = useState<AccountInfo| null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <h1 className="text-2xl font-bold mb-4">
        {user ? `${user.display_name} (@${user.username})` : `Account ${id}`}
      </h1>
      <div className="flex !flex-row items-center gap-2">
        <FollowersModal />
        <FollowingModal />
      </div>
    </div>
  );
}

export default UserPage; 