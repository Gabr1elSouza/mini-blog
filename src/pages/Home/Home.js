import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import "./Home.css";

//components
import PostDetails from "../../Components/PostDetail/PostDetails";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home">
      <h1>Veja os nosso posts mais recentes</h1>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não foram encotrados posts</p>
            <Link to="/posts/create">Criar primeiro post</Link>
          </div>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
