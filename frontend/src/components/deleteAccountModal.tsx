import { Button } from "@/components/ui/button"
import { deleteAccount } from '@/services/accountService';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteAccountModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
    const navigate = useNavigate();

    const handleDeleteAccount = async() => {
        try {
            await deleteAccount();
            //From FE, can only delete cookie by overriding with expiry in the past
            document.cookie = "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
            navigate("/");
            window.location.reload();
        } catch(e) {
            alert(e);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. Your account will be permanently deleted.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}