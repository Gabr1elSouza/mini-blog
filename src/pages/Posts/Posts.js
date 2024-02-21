import "./Posts.css";

//hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/UseFetchDocument";

const Posts = () => {
  const { id } = useParams();
  const {document:post}= useFetchDocument("posts",id)
  return (
    <div>
      {post && (
        <>
        <h1>{post.title}</h1></>
      )}
    </div>
  );
};

export default Posts;