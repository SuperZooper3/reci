import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FollowAccountInfo } from '../../../shared-types/index';
import { getAccountsFollowers } from '@/services/accountService';

export default function FollowersModal() {
    const [open, setOpen] = useState(false)

    const { id } = useParams<{ id: string }>();
    const [followerAccounts, setFollowerAccounts] = useState<FollowAccountInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleLoadFollowers = async () => {
      if (!id) {
        setError('No account ID provided');
        return;
      }
  
      setLoading(true);
      setError(null);
      
      try {
        const accounts = await getAccountsFollowers(id);
        setFollowerAccounts(accounts);
      } catch (err) {
        setError('Failed to load following accounts');
        console.error('Error loading following accounts:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (id) handleLoadFollowers();
    }, [id]);

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen) {
        handleLoadFollowers(); // load again when modal is opened
      }
    };

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
            <Button variant="ghost"> {followerAccounts.length} followers</Button>
        </DialogTrigger>

        <DialogContent className="w-[400px] h-[500px] p-6 flex flex-col">
            <DialogHeader className="bg-background z-10">
              <DialogTitle>Followers</DialogTitle>
            </DialogHeader>

            {error && (
              <div className="text-red-500 mb-4">
                Error: {error}
              </div>
            )}

            {followerAccounts.length > 0 ? (
              <div className="mt-4 overflow-y-auto max-h-[50vh] pr-2">
                <ScrollArea>
                  {/* TODO: first account is hiddne by title */}
                    <ul className="space-y-2">
                    {followerAccounts.map((account, index) => (
                      <li 
                        key={index} 
                        className="p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-50"
                      >
                        <div className="flex justify-between !items-start">
                          <div className="flex !items-start">
                            <h3 className="font-medium">{account.display_name}</h3>
                            <p className="text-sm text-gray-600">@{account.username}</p>
                          </div>
                        </div>
                      </li>
                  ))}
                  </ul>
                </ScrollArea>
                </div>
            ) : (
            <p className="text-gray-500">
                {loading ? 'Loading follower accounts...' : 'No follower accounts found'}
            </p>
            )}

        </DialogContent>
      </Dialog>
  )
}