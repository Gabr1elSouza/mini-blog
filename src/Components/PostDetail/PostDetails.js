import { Link } from "react-router-dom";
import "./PostDetails.css";

const PostDetails = ({ post }) => {
  console.log(post.tagsAray);
  return (
    <div className="post_details">
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className="createdby">{post.createdBy}</p>
      <div className="tags">
        {post.tagsAray.map((tag) => {
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>;
        })}
      </div>
      <Link to={`/posts/${post.id}`}>Ler</Link>
    </div>
  );
};

export default PostDetails;
