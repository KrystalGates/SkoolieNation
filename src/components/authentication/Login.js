import React, { Component } from "react";
import { Button, Divider, Form, Grid, Segment, Modal } from "semantic-ui-react";
import CharacterCounter from "react-character-counter";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    aboutMe: "",
    imgUrl: null
  };

  storageRef = firebase.storage().ref("profileImage");

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      alert("Please fill in username and password");
    }
    let userMatch = this.props.users.find(
      user =>
        user.username === this.state.username &&
        user.password === this.state.password
    );
    if (userMatch !== undefined) {
      sessionStorage.setItem("currentUser", userMatch.id);
      this.props.history.push("/");
    } else {
      alert("Password or username does not match. Try again or register!");
    }
  };

  handleRegister = event => {
    event.preventDefault();
    let userMatch = this.props.users.filter(
      user =>
        user.username === this.state.username || user.email === this.state.email
    );
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.email === ""
    ) {
      alert("Please fill in username, email, and password");
    } else if (userMatch.length === 0) {
      const ref = this.storageRef
        .child(this.state.username)
        return ref
        .put(this.state.imgUrl)
        .then(data => data.ref.getDownloadURL())
        .then(imageUrl => {
            return this.props.addUser({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              aboutMe: this.state.aboutMe,
              imgUrl: imageUrl
            }, "users")
          }
          )
        .then(event => {
          let newUserMatch = this.props.users.filter(
            user => user.username === this.state.username
          );
          sessionStorage.setItem("currentUser", newUserMatch[0].id);
          this.props.history.push("/");
        });
    } else {
      alert("Username or email is already in use.");
    }
  };

  render() {
    return (
      <Segment placeholder className="login">
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={this.handleLogin}>
              <Form.Input
                onChange={this.handleFieldChange}
                id="username"
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
              />
              <Form.Input
                onChange={this.handleFieldChange}
                id="password"
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
              />

              <Button content="Login" primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Modal
              size="tiny"
              trigger={<Button content="Sign up" icon="signup" size="big" />}
            >
              <Modal.Header>Register Your Skoolie!</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleRegister}>
                  <Form.Input
                    onChange={this.handleFieldChange}
                    id="username"
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    placeholder="Username"
                  />
                  <Form.Input
                    onChange={this.handleFieldChange}
                    id="email"
                    icon="mail"
                    iconPosition="left"
                    label="Email"
                    placeholder="Email"
                  />
                  <Form.Input
                    onChange={this.handleFieldChange}
                    id="password"
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                  />
                  <CharacterCounter value={this.state.aboutMe} maxLength={350}>
                    <Form.TextArea
                      maxLength="350"
                      onChange={this.handleFieldChange}
                      id="aboutMe"
                      label="About my Skoolie"
                      placeholder="Tell us about your skoolie!"
                    />
                  </CharacterCounter>
                  <Form.Field
                    control="input"
                    type="file"
                    label="Photo"
                    onChange={e => this.setState({ imgUrl: e.target.files[0] })}
                  />
                  <Button content="Register" primary />
                </Form>
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}
