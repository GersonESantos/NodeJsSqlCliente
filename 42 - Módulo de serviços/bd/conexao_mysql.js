// importa o módulo mysql
const mysql = require('mysql2');
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
// Exportar a conexão
module.exports = conexao;