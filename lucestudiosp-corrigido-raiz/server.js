const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const infoEmpresa = {
  titulo: "Lighting Designer | Luce Studio | São Paulo",
  fundadora: "Juliana Ramacciotti",
  telefone: "+55 (11) 3294 8177",
  celular: "+55 (11) 9 7190 0732",
  endereco: "Av. Brigadeiro Faria Lima, 1597 - Cj. 509C - CEP 01452-000 - São Paulo, SP - Brasil",
};

const renderPage = (paginaAtiva, view) => (req, res) =>
  res.render(`pages/${view}`, { paginaAtiva, infoEmpresa });

app.get("/", renderPage("home", "index"));
app.get("/empresa", renderPage("empresa", "empresa"));
app.get("/portifolio", renderPage("portifolio", "portifolio"));
app.get("/produtos", renderPage("produtos", "produtos"));
app.get("/midia", renderPage("midia", "midia"));
app.get("/faleconosco", renderPage("contato", "contato"));
app.get("/contato", (req, res) => res.redirect("/faleconosco"));
app.get("/blog", renderPage("midia", "midia"));

const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Luce Studio rodando em http://${HOST}:${PORT}`);
});