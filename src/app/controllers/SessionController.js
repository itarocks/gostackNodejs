//importa o model de usuarios

const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("Usuario nao encontrado");
      req.flash("error", "Usuario nao encontrado");
      return res.redirect("/");
    }
    if (!(await user.checkPassword(password))) {
      console.log("Senha incorreta");
      req.flash("error", "Senha incorreta");
      return res.redirect("/");
    }

    //salva os dados do usuario na sessao
    req.session.user = user;

    return res.redirect("/app/dashboard");
  }
  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      return res.redirect("/");
    });
  }
}

module.exports = new SessionController();
