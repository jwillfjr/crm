import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";
import { Link } from "react-router-dom";

export default class AddCliente extends Component {
  constructor(props) {
    super(props);

    this.saveCliente = this.saveCliente.bind(this);
    this.newCliente = this.newCliente.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = this.props.location.state ? {
      cliente: { ...this.props.location.state },
      submitted: false
    } : {
        cliente: {
          id: null,
          cnpj: "",
          nome: "",
          logradouro: "",
          numero: "",
          complemento: "",
          municipio: "",
          uf: "",
          cep: "",
          telefone: "",
          email: "",
        },
        submitted: false
      };
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { cliente } = this.state;
    this.setState({
      cliente: {
        ...cliente,
        [name]: value
      }
    });
  }

  saveCliente() {
    const { cliente } = this.state;

    ClienteDataService.create(cliente)
      .then(response => {
        this.setState({
          cliente: {
            id: response.data.id,
            cnpj: response.data.cnpj,
            nome: response.data.nome,
            logradouro: response.data.logradouro,
            numero: response.data.numero,
            complemento: response.data.complemento,
            municipio: response.data.municipio,
            uf: response.data.uf,
            cep: response.data.cep,
            telefone: response.data.telefone,
            email: response.data.email,
          },
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCliente() {
    this.setState({
      cliente: {
        id: null,
        cnpj: "",
        nome: "",
        logradouro: "",
        numero: "",
        complemento: "",
        municipio: "",
        uf: "",
        cep: "",
        telefone: "",
        email: "",
      },
      submitted: false
    });
  }

  render() {
    const { cliente, submitted } = this.state;
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Cliente incluido com sucesso!</h4>
            <button className="btn btn-success mr-2" onClick={this.newCliente}>
              Novo
            </button>
            <Link className="btn btn-light" to={"/clientes/"}>Ir para Lista</Link>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="cnpj">Cnpj</label>
                <input
                  type="text"
                  className="form-control"
                  id="cnpj"
                  required
                  value={cliente.cnpj}
                  onChange={this.handleChange}
                  name="cnpj"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={cliente.nome}
                  onChange={this.handleChange}
                  name="nome"
                />
              </div>

              <div className="form-group">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  type="text"
                  className="form-control"
                  id="logradouro"
                  required
                  value={cliente.logradouro}
                  onChange={this.handleChange}
                  name="logradouro"
                />
              </div>
              <div className="form-group">
                <label htmlFor="numero">Numero</label>
                <input
                  type="text"
                  className="form-control"
                  id="numero"
                  required
                  value={cliente.numero}
                  onChange={this.handleChange}
                  name="numero"
                />
              </div>
              <div className="form-group">
                <label htmlFor="complemento">complemento</label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  required
                  value={cliente.complemento}
                  onChange={this.handleChange}
                  name="complemento"
                />
              </div>
              <div className="form-group">
                <label htmlFor="municipio">municipio</label>
                <input
                  type="text"
                  className="form-control"
                  id="municipio"
                  required
                  value={cliente.municipio}
                  onChange={this.handleChange}
                  name="municipio"
                />
              </div>
              <div className="form-group">
                <label htmlFor="uf">uf</label>
                <input
                  type="text"
                  className="form-control"
                  id="uf"
                  required
                  value={cliente.uf}
                  onChange={this.handleChange}
                  name="uf"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cep">cep</label>
                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  required
                  value={cliente.cep}
                  onChange={this.handleChange}
                  name="cep"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefone"
                  required
                  value={cliente.telefone}
                  onChange={this.handleChange}
                  name="telefone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={cliente.email}
                  onChange={this.handleChange}
                  name="email"
                />
              </div>
              <button onClick={this.saveCliente} className="btn btn-success">
                Salvar
            </button>
            </div>
          )}
      </div>
    );
  }
}
