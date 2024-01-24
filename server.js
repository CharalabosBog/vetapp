const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/veterinary_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Setting up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB models for User and Pet
const User = mongoose.model('User', {
    username: String,
    password: String
});

const Pet = mongoose.model('Pet', {
    name: String,
    breed: String,
    age: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Passport configuration
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Routes
//

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB User
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// user password hash before the database
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

// MongoDB Pet
const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String },
    age: { type: Number },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = { User, Pet };

// Passport config
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error registering user.' });
        }
        return res.status(200).json({ message: 'User registered successfully.' });
    });
});

// Login
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// Logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Pet submission
app.post('/submit-pet', (req, res) => {
    const { name, breed, age } = req.body;
    const newPet = new Pet({
        name,
        breed,
        age,
        owner: req.user._id,
    });

    newPet.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error submitting pet.' });
        }
        return res.status(200).json({ message: 'Pet submitted successfully.' });
    });
});
