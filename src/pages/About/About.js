import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h2>
        Sobre o Mini<span>BLOG</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito em React no front-en e Firebase
        no back-end
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
