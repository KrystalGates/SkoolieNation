import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import CharacterCounter from "react-character-counter";
import ApiManager from "../../modules/ApiManager";

export default class ReviewFormEdit extends Component {
  state = {
    userId: null,
    hangoutId: null,
    restrictions: "",
    review: "",
    date: ""
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  updateReview = evt => {
    evt.preventDefault();

    if (this.state.review === "" || this.state.restrictions === "") {
      window.alert("Please fill in all fields!");
    } else {
      let editReview = {
        id: this.props.reviewId,
        userId: this.state.userId,
        hangoutId: this.state.hangoutId,
        restrictions: this.state.restrictions,
        review: this.state.review,
        date: this.state.date
      };
      this.props.updateApi(editReview, "reviews").then(
        this.props.handleClose
      );
    }
  };

  componentDidMount() {
    ApiManager.get("reviews", this.props.reviewId).then(review => {
      this.setState({
        userId: review.userId,
        hangoutId: review.hangoutId,
        restrictions: review.restrictions,
        review: review.review,
        date: review.date
      });
    });
  }

  render() {
    return (
      <Modal open={this.props.modalOpen} size="small">
        <Modal.Header>Edit Review</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.updateReview}>
            <CharacterCounter value={this.state.restrictions} maxLength={150}>
              <Form.TextArea
                onChange={this.handleFieldChange}
                id="restrictions"
                label="Skoolie Restrictions"
                type="text"
                value={this.state.restrictions}
              />
            </CharacterCounter>
            <CharacterCounter value={this.state.review} maxLength={350}>
              <Form.TextArea
                onChange={this.handleFieldChange}
                id="review"
                label="Review"
                type="text"
                value={this.state.review}
              />
            </CharacterCounter>
            <Button content="Update Review" primary />
            <Button onClick={this.props.handleClose}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
