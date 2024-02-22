import "./Dashboard.css";

import {Link} from "react-router-dom"

//hooks
import { useAuthValue} from '../../Context/AuthContext'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'

const DashBoard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  

  //post do usuario
  const{documents:posts, loading}= useFetchDocuments("posts", null, uid)

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length ===0 ?(
        <div className="noposts">
          <p>Não foram encontrados posts</p>
          <Link to='/posts/create'>Criar primeiro post</Link>
        </div>
      ): (<div className=""><p>tem posts</p></div> )}
      {posts && posts.map((post)=>(
        <h3>{post.title}</h3>
      ))}

    </div>
  );
};

export default DashBoard;
