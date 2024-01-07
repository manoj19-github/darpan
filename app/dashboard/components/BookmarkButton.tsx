import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import React, { FC } from "react";

interface BookmarkButtonProps {
  post: PostWithExtras;
  userId?: string;
}

const BookmarkButton: FC<BookmarkButtonProps> = (): JSX.Element => {
  return <div>BookmarkButton</div>;
};

export default BookmarkButton;
