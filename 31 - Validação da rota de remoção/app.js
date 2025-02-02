// Import the express library
const express = require('express');
// importa o módulo fileupload
const fileUpload = require('express-fileupload');
// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo mysql
const mysql = require('mysql2');
// File System
const fs = require('fs');
// App
const app = express();
// Habilita o fileupload
app.use(fileUpload());

// Adiciona o bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

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
// Rota Principal contendo a situação do cadastro
app.get('/:situacao', (req, res) => {
    let sql = 'SELECT * FROM cliente';
    conexao.query(sql, function(err, result){
        if(err) throw err;
        res.render('formulario', {clientes: result, situacao: req.params.situacao});
    });
});




// Rota de cadastro
app.post('/cadastrar', function(req, res){
    try{
      // Obter os dados que serão utiliados para o cadastro
      
      let nome = req.body.nome;
      let telefone = req.body.telefone;
      let email = req.body.email;
      let afinidade = req.body.afinidade;
      // Validar o nome do produto e o valor
      if(nome == '' || afinidade == '' || email == '' || isNaN(telefone)){
         res.redirect('/falhaCadastro');
      }else{
         // SQL
        let sql = `INSERT INTO cliente (nome, telefone, email, afinidade, imagem) VALUES ('${nome}', ${telefone}, '${email}', '${afinidade}', '${req.files.imagem.name}')`;
 
         // Executar comando SQL
         conexao.query(sql, function(erro, retorno){
             // Caso ocorra algum erro
             if(erro) throw erro;
 
             // Caso ocorra o cadastro
             req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
             console.log(retorno);
         });
 
         // Retornar para a rota principal
         res.redirect('/okCadastro');
      }
    }catch(erro){
     res.redirect('/falhaCadastro');
    }
 });


// Rota para remover produtos
app.get('/remover/:id&:imagem', function(req, res){
    
    // Tratamento de exeção
    try{
        // SQL
        let sql = `DELETE FROM produtos WHERE codigo = ${req.params.id}`;

        // Executar o comando SQL
        conexao.query(sql, function(erro, retorno){
            // Remover imagem
            fs.unlink(__dirname + '/imagens/' + req.params.imagem, (erro_imagem) => {
                if (erro_imagem) {
                  console.log("Falha ao remover a imagem: ", erro_imagem);
                } else {
                  console.log("Imagem removida com sucesso.");
                }
            });
        });

        // Redirecionamento
        res.redirect('/okRemover');
        //res.redirect('/');
    }catch(erro){
        res.redirect('/falhaRemover');
        //res.redirect('/');
    }
});

// Rota para redirecionar para o formulário de alteração/edição
app.get('/formularioEditar/:id', function(req, res){
    
    let sql = `SELECT * FROM cliente WHERE id = ${req.params.id}`;
    conexao.query(sql, function(err, retorno){
        if(err) throw err;
        res.render('formularioEditar', {cliente:retorno[0]});
    });    
});
// Rota para editar Cliente
app.post('/editar', function(req, res){
    //obter os dados do formulário
    let id = req.body.id;
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let afinidade = req.body.afinidade;
    let nomeImagem = req.body.nomeImagem;
    // validar nome telefone email e afinidade
    if(nome == '' || afinidade == '' || email == '' || isNaN(telefone)){
        res.redirect('/falhaCadastro');
     }else{ 

    // definir o tipo de ediçâo
    try{
        let imagem = req.files.imagem;
        //sql
        let sql = `UPDATE cliente SET nome = '${nome}', telefone = ${telefone}, email = '${email}', afinidade = '${afinidade}', imagem = '${imagem.name}' WHERE id = ${id}`;
    //execultar o comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra erro
        if(erro) throw erro;
        //remover a imagem antiga
        fs.unlink(__dirname + '/imagens/' + nomeImagem, (erro_imagem) => {
              console.log("Falha ao remover a imagem: "); 
            });
// salvar a nova imagem
        imagem.mv(__dirname + '/imagens/' + imagem.name);
        });
    }catch(erro){
        let sql = `UPDATE cliente SET nome = '${nome}', telefone = ${telefone}, email = '${email}', afinidade = '${afinidade}' WHERE id = ${id}`;
    //execultar o comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra erro
        if(erro) throw erro;
        });
    }
    //redirecionar

        res.redirect('/okEdicao');
    }
    });

    // verificar se o campo imagem foi preenchido
    
app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });










