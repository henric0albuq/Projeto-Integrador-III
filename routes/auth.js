const express = require('express');
const router = express.Router();
const passport = require('passport');
const Job = require("../models/Job");
const { Sequelize } = require('sequelize');
const Op  = Sequelize.Op;
const multer = require('multer');


// rota entrar
router.get('/entrar', (req, res) => {
    res.render('entrar' , {layout: false});
});

// rota cadastrar recrutador
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar',{ layout: false }); // vai procurar views/cadastrar.handlebars
});

// Cadastro do candidato
router.get('/cadastrarCandidato', (req, res) => {
  res.render('cadastrarCandidato',{ layout: false }); // precisa existir views/cadastrarCandidato.handlebars
});

//rota post para validar o cadastro do candidato
router.post('/cadastrarCandidato', (req, res) => {
  const { nome, usuario, senha, confirmarSenha } = req.body;

  // Aqui você faria validação, salvamento em banco etc.
  console.log(nome, usuario, senha, confirmarSenha);

  res.send('Cadastro de candidato recebido com sucesso!');
});


// rota sair
router.get('/sair', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

// rota tela de seleção de perfil de recrutador ou candidato
router.get('/selecionar-perfil', (req, res) => {
  res.render('euSou',{ layout: false });
});

// Login do recrutador
router.get('/entrar-recrutador', (req, res) => {
  res.render('entrar',{ layout: false }); // usar entrar.handlebars
});

// Login do candidato
router.get('/entrarCandidato', (req, res) => {
  res.render('entrarCandidato',{ layout: false }); // usar entrarCandidato.handlebars
});

router.get("/candidates", (req, res) => {
  let search = req.query.job;
  let query = '%' + (search || '') + '%';

  let where = search ? { title: { [Op.like]: query } } : undefined;

  Job.findAll({ where, order: [['id', 'DESC']] })
    .then(jobs => {
      res.render("candidates", { jobs, search });
    })
    .catch(err => console.log(err));
});

router.post('/entrarCandidato', (req, res) => {
  res.redirect('/candidates');
});

// Configuração do Multer para salvar os arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Crie esta pasta se não existir
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Rota GET para exibir o perfil
router.get('/candidates/profile', (req, res) => {
  res.render('meuPerfil',{ layout: false });
});


// Rota POST para atualizar o perfil

router.post('/candidates/profile', upload.fields([
  { name: 'foto', maxCount: 1 },
  { name: 'curriculo', maxCount: 1 }
]), (req, res) => {
  const dados = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    celular: req.body.celular,
    data: req.body.data,
    prestador: req.body.prestador,
    sobre: req.body.sobre,
    foto: req.files['foto'] ? req.files['foto'][0].filename : null,
    curriculo: req.files['curriculo'] ? req.files['curriculo'][0].filename : null
  };

  console.log(dados);

  res.render('meuPerfil', { layout: false, dados });
});



// Redireciona para o Google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Rota de callback
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/entrar' }),
    (req, res) => {
        // Sucesso no login
        res.redirect('/dashboard'); // Altere para onde quiser redirecionar
    }
);

// Rota para deslogar
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


module.exports = router;
