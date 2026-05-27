import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';


const API = "https://musical-fishstick-r4pp9p547qqgf5g97-3000.app.github.dev";

function App() {
  const [dados, setDados] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [filtroData, setFiltroData] = useState("");


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
  const [produto, valor, data] = l.split(',');

  return {
    produto,
    valor: Number(valor),
      data: data?.trim() 
  };
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

  const dadosFiltrados = filtroData
  ? dados.filter(v => v.data === filtroData)
  : dados;  

  const total = dadosFiltrados.reduce((a, b) => a + b.valor, 0);

 const media = dadosFiltrados.length ? (total / dadosFiltrados.length).toFixed(2) : 0;

 const maior = dadosFiltrados.length
      ? Math.max (...dadosFiltrados.map(v => v.valor || 0))
      : 0;

      const produtos = {};
      
      dadosFiltrados.forEach (v => {
      if (!produtos[v.produto]) {
      produtos[v.produto] = 0;
      }
      produtos[v.produto] += v.valor || 0;
      });

      const ranking =Object.entries(produtos)
      .sort((a,b) => b[1] - a[1]);


const alertas = [];

if (maior > 200) {
  alertas.push("🔥 Venda muito alta detectada!");
}

if (media < 100 && dadosFiltrados.length > 0) {
  alertas.push("⚠️ Média de vendas baixa!");
}

if (dadosFiltrados.length === 0) {
  alertas.push("📭 Nenhum dado encontrado para o filtro selecionado.");
}

// produto com baixo desempenho
ranking.slice(-1).forEach(([produto, total]) => {
  if (total < 100) {
    alertas.push(`📉 Produto com baixo desempenho: ${produto}`);
  }
});

  return (

    <div className="container">

      <h2>Bem-vindo, {usuario.username} 👋</h2>


      <p className="info">
  Este sistema permite a importação e análise de dados de vendas por meio de arquivos CSV. Para começar, basta importar uma planilha no formato correto.
</p>



      <button onClick={() => setUsuario(null)}>Sair</button>

      <h1>📊 Varejo BI Dashboard</h1>
    
    {alertas.length > 0 && (
  <div className="card" style={{ background: "#1e293b5" }}>
    <h3>🚨 Alertas</h3>
    <ul>
      {alertas.map((a, i) => (
        <li key={i}>{a}</li>
      ))}
    </ul>
  </div>
)}


      <div className="card">
  <h3>📅Filtro</h3>

  <input
    type="date"
    value={filtroData}
    onChange={(e) => setFiltroData(e.target.value)}
    style={{
      width: "200px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #2563eb",
      marginTop: "8px",
      fontSize: "14px",
      outline: "none"
    }}
  />
</div>

      <div className="card upload">
        <h3>📂Importar Planilha</h3>
        <label
    style={{
      display: "inline-block",
      background: "#2563eb",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500"
    }}
  >
    Selecionar arquivo
    <input
      type="file"
      onChange={importar}
      style={{ display: "none" }}
    />
  </label>
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Total de Vendas</h3>
          <p>R$ {total}</p>
        </div>

  <div className="card">
          <h3>Média</h3>
          <p>R$ {media}</p>
        </div>


        
  <div className="card">
          <h3>Maior venda</h3>
          <p>R$ {maior}</p>
        </div>
         
         <div className="card">
  <h3>🏆 Ranking de Produtos</h3>

  <ul>
    {ranking.slice(0, 5).map(([produto, total], i) => (
      <li key={i}>
        {i + 1}º - {produto}: R$ {total}
      </li>
    ))}
  </ul>
</div>



        <div className="card">
          <h3>Quantidade</h3>
          <p>{dadosFiltrados.length}</p>
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
            {dadosFiltrados.map(v => (
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