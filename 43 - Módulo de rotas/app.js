// Import the express library
const express = require('express');

// importa o módulo fileupload
const fileUpload = require('express-fileupload');
// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// Importar o módulo de rotas
const rota_cliente = require('./rotas/cliente_rota');

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
// Rotas
app.use('/', rota_cliente);


app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });





