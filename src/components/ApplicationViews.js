import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom";
import ApiManager from "../modules/ApiManager";
import Login from "./authentication/Login"
import Profile from "./profile/Profile";
import HangoutList from "./hangout/HangoutList"
import HangoutDetail from "./hangout/HangoutDetail";

export default class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("currentUser") !== null

    state = {
        users: [],
        hangouts: [],
        reviews: [],
        didVisit: []
      };


      componentDidMount() {
        const newState = {};

        ApiManager.all("users").then(users => (newState.users = users));
        ApiManager.all("hangouts").then(hangouts => (newState.hangouts = hangouts)
          );
        ApiManager.all("reviews").then(reviews => (newState.reviews = reviews)
          );
        ApiManager.all("didVisit")
            .then(didVisit => (newState.didVisit = didVisit))
            .then(() => this.setState(newState));
          }

      addToApi = (obj, entity) =>
      ApiManager.post(obj, entity)
     .then(() => ApiManager.all(entity))
     .then(obj =>{
         this.setState({
         [entity]: obj
       })
     }
     );

     deleteFromApi = (obj, entity) =>
     ApiManager.delete(obj, entity)
       .then(ApiManager.all(entity))
       .then(obj => {
        //  this.props.history.push("/");
         this.setState({ [entity]: obj });
       });

       updateApi = (obj, entity) => {
        return ApiManager.put(obj, entity)
          .then(() => ApiManager.all(entity))
          .then(obj => {
            this.setState({
              [entity]: obj
            });
          });
      };

    render() {
        return (
            <React.Fragment>
               <Route
            exact path="/" render={props =>{
              if(this.isAuthenticated()){
                let user = this.state.users.filter(user => user.id === parseInt(sessionStorage.getItem("currentUser")))
                return <Profile {...props} user={user} updateApi={this.updateApi}
                />
            }else {
              return <Redirect to="./login" />;
            }}}
          />
               <Route
            exact path="/:userId(\d+)" render={props =>{
              if(this.isAuthenticated()){
                return <Profile {...props}
                />
            }else {
              return <Redirect to="./login" />;
            }}}
          />
               <Route
            exact path="/hangouts" render={props =>{
              if(this.isAuthenticated()){
                let source = this.state.hangouts.map((hangout) => ({
                  id: hangout.id,
                  title: hangout.hangoutName,
                  description: hangout.address,
                  image: hangout.imgUrl
                }))
                return <HangoutList {...props} hangouts={this.state.hangouts} addToApi={this.addToApi} source={source}
                />
            }else {
              return <Redirect to="./login" />;
            }}}
          />
               <Route
            path="/hangouts/:hangoutId(\d+)" render={props =>{
              if(this.isAuthenticated()){
                return <HangoutDetail {...props} hangouts={this.state.hangouts}
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
