const request = require('request');
const db = require("../models");
const Cliente = db.clientes;

exports.create = (req, res) => {
  if (!req.body.cnpj) {
    res.status(400).send({ message: "Campo CNPJ é obrigatório!" });
    return;
  }

  const cliente = new Cliente({
    cnpj: req.body.cnpj.replace(/\D/g, ''),
    nome: req.body.nome,
    logradouro: req.body.logradouro,
    numero: req.body.numero,
    complemento: req.body.complemento,
    municipio: req.body.municipio,
    uf: req.body.uf,
    cep: req.body.cep,
    telefone: req.body.telefone,
    email: req.body.email
  });

  cliente
    .save(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao incluir."
      });
    });
};

exports.findAll = (req, res) => {
  let cnpj = req.query.cnpj;
  cnpj = cnpj ? cnpj.replace(/\D/g, '') : '';

  var condition = cnpj ? { cnpj: { $regex: new RegExp(cnpj), $options: "i" } } : {};

  Cliente.find(condition)
    .then(data => {
      if (data && data.length == 0 && cnpj) {
        request(
          `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
          { json: true },
          (request_err, request_res, request_body) => {
            if (request_err) {
              res.status(400).send({ message: request_err });
              return
            }
            res.send([request_body]);
          });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro na busca de clientes."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Cliente não encontrado! " });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao tentar buscar Cliente com id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Erro ao tentar dados em branco!"
    });
  }

  const id = req.params.id;
  req.body.cnpj = req.body.cnpj ? req.body.cnpj.replace(/\D/g, '') : '';

  Cliente.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível atualizar o Cliente com id=${id}. Talvez Cliente não tenha sido encontrado!`
        });
      } else res.send({ message: "Cliente atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao atualizar o Cliente com id=${id}`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível excluir o cliente com id=${id}. Talvez Cliente não tenha sido encontrado!`
        });
      } else {
        res.send({
          message: "Cliente excluído com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar o Cliente com id =" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Cliente.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Clientes foram excluídos com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os clientes."
      });
    });
};


