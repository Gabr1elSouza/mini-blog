import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { UseInsertDocument } from "../../hooks/useInsertDocuments";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();
  const { insertDocument, response } = UseInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //Criar o array de tags
    const tagsAray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os dados!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsAray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    

    //redirect Home page
    navigate("/");
  };

  

  return (
    <div className="create_post">
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser a compartilhar o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde ...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
