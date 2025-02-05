// Import the express library
const express = require('express');

// importa o módulo fileupload
const fileUpload = require('express-fileupload');
// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo servicos
const servico = require('./servicos/cliente_servico');
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
// Configuração do express-handlebars
app.engine('handlebars', engine({
    helpers: {
      // Função auxiliar para verificar igualdade
      condicionalIgualdade: function (parametro1, parametro2, options) {
        return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
      }
    }
  }));
app.set('view engine', 'handlebars');
app.set('views', './views');
// configuração do banco de dados
// manipulação de dados
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Rota Principal
app.get('/', (req, res) => {
    
    
    servico.formularioCadastro(req, res);
});
// Rota Principal contendo a situação do cadastro
app.get('/:situacao', (req, res) => {   
    servico.formularioCadastroComSituacao(req, res);
});




// Rota de cadastro
app.post('/cadastrar', function(req, res){
    servico.cadastrarCliente(req, res);
   
 });


// Rota para remover clientes
app.get('/remover/:id&:imagem', function(req, res){
    
  servico.removerCliente(req, res);
});

// Rota para redirecionar para o formulário de alteração/edição
app.get('/formularioEditar/:id', function(req, res){
   servico.formularioEditar(req, res); 
     
});
// Rota para editar Cliente
app.post('/editar', function(req, res){
    servico.editarCliente(req, res);
    });

    // Rota para listar clientes   '${afinidade}'
app.get('/listar/:afinidade', function(req, res){
      servico.listagemCliente(req, res);
});
// Rota para Pesquisa

app.post('/pesquisa', function(req, res){

    servico.pesquisa(req, res);
});
app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });





