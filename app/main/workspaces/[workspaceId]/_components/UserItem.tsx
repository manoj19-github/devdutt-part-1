import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const userItemVariantProps = cva(
  "flex items-center gap-1.5 hover:bg-white/70 duration-200 transition-all justify-start font-normal h-7 px-4 text-sm overflow-hidden hover:text-[#be185d] ",
  {
    variants: {
      variant: {
        default:
          "text-[#f9edffcc]  transition duration-200 hover:text-[#be185d]",
        active:
          "text-[#be185d] bg-white/80  text-[17px] hover:bg-white transition duration-200",
      },
    },
  }
);

type UserItemProps = {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariantProps>["variant"];
};

const UserItem: FC<UserItemProps> = ({
  id,
  label,
  image,
  variant,
}): JSX.Element => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label?.charAt(0);
  return (
    <Button
      size={"sm"}
      variant={"transparent"}
      asChild
      className={cn({
        variant,
      })}
    >
      <Link href={`/workspaces/${workspaceId}/members/${id}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 rounded-full overflow-hidden   h-8 relative">
            {image ? (
              <Image src={image} alt={label ?? ""} fill />
            ) : (
              <>
                <Avatar className="size-5 rounded-md mr-1 ">
                  <AvatarImage
                    className="rounded-md  w-5 h-5"
                    src={image}
                    alt={label}
                  />
                  <AvatarFallback className="rounded-md bg-sky-500 text-white text-lg p-3 ">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
          <span className="text-base truncate">{label}</span>
        </div>
      </Link>
    </Button>
  );
};

export default UserItem;
