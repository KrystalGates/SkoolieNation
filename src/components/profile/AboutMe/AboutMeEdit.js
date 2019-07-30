import React, { Component } from 'react'
import {Modal, Form, Button} from "semantic-ui-react"
import ApiManager from '../../../modules/ApiManager';


export default class AboutMeEdit extends Component {
    state= {
        username: "",
            email: "",
            password: "",
            aboutMe: "",
            imgUrl: ""
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
      };

      updateAboutMe = evt => {
        evt.preventDefault()

        if (this.state.aboutMe === ""){
            window.alert("Please fill in all fields!")
        } else {
          const editedAboutMe = {
            id: this.props.userId,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            aboutMe: this.state.aboutMe,
            imgUrl: this.state.imgUrl
          };

      this.props.updateApi(editedAboutMe, "users")
    //   .then(() => this.props.history.push("/"))
      }
    }

    componentDidMount() {
        ApiManager.get("users", this.props.userId)
        .then(user => {
          this.setState({
            username: user.username,
            email: user.email,
            password: user.password,
            aboutMe: user.aboutMe,
            imgUrl: user.imgUrl
          });
        });
      }

    render() {
        return (
            <Modal  open={this.props.modalOpen}
            size='small'
            >
            <Modal.Header>About My Skoolie</Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.updateAboutMe}>
                    <Form.TextArea onChange={this.handleFieldChange} id="aboutMe" label='About My Skoolie' value={this.state.aboutMe} />
                    <Button content='Save' primary />
                </Form>
            </Modal.Content>
            </Modal>
        )
    }
}
