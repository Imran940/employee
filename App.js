import './App.css';
import Home from './pages/Home';
import Header from './nav/Header';
import { Route, Switch } from "react-router-dom";
import Login from './auth/Login';
import { useEffect } from "react"
import { getLogin } from './functions/function';
import { useDispatch } from "react-redux";
import Userpage from './pages/Userpage';
import Signup from './auth/Signup';
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    const username = window.localStorage.getItem('username');
    const password = window.localStorage.getItem('password');
    getLogin(username, password)
      .then(resp => {

        dispatch({
          type: "LOG_IN",
          payload: {
            username: resp.data[0].username,
            password: resp.data[0].password,
            email: resp.data[0].email,
          }
        })
      })
      .catch(err => {
        console.log(err);
        // alert(err.response.data)
      })
  }, [])
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/userpage" component={Userpage} />
      <Route exact path="/signup" component={Signup} />

    </div>
  );
}

export default App;
