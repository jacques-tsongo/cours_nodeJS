const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// exportation des routes
const Router = require('./routes/roots');
const userRouter = require('./routes/User');


const app = express();

//je configure mongoose pour qu'il puisse se connecter a la base de donnee mongoDB
mongoose.connect('mongodb+srv://kaserekatsongojacques2023:jacquesmongo2004@cluster0.8dmjdx2.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//je configure body-parser pour qu'il puisse,  intercepter les requetes
app.use(express.urlencoded({ extended : true }))
app.use(express.json());

//la on donne les autorisations d'acces a l'API et regler le probleme de cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//je configure le moteur de visualisation ejs
app.set("view engine","ejs");
app.set('views', path.join(__dirname, '../frontend'));

//je configure l'acces aux fichiers statiques
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/', Router)
app.use('/', userRouter);


module.exports = app; //la on exporte le module express pour pouvoir 
// l'utiliser dans d'autres fichiers dans
//  la constante app pour qu'il soit accessible das les autres fichiers