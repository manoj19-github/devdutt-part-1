import Z from "zod";

export const loginSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: Z.string().min(1, {
    message: "Please confirm your password",
  }),
}).superRefine((val, ctx) => {
  if (val.password.trim() !== val.confirmPassword.trim()) {
    ctx.addIssue({
      code: Z.ZodIssueCode.custom,
      message: "Password is not the same as confirm password",
      path: ["confirmPassword"],
    });
  }
});