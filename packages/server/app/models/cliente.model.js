module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      cnpj: String,
      nome: String,
      logradouro: String,
      numero: String,
      complemento: String,
      municipio: String,
      uf: String,
      cep: String,
      telefone: String,
      email: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cliente = mongoose.model("cliente", schema);
  return Cliente;
};
