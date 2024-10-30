import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

type ConfirmDialogProps = {
  isOpen: boolean;
  handleIsOpen: () => void;
  title: string;
  description: string;
  cancelAction: () => void;
  confirmAction: () => void;
};
const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  handleIsOpen,
  title,
  description,
  cancelAction,
  confirmAction,
}): JSX.Element => {
  return (
    <Dialog onOpenChange={handleIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-lg">
            {description}
          </DialogDescription>
          <DialogFooter>
            <div className="flex w-full flex-row items-center justify-around mt-5">
              <Button onClick={cancelAction} variant={"outline"}>
                Cancel
              </Button>
              <Button onClick={confirmAction} variant={"default"}>
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
