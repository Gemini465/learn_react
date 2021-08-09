import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import store from "./util/storeUtils";
import Loading from './components/loading'
import Admin from "./pages/admin/admin";
import Login from "./redux/container/login";

class App extends Component {
   state = {
      renderError: false
   }
   static getDerivedStateFromError() {
      return {
         renderError: true
      }
   }
   componentDidCatch(error, errorInfo) {
      this.setState({
         renderError: true
      })
   }
   render() {
      const {renderError} = this.state
      if (renderError) {
         return <Loading/>
      }
      const user = store.get('user_key')
      store.user = user
      return (
         <Switch>
            <Route path={"/"} component={Login}/>
            <Route exact path={"/admin"} component={Admin}/>
         </Switch>
      );
   }
}

export default App;
