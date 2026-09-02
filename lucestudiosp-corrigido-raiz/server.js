const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const envPath = fs.existsSync(path.join(__dirname, ".env"))
  ? path.join(__dirname, ".env")
  : path.join(__dirname, "..", ".env");
require("dotenv").config({ path: envPath });

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.google.com; connect-src 'self'",
  );
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1h",
    etag: true,
    setHeaders: (res, filePath) => {
      if (path.extname(filePath).toLowerCase() !== ".html") {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  }),
);
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

const infoEmpresa = {
  titulo: "Lighting Designer | Luce Studio | São Paulo",
  fundadora: "Juliana Ramacciotti",
  telefone: "+55 (11) 3294 8177",
  celular: "+55 (11) 9 7190 0732",
  endereco:
    "Av. Brigadeiro Faria Lima, 1597 - Cj. 509C - CEP 01452-000 - São Paulo, SP - Brasil",
};

const pageMeta = {
  home: {
    title: "Luce Studio | Lighting Design em São Paulo",
    description:
      "Luce Studio: projetos de iluminação, lighting design e soluções personalizadas para espaços residenciais, corporativos, comerciais e institucionais.",
  },
  empresa: {
    title: "A Empresa | Luce Studio",
    description:
      "Conheça a Luce Studio, empresa especializada em projetos de iluminação e lighting design desde 2008.",
  },
  portifolio: {
    title: "Portfólio | Luce Studio",
    description:
      "Conheça projetos de iluminação desenvolvidos pela Luce Studio em diferentes escalas e tipologias.",
  },
  produtos: {
    title: "Produtos | Luce Studio",
    description:
      "Conheça a curadoria de luminárias e soluções que complementam os projetos de iluminação da Luce Studio.",
  },
  midia: {
    title: "Na Mídia | Luce Studio",
    description:
      "Conteúdos, cursos, palestras, matérias e entrevistas relacionados à iluminação e ao design.",
  },
  contato: {
    title: "Fale Conosco | Luce Studio",
    description:
      "Entre em contato com a Luce Studio para conversar sobre projetos de iluminação e lighting design.",
  },
};

const renderPage = (paginaAtiva, view) => (req, res) => {
  const meta = pageMeta[paginaAtiva] || pageMeta.home;
  res.render(`pages/${view}`, {
    paginaAtiva,
    infoEmpresa,
    pageMeta: meta,
    canonicalUrl: `https://lucestudiosp.com${req.path === "/" ? "/" : req.path}`,
  });
};

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
  const name = String(req.body.name || req.body.nome || "").trim();
  const email = String(req.body.email || "").trim();
  const subject = String(req.body.subject || req.body.assunto || "").trim();
  const message = String(req.body.message || req.body.mensagem || "").trim();

  if (
    !name ||
    !email ||
    !message ||
    name.length > 120 ||
    email.length > 254 ||
    subject.length > 160 ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res
      .status(400)
      .json({ error: "Preencha nome, e-mail válido e mensagem." });
  }

  if (!transporter || !CONTACT_EMAIL) {
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
