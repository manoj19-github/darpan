import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileURL: z.string({ required_error: "File URL must be a valid URL" }).url(),
  caption: z.string().optional(),
});

export const CreatePostSchema = PostSchema.omit({ id: true });
export const UpdatePostSchema = PostSchema;
export const DeletePostSchema = PostSchema.pick({ id: true });
export const likePostSchema = z.object({
  postId: z.string(),
});

export const bookmarkPostSchema = z.object({
  postId: z.string(),
});

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  postId: z.string(),
});
export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });
