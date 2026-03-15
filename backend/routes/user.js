const express = require('express');
const router = express.Router();
const userController = require('../controlers/user'); //importation du controler

//la route pour l'inscription d'un utilisateur
router.post('/signup', userController.singup);
router.post('/login', userController.login);




module.exports = router; //la on exporte le module express pour pouvoir l'utiliser dans d'autres fichiers dans
//  la constante router pour qu'il soit accessible das les autres fichiers