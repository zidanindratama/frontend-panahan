import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { OctagonAlert } from "lucide-react";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
}

export const ConfirmDialog = ({
  trigger,
  title = "Apakah kamu yakin?",
  description = "Aksi ini tidak bisa dibatalkan.",
  onConfirm,
  confirmText = "Lanjutkan",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
