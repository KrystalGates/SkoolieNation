import React, { Component } from "react"
import { Button, Divider, Form, Grid, Segment, Modal } from "semantic-ui-react"

export default class Login extends Component {

    state = {
       user_name: "",
       email: "",
       password: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleLogin = (event) => {
        event.preventDefault()
        if(this.state.user_name === "" || this.state.password === ""){
            alert("Please fill in username and password")
        }
        let userMatch = this.props.users.find(user =>(user.user_name === this.state.user_name && user.password === this.state.password))
        if(userMatch !== undefined){
            sessionStorage.setItem("currentUser", userMatch.id)
            this.props.history.push("/")
        }
        else{
              alert("Password or username does not match. Try again or register!")
        }
        }


    handleRegister = (event) => {
        event.preventDefault()
        let userMatch = this.props.users.filter(user =>
            (user.user_name === this.state.user_name || user.email === this.state.email))
        if(this.state.user_name === "" || this.state.password === "" || this.state.email === ""){
            alert("Please fill in username, email, and password")
        }
        else if(userMatch.length === 0){
            this.props.addUser(this.state, "users")
                .then( event => {
                    let newUserMatch = this.props.users.filter(user => (user.user_name === this.state.user_name))
                    sessionStorage.setItem("currentUser", newUserMatch[0].id)
                    this.props.history.push("/")
                })
        }else{
            alert("Username or email is already in use.")
    }}

    render() {
        return (

            <Segment placeholder className="login">
                <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                    <Form onSubmit={this.handleLogin}>
                    <Form.Input onChange={this.handleFieldChange} id="user_name" icon="user" iconPosition="left" label="Username" placeholder="Username" />
                    <Form.Input onChange={this.handleFieldChange} id="password" icon="lock" iconPosition="left" label="Password" type="password" />

                    <Button content="Login" primary />
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                <Modal size="tiny" trigger={<Button content="Sign up" icon="signup" size="big" />} >
                    <Modal.Header>Register</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleRegister}>
                            <Form.Input onChange={this.handleFieldChange} id="user_name" icon="user" iconPosition="left" label="Username" placeholder="Username" />
                            <Form.Input onChange={this.handleFieldChange} id="email" icon="user" iconPosition="left" label="Email" placeholder="Email" />
                            <Form.Input onChange={this.handleFieldChange} id="password" icon="lock" iconPosition="left" label="Password" type="password" />
                        </Form>
                    </Modal.Content>
        </Modal>
                </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        )
    }
}