import { useState } from 'react';
import './App.css';

const usuarios = [
  { username: "admin", password: "1234", tipo: "admin"},
  { username: "gestor", password: "1234", tipo: "gestor" },
  { username: "analista", password: "1234", tipo: "analista" }
];

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    const encontrado = usuarios.find(
      u => u.username === user && u.password === pass
    );

    if (encontrado) {
      onLogin(encontrado);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>

        {erro && <p className="erro">{erro}</p>}
      </div>
    </div>
  );
}

export default Login;