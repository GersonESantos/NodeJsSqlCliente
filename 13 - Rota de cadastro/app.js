// Importar módulo express
const express = require('express');

// importar módulo express-handlebars
const { engine } = require('express-handlebars');

// Importar módulo mysql
const mysql = require('mysql2');

// App
const app = express();

// Adicionar bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
// Adicionar css

app.use('/css', express.static('./css'));

// Configuração do handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Conexão com o banco de dados
const Conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'projeto'
}); 
// Conectar
Conexao.connect(function(err){
    if(err) throw err;
    console.log('Conectado com sucesso!');
}
);
// Rota principal
app.get('/', function(req, res){
    res.render('formulario');  
});
// Rota de cadastro
app.post('/cadastrar', function(req, res){
    
        console.log(req.body);
        res.end();
    });
    // Redirecionar

// Servidor
app.listen(8080);