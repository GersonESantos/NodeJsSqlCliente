// Import the express library
const express = require('express');

// Importa fileupload
const fileUpload = require('express-fileupload');

// Importa o módulo express-handlebars
const { engine } = require('express-handlebars');

// importa o módulo mysql
const mysql = require('mysql2');
// App
const app = express();

//  habilita o fileupload
app.use(fileUpload());

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

// Rota de cadastro

app.post('/cadastrar', function(req, res){
    console.log(req.body);
    console.log(req.files.imagem.name);
    req.files.imagem.mv(__dirname + '/imagens/' + req.files.imagem.name);
        res.end();
    });
    // Redirecionar



    

app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });