const express = require("express");
const router = express.Router();

// liberando todas as rotas...
const cors = require("cors");
router.use(cors());

const dbknex = require("./data/db_config"); // dados de conexao com o banco de dados

// método get é usado para consulta
router.get("/", async(req, res) => {
  try {
    // para obter os usuarios/devedores
    const users = await dbknex("users").orderBy("id", "desc");
    res.status(200).json(users);    // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});


// Método post é usado para inclusão
router.post("/", async (req, res) => {
  // faz a destruturaçao dos dados recebidos no corpo da requisição
  const { nome, sobreNome, ano, valor, foto } = req.body;

  // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
  if(!nome || !sobreNome || !ano || !valor || !foto) {
    res.status(400).json({ msg: "Enviar nome, sobrenome, ano, valor e foto do devedor!"});
    return;
  }

  // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
  try {
    // insert, faz a inserção na tablea users (e retorna o id do registro inserido)
    const novo = await dbknex("users").insert({ nome, sobreNome, ano, valor, foto});
    res.status(201).json({ id: novo[0] });  // statusCode indica Create
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método put é usado para alteração. id indica o registro a ser alterado
router.put("/:id", async (req, res) => {
  const id = req.params.id; 
  const { valor } = req.body;   // campo a ser alterado

  try {
    // altera o campo valor, no registro cujo id coincidir com o parametro passado
    await dbknex("users").update({ valor }).where("id", id); // ou .where({id})
    res.status(200).json(); // statusCode indica ok
  } catch (error) {
    res.status(400).json({ msg: error.message}); // retorna status de erro e msg
  }
});

// Método delete é usado para exlusao
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // id do registro a ser excluido
  try {
    await dbknex("users").del().where({ id });
    res.status(200).json();   // indica ok
  } catch (error) {
    res.status(400).json({ msg: error.message });   // retorna status de erro e msg
  }
});

// Filtro por título ou autor
router.get("/filtro/:palavra", async (req, res) => {
  const palavra = req.params.palavra; // palavra do nome ou sobrenome a pesquisar
  try {
    // para filtrar registros, utiliza-se .where(), com suas variantes
    const users = await dbknex("users")
      .where("nome", "like", `%${palavra}`)
      .orWhere("sobreNome", "like", `%${palavra}`);
    res.status(200).json(users);  // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Resumo de cadastro de users
router.get("/dados/resumo", async (req, res) => {
  try {
    // métodos que podem ser utilizados para obter dados estatísticos da tablea
    const consulta = await dbknex("users")
      .count({ num: "*" })
      .sum({ soma: "valor" })
      .max({ maior: "valor" })
      .avg({ media: "valor" });
    const { num, soma, maior, media } = consulta[0];
    res.status(200).json({ num, soma, maior, media: Number(media.toFixed(2))});
  } catch (error) {
    res.status(400).json({ msg: error.message });   // retorna status de erro e msg
  }
});

// Soma dos valores, agrupados por ano
router.get("/dados/grafico", async (req, res) => {
  try {
    // obtém ano e soma do valores dos users (com o nome total), agrupados por ano
    const totalPorAno = await dbknex("users").select("ano")
      .sum({ total: "valor" }).groupBy("ano");
      res.status(200).json(totalPorAno)
  } catch (error) {
    res.status(400).json({ msg: error.message });   // retorna status de erro e msg
  }
});


module.exports = router;