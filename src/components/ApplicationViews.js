import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import ApiManager from "../modules/ApiManager";
import Login from "./authentication/Login";
import Profile from "./profile/Profile";
import HangoutList from "./hangout/HangoutList";
import HangoutReview from "./hangout/HangoutReview";

export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("currentUser") !== null;

  state = {
    users: [],
    hangouts: [],
    // reviews: [],
    didVisits: []
  };

  componentDidMount() {
    const newState = {};

    ApiManager.all("users").then(users => (newState.users = users));
    ApiManager.all("hangouts").then(hangouts => (newState.hangouts = hangouts));
    // ApiManager.all("reviews").then(reviews => (newState.reviews = reviews));
    ApiManager.getDidVisitHangout("didVisits")
      .then(didVisits => (newState.didVisits = didVisits))
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

    addReviewToApi = (obj, entity) =>
    ApiManager.post(obj, entity)
   .then(() => ApiManager.getDidVisitHangout())
   .then(obj =>{
       this.setState({
       [entity]: obj
     })
   }
   );

  //  deleteFromApi = (obj, entity) =>
  //  ApiManager.delete(obj, entity)
  //    .then(ApiManager.all(entity))
  //    .then(obj => {
  //     //  this.props.history.push("/");
  //      this.setState({ [entity]: obj });
  //    });

  render() {
    return (
      <React.Fragment>
      <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              let currentUserDidVisit= this.state.didVisits.filter(hangout => hangout.userId === parseInt(sessionStorage.getItem("currentUser")) && hangout.didVisit === true)
              let currentUserDesiredVisit=this.state.didVisits.filter(hangout => hangout.userId === parseInt(sessionStorage.getItem("currentUser")) && hangout.didVisit === false)
              let user = this.state.users.filter(
                user =>
                  user.id === parseInt(sessionStorage.getItem("currentUser"))
              );
              return (
                <Profile {...props} user={user} updateApi={this.updateApi} userVisited={currentUserDidVisit} userDesiredVisit={currentUserDesiredVisit} />
              );
            } else {
              return <Redirect to="./login" />;
            }
          }}
        />
        <Route
          exact
          path="/:userId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              let userDidVisit= this.state.didVisits.filter(hangout => hangout.userId === parseInt(props.match.params.userId && hangout.didVisit) === true)
              let userDesiredVisit=this.state.didVisits.filter(hangout => hangout.userId === parseInt(props.match.params.userId) && hangout.didVisit === false)
              let users = this.state.users.filter(
                user =>
                  user.id === parseInt(props.match.params.userId)
              );
              return <Profile {...props} user={users} updateApi={this.updateApi} userVisited={userDidVisit} userDesiredVisit={userDesiredVisit} />
            } else {
              return <Redirect to="./login" />;
            }
          }}
        />
        <Route
          exact
          path="/hangouts"
          render={props => {
            if (this.isAuthenticated()) {
              let source = this.state.hangouts.map(hangout => ({
                id: hangout.id,
                title: hangout.hangoutName,
                description: hangout.address,
                image: hangout.imgUrl
              }));
              return (
                <HangoutList
                  {...props}
                  hangouts={this.state.hangouts}
                  addToApi={this.addToApi}
                  source={source}
                  didVisit={this.state.didVisits}
                />
              );
            } else {
              return <Redirect to="./login" />;
            }
          }}
        />
        <Route
          path="/hangouts/:hangoutId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <HangoutReview {...props}  />
              );
            } else {
              return <Redirect to="./login" />;
            }
          }}
        />
        <Route
          path="/login"
          render={props => {
            return (
              <Login
                {...props}
                users={this.state.users}
                addUser={this.addToApi}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
