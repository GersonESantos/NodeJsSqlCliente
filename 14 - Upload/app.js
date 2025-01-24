// Import the express library
const express = require('express');

// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo mysql
const mysql = require('mysql2');
// App
const app = express();

// Adiciona o bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adiciona o css
app.use('/css', express.static('./css'));
// configuração do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
// configuração do banco de dados
// manipulação de dados
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'projeto'
}); 
// Conectar
conexao.connect(function(err){
    if(err) throw err;
    console.log('Conectado com sucesso!');
});
// Rota Principal
app.get('/', (req, res) => {
    res.render('formulario');
});

//Rota de cadastro

app.post('/cadastrar', (req, res) => {
    const { nome, idade, email, senha} = req.body;
    const sql = `INSERT INTO cliente (nome, idade, email, senha) VALUES ('${nome}', ${idade}, '${email}', '${senha}')`;
    conexao.query(sql, function(err, result){
        if(err) throw err;
        console.log('Usuário cadastrado com sucesso!');
        res.render('formulario');
    });



// app.post('/cadastrar', (req, res) => {
//     const { nome, valor, imagem } = req.body;
//     const sql = `INSERT INTO cliente (nome, idade, imagem) VALUES ('${nome}', '${valor}', '${imagem}')`;
//     conexao.query(sql, function(err, result){
//         if(err) throw err;
//         console.log('Usuário cadastrado com sucesso!');
//         res.render('formulario');
//     });
});
// Rota de cadastro
    //  app.post('/cadastrar', function(req, res){
    //    console.log(req.body);
    //    res.end(); 
    // });

app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });