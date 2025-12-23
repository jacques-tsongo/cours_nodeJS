const express = require('express');

const path = require('path');

const app = express();


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
  res.status(201).json({
    message: 'Objet créé !'
  });
  console.log(req.body);
});

app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app; //la on exporte le module express pour pouvoir 
// l'utiliser dans d'autres fichiers dans
//  la constante app pour qu'il soit accessible das les autres fichiers