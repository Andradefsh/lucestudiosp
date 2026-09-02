const express = require('express');
const app = express();
const PORT = 3000;

// Configurar o EJS como موتور de template
app.set('view engine', 'ejs');

// Servir arquivos estáticos (CSS, imagens, JS do cliente)
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    const dadosEmpresa = {
        titulo: "Lighting Designer | Luce Studio | São Paulo",
        fundadora: "Juliana Ramacciotti",
        telefone: "+55 (11) 3294 8177",
        celular: "+55 (11) 9 7190 0732",
        endereco: "Av. Brigadeiro Faria Lima, 1597 - Cj. 509C - CEP 01452-000 - São Paulo, SP - Brasil"
    };
    res.render('index', { dadosEmpresa });
});

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});