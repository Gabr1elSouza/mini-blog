import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/UseAuthentication";
import "./Register.css";

const Register = () => {
  const [displayname, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setCorfimPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayname,
      email,
      password,
    };
    if (password !== ConfirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="register">
      <h1>Cadastra-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do Usuário"
            value={displayname}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label htmlFor="">
          <span>Confirmação de senha:</span>
          <input
            type="Password"
            name="ConfirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={ConfirmPassword}
            onChange={(e) => setCorfimPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
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

export default Register;
