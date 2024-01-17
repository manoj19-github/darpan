import fetchPostById from "@/actions/fetchPostById";
import ViewPostSkeleton from "@/components/ViewPostSkeleton";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import PostView from "../../components/PostView";

interface IParams {
  id: string;
}
interface PostModalProps {
  params: IParams;
}

const PostModal: FC<PostModalProps> = async ({
  params,
}): Promise<JSX.Element> => {
  const postDetails = await fetchPostById(params.id);
  if (!postDetails) return notFound();

  return <PostView id={params.id} postDetails={postDetails} />;
};

export default PostModal;
