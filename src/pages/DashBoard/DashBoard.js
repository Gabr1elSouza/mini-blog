import "./Dashboard.css";

import { Link } from "react-router-dom";

//hooks
import { useAuthValue } from "../../Context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const DashBoard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //post do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className="noposts">
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create">Criar primeiro post</Link>
        </div>
      ) : (
        <>
          <div className="post_header">
            <span>Titulo</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div className="post_row" key={post.id}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default DashBoard;
