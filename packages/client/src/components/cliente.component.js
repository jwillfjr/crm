import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";

export default class Cliente extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.getCliente = this.getCliente.bind(this);
    this.updateCliente = this.updateCliente.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);

    this.state = {
      currentCliente: {
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
      message: ""
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { currentCliente } = this.state;
    this.setState({
      currentCliente: {
        ...currentCliente,
        [name]: value
      }
    });
  }

  componentDidMount() {
    this.getCliente(this.props.match.params.id);
  }


  getCliente(id) {
    ClienteDataService.get(id)
      .then(response => {
        this.setState({
          currentCliente: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCliente.id,
      cnpj: this.state.currentCliente.cnpj,
      nome: this.state.currentCliente.nome,
      logradouro: this.state.currentCliente.logradouro,
      numero: this.state.currentCliente.numero,
      complemento: this.state.currentCliente.complemento,
      municipio: this.state.currentCliente.municipio,
      uf: this.state.currentCliente.uf,
      cep: this.state.currentCliente.cep,
      telefone: this.state.currentCliente.telefone,
      email: this.state.currentCliente.email,
    };

    ClienteDataService.update(this.state.currentCliente.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCliente: {
            ...prevState.currentCliente,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCliente() {
    ClienteDataService.update(
      this.state.currentCliente.id,
      this.state.currentCliente
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Cliente Atualizado com sucesso!"
        });
        alert(this.state.message);
        this.props.history.push('/clientes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCliente() {
    ClienteDataService.delete(this.state.currentCliente.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/clientes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCliente } = this.state;

    return (
      <div>
        {currentCliente ? (
          <div className="edit-form">
            <h4>Cliente</h4>
            <form>
              <div className="form-group">
                <label htmlFor="cnpj">Cnpj</label>
                <input
                  type="text"
                  className="form-control"
                  id="cnpj"
                  required
                  value={currentCliente.cnpj}
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
                  value={currentCliente.nome}
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
                  value={currentCliente.logradouro}
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
                  value={currentCliente.numero}
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
                  value={currentCliente.complemento}
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
                  value={currentCliente.municipio}
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
                  value={currentCliente.uf}
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
                  value={currentCliente.cep}
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
                  value={currentCliente.telefone}
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
                  value={currentCliente.email}
                  onChange={this.handleChange}
                  name="email"
                />
              </div>
            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteCliente}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateCliente}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            null
          )}
      </div>
    );
  }
}
