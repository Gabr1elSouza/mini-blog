import "./Search.css";

import { Link } from "react-router-dom";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//components
import PostDetails from "../../Components/PostDetail/PostDetails";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className="search_container">
      <h2>Search</h2>
      {posts && posts.length === 0 && (
        <div className="noposts">
          <p>Não foram encontrados posts a partir da sua busca.</p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      <div>
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
