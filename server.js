const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// Dados oficiais extraídos do site da Luce Studio
const infoEmpresa = {
  titulo: "Lighting Designer | Luce Studio | São Paulo",
  fundadora: "Juliana Ramacciotti",
  telefone: "+55 (11) 3294 8177",
  celular: "+55 (11) 9 7190 0732",
  endereco:
    "Av. Brigadeiro Faria Lima, 1597 - Cj. 509C - CEP 01452-000 - São Paulo, SP - Brasil",
};

app.get("/", (req, res) => {
  res.render("pages/index", { paginaAtiva: "home", infoEmpresa });
});

app.get("/empresa", (req, res) => {
  res.render("pages/empresa", { paginaAtiva: "empresa", infoEmpresa });
});

app.get("/portifolio", (req, res) => {
  res.render("pages/portifolio", { paginaAtiva: "portifolio", infoEmpresa });
});

app.get("/produtos", (req, res) => {
  res.render("pages/produtos", { paginaAtiva: "produtos", infoEmpresa });
});

app.get("/midia", (req, res) => {
  res.render("pages/midia", { paginaAtiva: "midia", infoEmpresa });
});

app.get("/faleconosco", (req, res) => {
  res.render("pages/contato", { paginaAtiva: "contato", infoEmpresa });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
