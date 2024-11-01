"use client";
import { Button } from "@/components/ui/button";
import * as zod from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChannelCreateSchema } from "@/formSchema/channel.schema";
import useIsMounted from "@/hooks/useIsMounted";
import { useCreateChannelModal } from "@/stores/useCreateChannelModal";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import useAppState from "@/stores/useAppState";
import toast from "react-hot-toast";
import useCreateChannel from "@/hooks/useCreateChannel";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

type CrteateChannelModalProps = {};
const CreateChannelModal: FC<CrteateChannelModalProps> = (): JSX.Element => {
  const isMounted = useIsMounted();
  const appState = useAppState();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const formControl = useForm({
    resolver: zodResolver(ChannelCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const [showModal, setShowModal] = useCreateChannelModal();
  const { mutate, isPending, error } = useCreateChannel();

  const onSubmitHandler = async (
    values: zod.infer<typeof ChannelCreateSchema>
  ) => {
    console.log("values: ", values);
    appState.setIsLoading(true);

    mutate(
      {
        workspaceId,
        name: values.name,
      },
      {
        onSetteled() {
          appState.setIsLoading(false);
        },
        onSuccess(newChannelId: Id<"channels">) {
          toast.success("Channel created successfully");
          setShowModal(false);
          router.replace(
            `/main/workspaces/${workspaceId}/channel/${newChannelId}`
          );
        },
        onError(error) {
          toast.error(error.message ?? "Something went wrong");
        },
      }
    );
  };

  useEffect(() => {
    if (!showModal) formControl.reset();
  }, [showModal]);
  useEffect(() => {
    if (formControl.watch("name") !== "") {
      const newVal = formControl
        .watch("name")
        .replace(/\s+/g, "-")
        .toLowerCase(); // replace spaces with dashes and make lowercase;
      formControl.setValue("name", newVal);
    }
  }, [formControl.watch("name")]);
  if (!isMounted) return <></>;

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <Form {...formControl}>
          <form
            className="space-y-4"
            onSubmit={formControl.handleSubmit(onSubmitHandler)}
          >
            <FormField
              control={formControl.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. plan-budget"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end w-full">
              <Button disabled={false} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
