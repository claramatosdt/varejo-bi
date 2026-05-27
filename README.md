# 📊 Varejo BI Dashboard

Sistema de análise de dados para o setor de varejo, desenvolvido com foco em visualização de métricas, importação de dados e geração de insights para tomada de decisão.

---

## 📌 Descrição

O Varejo BI Dashboard é uma aplicação que permite a análise de dados de vendas a partir da importação de arquivos CSV. O sistema fornece métricas importantes, ranking de produtos e alertas inteligentes, auxiliando na interpretação dos dados de forma simples e eficiente.

O projeto simula um cenário real de Business Intelligence (BI), integrando frontend com API e aplicando lógica de análise de dados no cliente.

---

## 🎯 Objetivo

- Analisar dados de vendas de forma prática  
- Fornecer indicadores para tomada de decisão  
- Simular um sistema de BI aplicado ao varejo  
- Praticar integração entre frontend e API  

---

## 🚀 Funcionalidades

- 🔐 Sistema de login com níveis de acesso:
  - Admin
  - Gestor
  - Analista

- 📂 Importação de dados via arquivos CSV  

- 📊 Dashboard com métricas:
  - Total de vendas  
  - Média de vendas  
  - Maior venda  
  - Quantidade de registros  

- 🔎 Filtro por data  

- 🏆 Ranking de produtos por desempenho  

- ✏️ Edição de valores  

- 🗑️ Exclusão de registros (apenas admin)  

- 🚨 Sistema de alertas inteligentes:
  - Vendas muito altas  
  - Média de vendas baixa  
  - Períodos sem dados  
  - Produtos com baixo desempenho  

---

## 📂 Formato do CSV

O sistema aceita arquivos no seguinte padrão:

```csv
produto,valor,data
Arroz,120,2026-01-01
Feijão,90,2026-01-01
Macarrão,70,2026-01-02
⚠️ Regras importantes:
Separador: vírgula (,)
Data no formato: YYYY-MM-DD
▶️ Como executar o projeto
Frontend
npm install
npm run dev

Após executar, abra o projeto pelo navegador (porta do Codespaces).

Backend

A API utilizada já está hospedada e integrada ao sistema, não sendo necessário rodar localmente.

🔑 Acesso ao sistema

Usuários disponíveis para teste:

admin / 1234
gestor / 1234
analista / 1234
🛠️ Tecnologias Utilizadas
React
JavaScript
Axios
CSS
Node.js (API)
🧠 Conceitos aplicados
Manipulação de dados no frontend
Consumo de API REST
Lógica de negócios (métricas e cálculos)
Controle de acesso por tipo de usuário
Interface de dashboard (BI)
Experiência do usuário (UX)
💻 Execução em qualquer ambiente

O projeto pode ser executado facilmente em qualquer computador utilizando o GitHub Codespaces, sem necessidade de instalação local.

🎓 Projeto Acadêmico

Este projeto foi desenvolvido como parte das atividades acadêmicas, com foco na aplicação prática de conceitos de desenvolvimento de sistemas e análise de dados.

👨‍💻 Equipe
Maria Clara Matos
Kledson Tenório
Wiviam Eshley
Anna Luiza Sobral
📄 Licença

Projeto destinado para fins educacionais.