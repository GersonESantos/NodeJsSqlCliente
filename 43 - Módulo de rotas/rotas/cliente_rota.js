// Importar o módulo express
const express = require('express');

// Extraíndo a função Router do módulo express
const router = express.Router();

// Importar módulo de serviços
const servico = require('../servicos/cliente_servico');

// *** ADICIONE SUAS ROTAS AQUI
// Rota Principal
router.get('/', (req, res) => {
    servico.formularioCadastro(req, res);
    
});
// Rota Principal contendo a situação do cadastro
router.get('/:situacao', (req, res) => {
    
    servico.formularioCadastroComSituacao(req, res);
   
});

// Rota de cadastro
router.post('/cadastrar', function(req, res){
   servico.cadastrarCliente(req, res); 
 });


// Rota para remover clientes
router.get('/remover/:id&:imagem', function(req, res){
    servico.removerCliente(req, res);
   
});

// Rota para redirecionar para o formulário de alteração/edição
router.get('/formularioEditar/:id', function(req, res){
    servico.formularioEditar(req, res);
    
});
// Rota para editar Cliente
router.post('/editar', function(req, res){
    //obterse os dados do formulário
    servico.editarCliente(req, res);
    
    });

    // Rota para listar clientes   '${afinidade}'
router.get('/listar/:afinidade', function(req, res){
    servico.listagemCliente(req, res);
    
             
});
// Rota para Pesquisa

router.post('/pesquisa', function(req, res){
    servico.pesquisa(req, res);
});
// Exportar o router
module.exports = router;

