import React, { Component } from 'react'
import { Button, Form, Modal } from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class HangoutForm extends Component {
    state={
        hangoutName: "",
        address: "",
        latitude: null,
        longitute: null,
        imgUrl: null
    }

    storageRef = firebase.storage().ref("hangoutImage");

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
      };

      handleNewHangout = event => {
        event.preventDefault();
        let hangoutMatch = this.props.hangouts.filter(
          hangout =>
            hangout.username === this.state.address || hangout.email === this.state.hangoutName
        );
        if (
          this.state.hangoutName === "" ||
          this.state.address === "" ||
          this.state.imgUrl === null
        ) {
          alert("Please fill in all fields!");
        } else if (hangoutMatch.length === 0) {
          const ref = this.storageRef
            .child(this.state.hangoutName)
            return ref
            .put(this.state.imgUrl)
            .then(data => data.ref.getDownloadURL())
            .then(imageUrl => {
                return this.props.addHangout({
                  hangoutName: this.state.hangoutName,
                  address: this.state.address,
                  latitude: this.state.latitude,
                  longitute: this.state.longitute,
                  imgUrl: imageUrl
                }, "hangouts")
                .then(this.props.handleClose)
              }
              )
        } else {
          alert("Someone has already added this hangout!");
        }
      };

      getInitialState =()=> {
        return { value: null };
      }

      onSelect=(value)=> {
        this.setState({ value: value });
      }

    render() {
        return (
            <Modal  open={this.props.modalOpen}
            size='small'
            >
            <Modal.Header>New Hangout</Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.handleNewHangout}>
                <Form.Input
                onChange={this.handleFieldChange}
                id="hangoutName"
                label="Name"
                type="text"
              />
                <Form.Input
                onChange={this.handleFieldChange}
                id="address"
                label="Address"
                type="address"
              />
              <Form.Field
                    control="input"
                    type="file"
                    label="Photo"
                    onChange={e => this.setState({ imgUrl: e.target.files[0] })}
                  />
                    <Button content='Save' primary  />
                    <Button onClick = {this.props.handleClose}>Cancel
        </Button>
                </Form>
            </Modal.Content>
            </Modal>
        )
    }
}
