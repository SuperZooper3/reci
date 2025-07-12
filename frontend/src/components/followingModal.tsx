import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import type { FollowAccountInfo } from '../../../shared-types/index';
import { getAccountsFollowing } from '@/services/accountService';

export default function FollowingModal() {
    const [open, setOpen] = useState(false)

    const { id } = useParams<{ id: string }>();
    const [followingAccounts, setFollowingAccounts] = useState<FollowAccountInfo[]>([]);
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
      if (id) handleLoadFollowing();
    }, [id]);

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen) {
        handleLoadFollowing(); // load again when modal is opened
      }
    };

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
            <Button variant="ghost">{followingAccounts.length} following</Button>
        </DialogTrigger>

        <DialogContent className="w-[400px] h-[500px] p-6 flex flex-col">
            <DialogHeader className="bg-background">
                <DialogTitle>Following</DialogTitle>
            </DialogHeader>

            {error && (
            <div className="text-red-500 mb-4">
                Error: {error}
            </div>
            )}

            <div className="mt-4 overflow-y-auto max-h-[60vh]">
            {followingAccounts.length > 0 ? (
                <ScrollArea>
                    {/* TODO: first account is hiddne by title */}
                    <ul className="space-y-2">
                        {followingAccounts.map((account, index) => (
                            <li
                            key={index}
                            className="p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-50"
                            >
                            <Link onClick = {() => setOpen(false)} to={`/account/${account.id}`} className="flex flex-col items-start">
                                <h3 className="font-medium">{account.display_name}</h3>
                                <p className="text-sm text-gray-600">@{account.username}</p>
                            </Link>
                            </li>
                        ))}
                        </ul>
                </ScrollArea>
            ) : (
                <p className="text-gray-500">
                {loading
                    ? 'Loading following accounts...'
                    : 'No following accounts found'}
                </p>
            )}
            </div>
        </DialogContent>
        </Dialog>
  )
}