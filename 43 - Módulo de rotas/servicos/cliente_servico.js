//Importar o módulo de conexão com banco MySQL
const conexao = require('../bd/conexao_mysql');

// Importar o módulo file system
const fs = require('fs');

// Função para exibir o formulário para cadastro de Cliente
function formularioCadastro(req, res){
    res.render('formulario');
}

// Função para exibir o formulário para cadastro de Cliente e a situação
function formularioCadastroComSituacao(req, res){
    res.render('formulario', {situacao: req.params.situacao});
}

// Função para exibir o formulário para edição de Cliente
function formularioEditar(req, res){
    let sql = `SELECT * FROM cliente WHERE id = ${req.params.id}`;
    conexao.query(sql, function(err, retorno){
        if(err) throw err;
        res.render('formularioEditar', {cliente:retorno[0]});
    });   
}

// Função para exibir a listagem de Cliente
function listagemCliente(req, res){
    let afinidade = req.params.afinidade;
    let sql = '';
    if(afinidade == 'todos'){
        sql = 'SELECT * FROM cliente';
    }else{
            sql = `SELECT * FROM cliente WHERE afinidade = '${afinidade}'`;            
        };    
    conexao.query(sql, function(err, result){
        if(err) throw err;
        res.render('lista', {clientes: result});
    });
           
}

// Função para realizar a pesquisa de Cliente
function pesquisa(req, res){
    let termo = req.body.termo;
    let sql = `SELECT * FROM cliente WHERE nome LIKE '%${termo}%'`;

    conexao.query(sql, function(err, result){
        if(err) throw err;
        let semRegistro = result.length == 0 ? true : false; 
        res.render('lista', {clientes: result, semRegistro: semRegistro});  
    });
}

// Função para realizar o cadastro de Cliente
function cadastrarCliente(req, res){
    try{
        // Obter os dados que serão utiliados para o cadastro
        
        let nome = req.body.nome;
        let telefone = req.body.telefone;
        let email = req.body.email;
        let afinidade = req.body.afinidade;
        // Validar o nome do cliente e o valor
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
}

// Função para realizar a remoção de Cliente
function removerCliente(req, res){
      // Tratamento de exeção
      try{
        // SQL
        let sql = `DELETE FROM cliente WHERE codigo = ${req.params.id}`;

        // Executar o comando SQL
        conexao.query(sql, function(erro, retorno){
            if(erro) throw erro;
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
        //res.redirect('/okRemover');
        res.redirect('/');
    }catch(erro){
        //res.redirect('/falhaRemover');
        res.redirect('/');
    }
}

// Função responsável pela edição de Cliente
function editarCliente(req, res){
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
}

// Exportar funções
module.exports = {
    formularioCadastro,
    formularioCadastroComSituacao,
    formularioEditar,
    listagemCliente,
    pesquisa,
    cadastrarCliente,
    removerCliente,
    editarCliente
};