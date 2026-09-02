const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const envPath = fs.existsSync(path.join(__dirname, ".env"))
  ? path.join(__dirname, ".env")
  : path.join(__dirname, "..", ".env");
require("dotenv").config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3000;
const CONTACT_EMAIL = "vhdacosta01@gmail.com";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const infoEmpresa = {
  titulo: "Lighting Designer | Luce Studio | São Paulo",
  fundadora: "Juliana Ramacciotti",
  telefone: "+55 (11) 3294 8177",
  celular: "+55 (11) 9 7190 0732",
  endereco:
    "Av. Brigadeiro Faria Lima, 1597 - Cj. 509C - CEP 01452-000 - São Paulo, SP - Brasil",
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

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    : null;

app.post(["/contato", "/faleconosco"], async (req, res) => {
  const name = req.body.name || req.body.nome;
  const email = req.body.email;
  const subject = req.body.subject || req.body.assunto;
  const message = req.body.message || req.body.mensagem;

  if (
    !name ||
    !email ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res
      .status(400)
      .json({ error: "Preencha nome, e-mail válido e mensagem." });
  }

  if (!transporter) {
    return res
      .status(503)
      .json({ error: "Serviço de e-mail não configurado." });
  }

  try {
    await transporter.sendMail({
      from: `Luce Studio <${process.env.SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: subject || `Contato pelo site: ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    });
    return res.json({ success: true });
  } catch (error) {
    console.error("Falha ao enviar formulário de contato:", error.message);
    return res
      .status(500)
      .json({ error: "Não foi possível enviar a mensagem." });
  }
});

const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Luce Studio rodando em http://${HOST}:${PORT}`);
});
