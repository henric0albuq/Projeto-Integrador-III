const express    = require("express");
const { engine } = require("express-handlebars");
const app        = express();
const path       = require("path");
const db         = require("./db/connection");
const bodyParser = require("body-parser");
const Job        = require("./models/Job");
const { where }  = require("sequelize");
const { title }  = require("process");
const Sequelize  = require("sequelize");
const authRoutes = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));


passport.use(new GoogleStrategy({
    clientID: 'SEU_CLIENT_ID',
    clientSecret: 'SEU_CLIENT_SECRET',
    callbackURL: 'http://localhost:3001/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Aqui você pode salvar o perfil no banco, etc.
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(require('express-session')({
  secret: 'seuSegredoSeguro',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//rota de autentecação do Google


const Op         = Sequelize.Op;


const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}`);
});

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//express session


// handle bars
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
defaultLayout: 'main', // main.handlebars
    layoutsDir: path.join(__dirname, 'views', 'layouts')
    // Aqui você pode adicionar configurações, helpers, layoutsDir, etc.
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//static folder
app.use(express.static(path.join(__dirname, "public")));

// Auth routes (deixe aqui)
app.use('/', authRoutes);

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
});


// routes
app.get('/', (req, res) => {
  let search = req.query.job;
  let query  = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if (!search) {
    Job.findAll({
      order: [["id", "DESC"]] // Ordena pela coluna `id`, que existe na tabela
    })
    .then(jobs => {
      res.render('index', {
        jobs
      });
    })
    .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [["id", "DESC"]] // Substituído `createdAt` por `id`
    })
    .then(jobs => {
      console.log(search);
      res.render('index', {
        jobs, search
      });
    })
    .catch(err => console.log(err));
  }
});
// jobs routes
app.use('/jobs', require('./routes/jobs'));

// auth routes
app.get('/entrar', (req, res) => {
    res.render('entrar');
});



