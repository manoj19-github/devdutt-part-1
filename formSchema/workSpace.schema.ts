import Z from "zod";

export const CreateWorkSpaceSchema = Z.object({
  name: Z.string().min(1, "Name is required"),
});
