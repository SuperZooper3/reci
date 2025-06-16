import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import type { ListAccount } from '../../../shared-types/index';
import { getAccountsFollowing } from '@/services/accountService';

function FollowingPage() {
  const { id } = useParams<{ id: string }>();
  const [followingAccounts, setFollowingAccounts] = useState<ListAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadFollowing = async () => {
    if (!id) {
      setError('No account ID provided');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const accounts = await getAccountsFollowing(id);
      setFollowingAccounts(accounts);
    } catch (err) {
      setError('Failed to load following accounts');
      console.error('Error loading following accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadFollowing = async () => {
      if (!id) {
        setError('No account ID provided');
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const accounts = await getAccountsFollowing(id);
        setFollowingAccounts(accounts);
      } catch (err) {
        setError('Failed to load following accounts');
        console.error('Error loading following accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadFollowing();
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Following - Account {id}
      </h1>
      
      <div className="mb-4">
        <Button 
          onClick={handleLoadFollowing} 
          disabled={loading || !id}
          className="mr-2"
        >
          {loading ? 'Loading...' : 'Refresh Following'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      <div className="following-container">
        {followingAccounts.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Following ({followingAccounts.length} accounts)
            </h2>
            <ul className="space-y-2">
              {followingAccounts.map((account, index) => (
                <li 
                  key={index} 
                  className="p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{account.display_name}</h3>
                      <p className="text-sm text-gray-600">@{account.username}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">
            {loading ? 'Loading following accounts...' : 'No following accounts found'}
          </p>
        )}
      </div>
    </div>
  );
}

export default FollowingPage; 