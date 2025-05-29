const express = require("express");
const router  = express.Router();
const Job     = require("../models/Job");

// rota de teste
router.get("/test" , (req, res) => {
    res.send("deu certo");
});

// detalhe da vaga
router.get("/view/:id", (req, res) => Job.findOne({
  where: {id: req.params.id}
}).then(job => {
  res.render("view", {
    job
  });

}).catch(err => console.log(err)));


// form da rota de envio
router.get('/add', (req, res) => {
    res.render("add");
})

// add job via post
router.post("/add", (req, res) => {

  let{title, salary, company, description, email, new_job  }  = req.body;

 // insert
 Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
 })
 .then(() => res.redirect('/'))
 .catch(err => console.log(err));

});

// rota para a tela de login
router.get('/entrar', (req, res) => {
    res.render('entrar');
});

// rota para a tela de cadastro
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});
// rota para logout
router.get('/sair', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

module.exports = router