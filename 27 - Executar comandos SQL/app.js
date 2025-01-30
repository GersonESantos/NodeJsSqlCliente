// Import the express library
const express = require('express');
// importa o módulo fileupload
const fileUpload = require('express-fileupload');
// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo mysql
const mysql = require('mysql2');
//file systems
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
        res.render('formulario', {cliente: result});
    });
});


app.post('/cadastrar', function(req, res){
   
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let afinidade = req.body.afinidade;
    req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);

    const sql = `INSERT INTO cliente (nome, telefone, email, afinidade, imagem) VALUES ('${nome}', ${telefone}, '${email}', '${afinidade}', '${req.files.imagem.name}')`;
    conexao.query(sql, function(err, result){
        if(err) throw err;
        console.log('Usuário cadastrado com sucesso!');
       
    }); 
    console.log(req.body);
    console.log(req.files.imagem.name);
    req.files.imagem.mv(__dirname + '/imagens/' + req.files.imagem.name);
   res.redirect('/');
    //res.end();
});
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

// Rota para redirecionar para o formulário de alteração/edição
app.get('/formularioEditar/:id', function(req, res){
    let sql = `SELECT * FROM cliente WHERE id = ${req.params.id}`;
    conexao.query(sql, function(err, retorno){
        if(err) throw err;
        res.render('formularioEditar', {cliente:retorno[0]});
    });    
});

// Rota para editar Cliente
// app.post('/editar', function(req, res){
//     //obter os dados do formulário
//    let id = req.body.id;
//     let nome = req.body.nome;
//     let telefone = req.body.telefone;
//     let email = req.body.email;
//     let afinidade = req.body.afinidade;
//     let nomeImagem = req.body.nomeImagem;
//     // verificar se o campo imagem foi preenchido
//     try{
//         let imagem = req.files.imagem;
        

//     }catch(erro){
    //     }
    //     res.redirect('/');
    
    //     });
    // verificar se o campo imagem foi preenchido
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Rota para editar produtos
    app.post('/editar', function(req, res){
           
        let id = req.body.id;
        let nome = req.body.nome;
        let telefone = req.body.telefone;
        let email = req.body.email;
        let afinidade = req.body.afinidade;
        let nomeImagem = req.body.nomeImagem;
        // verificar se o campo imagem foi preenchido       // Definir o tipo de edição
        try{
            // Objeto de imagem
            let imagem = req.files.imagem.name;
            
            // SQL
            let sql = `UPDATE cliente SET nome='${nome}', telefone=${telefone}, email='${email}', afinidade='${afinidade}', imagem='${imagem.name}' WHERE id=${id}`;    
            l
            // Executar comando SQL
            conexao.query(sql, function(erro, retorno){
                // Caso falhe o comando SQL
                if(erro) throw erro;
                
                // Remover imagem antiga
                fs.unlink(__dirname+'/imagens/'+nomeImagem, (erro_imagem)=>{
                    console.log('Falha ao remover a imagem.');
                });
                
                // Cadastrar nova imagem
                imagem.mv(__dirname+'/imagens/'+imagem.name);
            });
        }catch(erro){
            
            // SQL
        
             let sql = `UPDATE cliente SET nome='${nome}', telefone=${telefone}, email='${email}', afinidade='${afinidade}' WHERE id=${id}`;    
    
        // Executar comando SQL
        conexao.query(sql, function(erro, retorno){
            // Caso falhe o comando SQL
            if(erro) throw erro;
        });
    }

    // Finalizar rota
    res.redirect(`/`)
    
});

app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });
    