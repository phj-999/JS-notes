import './App.css';
import Login from './Login';
import Home from './Home';
import PrivateRoute from "../components/PrivateRoute";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route path='/login' component={Login}></Route>
                  <Route path='/index' >
                     <Home>
                         <PrivateRoute />
                     </Home>
                  </Route>

                  <Route path='/' exact render={()=><Redirect to='/login' />}></Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
