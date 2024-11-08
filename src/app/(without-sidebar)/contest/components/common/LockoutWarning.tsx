import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

const LockoutWarning = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lockout Warning</AlertDialogTitle>
          <AlertDialogDescription>
            You are locked from attempting this contest because you tried to
            exit the full screen or switch to another tab or window.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LockoutWarning;
