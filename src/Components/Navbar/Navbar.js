import { NavLink } from "react-router-dom";

import { useAuthValue } from "../../Context/AuthContext";

import { useAuthentication } from "../../hooks/UseAuthentication";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav>
      <a className="brand" href="/">
        Mini<span>Blog</span>
      </a>
      <ul className="links_list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/Login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Cadastrar</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create">Novo Post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">Sobre</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
