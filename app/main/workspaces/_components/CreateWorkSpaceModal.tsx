"use client";
import Z from "zod";
import React, { FC, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWorkSpaceModal } from "@/hooks/useWorkSpaceModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/formSchema/authSchema.schema";
import { CreateWorkSpaceSchema } from "@/formSchema/workSpace.schema";
import useAppState from "@/stores/useAppState";
import { Button } from "@/components/ui/button";
import useCreateWorkSpace from "@/hooks/useCreateWorkSpace";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useIsMounted from "@/hooks/useIsMounted";

type CreateWorkSpaceModalProps = {};
const CreateWorkSpaceModal: FC<CreateWorkSpaceModalProps> = (): JSX.Element => {
  const [workSpaceModalIsOpen, setWorkSpaceModalIsOpen] = useWorkSpaceModal();
  const { mutate, isPending, error } = useCreateWorkSpace();
  console.log("error: ", error);
  const isMounted = useIsMounted();
  const appState = useAppState();
  const router = useRouter();
  const formControls = useForm<Z.infer<typeof CreateWorkSpaceSchema>>({
    resolver: zodResolver(CreateWorkSpaceSchema),
  });
  const onSubmitHandler = async (
    values: Z.infer<typeof CreateWorkSpaceSchema>
  ) => {
    const data = await mutate(values, {
      onError() {},
      onSuccess(workspaceId) {
        setWorkSpaceModalIsOpen(false);
        toast.success("Workspace created successfully");
        router.push(`/main/workspaces/${workspaceId}`);
      },
    });
  };
  console.log("formControls ", formControls.formState.errors);
  useEffect(() => {
    if (!workSpaceModalIsOpen) {
      formControls.reset();
    }
  }, [workSpaceModalIsOpen]);
  if (!isMounted) return <></>;
  return (
    <Dialog
      open={workSpaceModalIsOpen}
      onOpenChange={() => setWorkSpaceModalIsOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your teams
          </DialogDescription>
        </DialogHeader>

        <Form {...formControls}>
          <form
            className="space-y-5"
            onSubmit={formControls.handleSubmit(onSubmitHandler)}
          >
            <FormField
              control={formControls.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Workspace name e.g. 'work', 'company','home' "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center  w-full justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="gap-x-2"
                size="lg"
              >
                Continue
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceModal;
