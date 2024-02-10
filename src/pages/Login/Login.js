import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/UseAuthentication";
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="login">
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Senha:</span>
          <input
            type="Password"
            name="Password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde ...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
