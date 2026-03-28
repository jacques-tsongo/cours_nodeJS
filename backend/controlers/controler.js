const Thing = require('../models/thing'); //exportation du model des donnees

const fs = require('fs');

exports.sendLoginPage = (req, res, next) => {
  res.status(200).render('posts')
};

exports.sendHomePage = (req, res, next) => {
  res.status(200).render('index');
};

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
    ...thingObject,
    userId: req.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  thing.save()
    .then(() => { res.status(300).redirect('/home') })
    .catch(error => { res.status(400).json({ error }) })
};

// exports.createThing = (req, res, next) => {
//   delete req.body._id; //supprimer l'id qui vient par defaut avec le body
//   const thing = new Thing({   //on cree un nouvel object Thing avec les donnees du formulaire
//     ...req.body
//   });
//   thing.save() //la... la methode save() nous permet d'enregistrer les donnees 
//   .then(() => res.status(200).redirect('/home')) //la redirection apres insertion
//   .catch(error => res.status(400).json({ error }))
// }

exports.findOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).render('detail', { thing }))
    .catch(error => res.status(404).json({ error }));
}

exports.sendEditPage = (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).render('edit', { thing }))
    .catch(error => res.status(404).json({ error }));
}

exports.sendDetailPage = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).render('detail', { thing }))
    .catch(error => res.status(404).json({ error }));
}

exports.updateOneThing = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete thingObject._userId;
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(300).redirect('/home'))
        .catch(error => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

}

exports.deleteOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => { res.status(300).redirect('/home') })
          .catch(error => res.status(401).json({ error }));
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}

exports.findAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}
