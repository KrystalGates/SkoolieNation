import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom";
import ApiManager from "../modules/ApiManager";
import Login from "./authentication/Login"
import Profile from "./profile/Profile";
import Hangout from "./hangout/Hangout"

export default class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("currentUser") !== null

    state = {
        users: [],
        locations: [],
        reviews: [],
        didVisit: []
      };


      componentDidMount() {
        const newState = {};

        ApiManager.all("users").then(users => (newState.users = users));
        ApiManager.all("locations").then(locations => (newState.locations = locations)
          );
        ApiManager.all("reviews").then(reviews => (newState.reviews = reviews)
          );
        ApiManager.all("didVisit")
            .then(didVisit => (newState.didVisit = didVisit))
            .then(() => this.setState(newState));
          }

      addToApi = (item, resource) =>
      ApiManager.post(item, resource)
     .then(() => ApiManager.all(resource))
     .then(item =>{
         this.setState({
         [resource]: item
       })
     }
     );

     deleteFromApi = (item, resource) =>
     ApiManager.delete(item, resource)
       .then(ApiManager.all(resource))
       .then(item => {
        //  this.props.history.push("/");
         this.setState({ [resource]: item });
       });

       updateApi = (item, resource) => {
        return ApiManager.put(item, resource)
          .then(() => ApiManager.all(resource))
          .then(item => {
            this.setState({
              [resource]: item
            });
          });
      };

    render() {
        return (
            <React.Fragment>
               <Route
            exact path="/" render={props =>{
              if(this.isAuthenticated()){
                return <Profile {...props} users={this.state.users}
                />
            }else {
              return <Redirect to="./login" />;
            }}}
          />
               <Route
            path="/hangout" render={props =>{
              if(this.isAuthenticated()){
                return <Hangout {...props} users={this.state.users}
                />
            }else {
              return <Redirect to="./login" />;
            }}}
          />
                <Route path="/login" render={props => {
          return <Login {...props} users={this.state.users} addUser={this.addToApi} />
          }} />
           </React.Fragment>
        )
    }
}
