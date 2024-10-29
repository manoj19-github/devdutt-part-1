import Z from "zod";
export const ChannelCreateSchema = Z.object({
  name: Z.string()
    .min(3, { message: "Channel name is required" })
    .refine((name) => name.toLowerCase() !== "general", {
      message: "Channel name cannot be 'general'",
    }),
});
