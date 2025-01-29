// Import the express library
const express = require('express');
// importa o módulo fileupload
const fileUpload = require('express-fileupload');
// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo mysql
const mysql = require('mysql2');

//File System
const fs = require('fs');

// App
const app = express();
// Habilita o fileupload
app.use(fileUpload());

// Adiciona o bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// configuração do handlebars
// Adiciona o css
app.use('/css', express.static('./css'));
app.use('/imagens', express.static('./imagens'));
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
    let sql = 'SELECT * FROM cliente';  
    conexao.query(sql, function(err, result){
        if(err) throw err;
        res.render('formulario', {clientes: result});
    });
});

//Rota de cadastro

// app.post('/cadastrar', (req, res) => {
//     req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
//     const { nome, idade, email, afinidade, imagem} = req.body;
//     const sql = `INSERT INTO cliente (nome, idade, email, afinidade, imagem) VALUES ('${nome}', ${idade}, '${email}', '${afinidade}', '${(req.files.imagem.name)}')`;
//     conexao.query(sql, function(err, result){
//         if(err) throw err;
//         console.log('Usuário cadastrado com sucesso!');
//         res.render('formulario');
//     });
// });

app.post('/cadastrar', function(req, res){
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let afinidade = req.body.afinidade;
    let imagem = req.files.imagem;
    //Sql
    let sql = `INSERT INTO cliente (nome, telefone, email, afinidade, imagem) VALUES ('${nome}', ${idade}, '${email}', '${afinidade}', '${imagem.name}')`;
    //executar a query SQL
    conexao.query(sql, function(err, result){
        if(err) throw err;
        console.log('Usuário cadastrado com sucesso!');
        req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
        console.log('resultado', result);
    });
    res.render('/');
});

// Rota de exclusão de cliente

// Rota para remover produtos
app.get('/remover/:id&:imagem', function(req, res){
    
    // SQL
    let sql = `DELETE FROM cliente WHERE id = ${req.params.id}`;

    // Executar o comando SQL
    conexao.query(sql, function(erro, retorno){
        // Caso falhe o comando SQL
        if(erro) throw erro;

        // Caso o comando SQL funcione
        fs.unlink(__dirname+'/imagens/'+req.params.imagem, (erro_imagem)=>{
            console.log('Falha ao remover a imagem ');
        });
    });

    // Redirecionamento
    res.redirect('/');

});


app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });