import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import { AddEmployee } from './components/AddEmployee';
import { EditEmployee } from './components/EditEmployee';
import Login from './components/Login/Login';
import PrivateRoute from './private-route/PrivateRoute'

function App() {
  return (
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          {/* <Route path="/home" component={Home} exact />
          <Route path="/add" component={AddEmployee} exact />
          <Route path="/edit/:id" component={EditEmployee} exact /> */}
          <PrivateRoute  path="/home"  component={Home}  exact  />
          <PrivateRoute  path="/add"  component={AddEmployee}  exact  />
          <PrivateRoute  path="/edit/:id"  component={EditEmployee}  exact  />
        </Switch>
      </div>
  );
}

export default App;