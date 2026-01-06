const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Thing = require("./models/thing")//je exporte le model des donnees

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

app.get('/login',(req,res,next)=>{
  res.status(200).render('posts')
})
app.get('/',(req,res,next)=>{
  res.status(200).send('<h1>Bienvenue sur mon API REST</h1>')
});


app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
  .then(() => res.status(200).json({ message : "l'objet enregistrer" }))
  .catch(error => res.status(400).json({ error }))
});

app.use('/api/stuff', (req, res, next) => {
Thing.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
});



app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


// app.use('/api/stuff', (req, res, next) => {
  // const stuff = [
  //   {
  //     _id: 'oeihfzeoi',
  //     title: 'Mon premier objet',
  //     description: 'Les infos de mon premier objet',
  //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //     price: 4900,
  //     userId: 'qsomihvqios',
  //   },
  //   {
  //     _id: 'oeihfzeomoihi',
  //     title: 'Mon deuxième objet',
  //     description: 'Les infos de mon deuxième objet',
  //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //     price: 2900,
  //     userId: 'qsomihvqios',
  //   },
  //   {
  //     _id: 'oeihfzeomoihi',
  //     title: 'Mon deuxième objet',
  //     description: 'Les infos de mon deuxième objet',
  //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //     price: 2900,
  //     userId: 'qsomihvqios',
  //   },
  // ];
  // res.status(200).json(stuff);

// });



module.exports = app; //la on exporte le module express pour pouvoir 
// l'utiliser dans d'autres fichiers dans
//  la constante app pour qu'il soit accessible das les autres fichiers