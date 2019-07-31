import React, { Component } from 'react'
import { Button, Form, Modal } from "semantic-ui-react";
import CharacterCounter from 'react-character-counter'

export default class ReviewForm extends Component {
    state={
        restrictions: "",
        review: ""
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
      };

      handleNewReview = event => {
        event.preventDefault();
        if (this.state.restrictions === "" || this.state.review === "") {
          alert("Please fill in all fields");
        }
        else {
            let newReview = {
                userId: parseInt(sessionStorage.getItem("currentUser")),
                hangoutId: this.props.hangoutId,
                restrictions: this.state.restrictions,
                review: this.state.review
            }
            this.props.addToApi(newReview, "reviews")
            .then(this.props.handleClose)
        }
      };

    render() {
        return (
            <Modal  open={this.props.modalOpen}
            size='small'
            >
            <Modal.Header>New Review</Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.handleNewReview}>
                <CharacterCounter value={this.state.restrictions} maxLength={150} >
                <Form.TextArea
                onChange={this.handleFieldChange}
                id="restrictions"
                label="Skoolie Restrictions"
                type="text"
              />
                </CharacterCounter>
              <CharacterCounter value={this.state.review} maxLength={350} >
                <Form.TextArea
                onChange={this.handleFieldChange}
                id="review"
                label="Review"
                type="text"
              />
              </CharacterCounter>
                    <Button content='Add Review' primary  />
                    <Button onClick = {this.props.handleClose}>Cancel
        </Button>
                </Form>
            </Modal.Content>
            </Modal>
        )
    }
}
