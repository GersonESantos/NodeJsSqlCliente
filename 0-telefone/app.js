const express = require('express');
// importar módulo express-handlebars
const { engine } = require('express-handlebars');

const app = express();

// Configuração do handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', function(req, res){

    res.render('formulario');
});

app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });