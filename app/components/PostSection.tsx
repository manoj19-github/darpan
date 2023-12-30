import { fetchPostsAction } from "@/actions/fetchPosts";
import { FC } from "react";
import PostItem from "./PostItem";

interface PostSectionProps {}
const PostSection: FC<PostSectionProps> = async (): Promise<JSX.Element> => {
  const postResponse = await fetchPostsAction();
  console.log("postResponse: ", postResponse);
  return (
    <div className="mt-[40px]">
      {postResponse.map((self, index) => (
        <PostItem key={self.id} postDetails={self} />
      ))}
    </div>
  );
};

export default PostSection;
