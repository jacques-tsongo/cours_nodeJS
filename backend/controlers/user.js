const bcrypt = require('bcrypt');

const User = require('../models/user');

//la fonction signup pour l'enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(300).redirect('/home'))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error })
        );
};

// la fonction login pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(300).redirect('/home');
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })
        );
};


exports.authSignup = (req, res, next) => {
    res.status(200).render('signup');
}

exports.authLogin = (req, res, next) => {
    res.status(200).render('login');
} 