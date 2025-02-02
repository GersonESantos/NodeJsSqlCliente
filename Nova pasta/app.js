// Importar módulo express 44
const express = require('express');


//importar módulo fileupload

const fileUpload = require('express-fileupload');
// importar módulo express-handlebars

const { engine } = require('express-handlebars');
// importar módulo de rotas
const rota_produto = require('./rotas/produtos_rotas');

// App
const app = express();

// habilitar fileupload
app.use(fileUpload());  

// Adicionar bootstrap

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
// Adicionar css

app.use('/css', express.static('./css'));
//Referenciar a pasta imagens
app.use('/imagens', express.static('./imagens'));
// Configuração do handlebars

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
// Manipulação de dados via Rotas

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// rotas
app.use('/', rota_produto);

// Servidor
app.listen(8080);