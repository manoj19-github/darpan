import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileURL: z.string().url(),
  caption: z.string().optional(),
});

export const CreatePostSchema = PostSchema.omit({ id: true });
export const UpdatePostSchema = PostSchema;
export const DeletePostSchema = PostSchema.pick({ id: true });
