import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';


const API = "https://musical-fishstick-r4pp9p547qqgf5g97-3000.app.github.dev";

function App() {
  const [dados, setDados] = useState([]);
  const [usuario, setUsuario] = useState(null);


  const carregar = async () => {
    const res = await axios.get(`${API}/vendas`);
    setDados(res.data);
  };

  useEffect(() => {
    carregar();
  }, []);

   if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  const importar = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();

    const linhas = text.split('\n');

    const dadosFormatados = linhas.map(l => {
      const [produto, valor] = l.split(',');
      return { produto, valor: Number(valor) };
    });

    await axios.post(`${API}/vendas`, dadosFormatados);
    carregar();
  };

  const deletar = async (id) => {
    if (!window.confirm("Deseja excluir?")) return;
    await axios.delete(`${API}/vendas/${id}`);
    carregar();
  };

  const editar = async (id) => {
    const valor = prompt('Novo valor:');
    await axios.put(`${API}/vendas/${id}`, {
      valor: Number(valor)
    });
    carregar();
  };

  const total = dados.reduce((a, b) => a + b.valor, 0);

  return (
    <div className="container">

      <h2>Bem-vindo, {usuario.username} 👋</h2>


      <p className="info">
  Este sistema permite a importação e análise de dados de vendas por meio de arquivos CSV. Para começar, basta importar uma planilha no formato correto.
</p>



      <button onClick={() => setUsuario(null)}>Sair</button>

      <h1>📊 Varejo BI Dashboard</h1>

      <div className="card upload">
        <h3>Importar Planilha</h3>
        <input type="file" onChange={importar} />
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Total de Vendas</h3>
          <p>R$ {total}</p>
        </div>

        <div className="card">
          <h3>Quantidade</h3>
          <p>{dados.length}</p>
        </div>
      </div>

      <div className="card">
        <h3>Registros</h3>

        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(v => (
              <tr key={v.id}>
                <td>{v.produto}</td>
                <td>R$ {v.valor}</td>
                <td>
                  <button className="edit" onClick={() => editar(v.id)}>Editar</button>
                 {usuario.tipo === "admin" && (
                <button className="delete" onClick={() => deletar(v.id)}>Excluir</button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default App;