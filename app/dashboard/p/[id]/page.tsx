import React, { FC } from "react";
interface IParams {
  id: string;
}
interface PostPageProps {
  params: IParams;
}

const PostPage: FC<PostPageProps> = ({ params }): JSX.Element => {
  return <div>PostPage</div>;
};

export default PostPage;
