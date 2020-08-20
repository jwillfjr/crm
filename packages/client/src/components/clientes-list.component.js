import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";
import { Link } from "react-router-dom";

export default class ClientesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCnpj = this.onChangeSearchCnpj.bind(this);
    this.retrieveClientes = this.retrieveClientes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCliente = this.setActiveCliente.bind(this);
    this.removeAllClientes = this.removeAllClientes.bind(this);
    this.searchCnpj = this.searchCnpj.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);

    this.state = {
      clientes: [],
      currentCliente: null,
      currentIndex: -1,
      searchCnpj: ""
    };
  }

  componentDidMount() {
    this.retrieveClientes();
  }

  onChangeSearchCnpj(e) {
    const searchCnpj = e.target.value;

    this.setState({
      searchCnpj: searchCnpj
    });
  }

  retrieveClientes() {
    ClienteDataService.getAll()
      .then(response => {
        this.setState({
          clientes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClientes();
    this.setState({
      currentCliente: null,
      currentIndex: -1
    });
  }

  setActiveCliente(cliente, index) {
    this.setState({
      currentCliente: cliente,
      currentIndex: index
    });
  }

  removeAllClientes() {
    ClienteDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCliente() {
    ClienteDataService.delete(this.currentCliente.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/clientes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCnpj() {
    ClienteDataService.findByCnpj(this.state.searchCnpj)
      .then(response => {
        this.setState({
          clientes: response.data
        });

        if (response.data.length === 1 && !response.data[0].id) {
          this.props.history.push('/add', response.data[0]);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchCnpj, clientes, currentCliente } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por CNPJ"
              value={searchCnpj}
              onChange={this.onChangeSearchCnpj}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCnpj}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-start">

            <div className=" col-md-4"><h4>Clientes</h4></div>
            <div className="col-md-6 align-self-start">
              <Link to="/add" className="btn btn-primary">Novo</Link>
            </div>
          </div>

          {clientes ? (
            <div className="table-responsive">            
            <table className="table">
              <thead>
                <tr>
                  <th>Nome / Razão Social</th>
                  <th>CNPJ</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id} onSelect={this.setActiveCliente}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cnpj}</td>
                    <td className="d-flex justify-content-start">
                      <Link className="btn btn-info mr-2" to={"/clientes/" + cliente.id}>Editar</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (null)}
        </div>
        <div className="col-md-6">
          {currentCliente ? (
            <div>
              <h4>Cliente</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentCliente.nome}
              </div>
              <div>
                <label>
                  <strong>Cnpj:</strong>
                </label>{" "}
                {currentCliente.cnpj}
              </div>
              <Link
                to={"/clientes/" + currentCliente.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              null
            )}
        </div>
      </div>
    );
  }
}
