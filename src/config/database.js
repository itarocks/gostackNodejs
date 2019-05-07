//retorna uma unica configuracao a partir de um objeto
//yarn add pg --> postgree
module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "docker",
  password: "docker",
  database: "gonodemodulo2",
  //
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
