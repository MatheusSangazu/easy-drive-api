const express = require('express');
const router = express.Router();


const PegarVeiculo = require('./getVeiculo'); 
const cadastrarMotorista = require('./CadastrarMotorista') 
const LoginUsuario = require('./loginMotorista') 
const cadastrarVeiculo = require('./CadastrarVeiculo') 

router.get('/', (req, res) => {
    res.send('API EasyDrive funcionando!');
});


router.use('/getVeiculo', PegarVeiculo); // Rota Buscar veiculos do usuario
router.use('/CadastrarMotorista', cadastrarMotorista); // Rotas cadastrar Motorista
router.use('/loginMotorista', LoginUsuario) // Rota validar Login
router.use('/CadastrarVeiculo', cadastrarVeiculo) // Cadastrar um Veiculo
module.exports = router;



