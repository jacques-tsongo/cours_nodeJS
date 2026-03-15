const express = require('express');
const router = express.Router();

const controler = require('../controlers/controler'); //importation du controler    



router.get('/login', controler.sendLoginPage); //la route de login ou d'enregisttrement des objects
router.get('/', controler.sendHomePage);  //la route d'accueil
router.post('/api/stuff', controler.createThing);//'insertion d'un nouvel object dans la base de donnee
router.get('/api/stuff/:id', controler.findOneThing); //la route pour afficher les details d'un object
router.get('/edit/:id', controler.sendEditPage); //la route pour afficher la page de mis a jour d'un object
router.get('/api/stuff/:id', controler.sendDetailPage); //la route pour afficher les details d'un object
router.post('/edit/:id', controler.updateOneThing);// la route pour la mis a jour d'un object
router.post('/api/stuff/:id', controler.deleteOneThing);//la route pour la suppression d'un object
router.get('/api/stuff', controler.findAllThings); //la route pour afficher tous les objects de la base de donnee

module.exports = router; //la on exporte le module express pour pouvoir l'utiliser dans d'autres fichiers dans
//  la constante router pour qu'il soit accessible das les autres fichiers