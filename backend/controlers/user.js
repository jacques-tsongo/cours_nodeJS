const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// SIGNUP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            return user.save();
        })
        .then(() => res.status(300).redirect("/home"))
        .catch(error => res.status(400).json({ error }));
};

// LOGIN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }

            return bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }

                    //le sytheme de jwt qui nous permet de gerer l'authentification
                    // return res.status(200).json({
                    //     userId: user._id,
                    //     token: jwt.sign(
                    //         { userId: user._id },
                    //         'RANDOM_TOKEN_SECRET',
                    //         { expiresIn: '24h' }
                    //     )
                    // });
                    res.status(300).redirect("/home")
                });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.authSignup = (req, res, next) => {
    res.status(200).render('signup');
}

exports.authLogin = (req, res, next) => {
    res.status(200).render('login');
} 