import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddCliente from "./components/add-cliente.component";
import Cliente from "./components/cliente.component";
import ClientesList from "./components/clientes-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/clientes"]} component={ClientesList} />
              <Route exact path="/add" component={AddCliente} />
              <Route path="/clientes/:id" component={Cliente} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
