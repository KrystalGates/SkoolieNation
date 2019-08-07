import React, { Component } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ReviewForm from "../review/ReviewForm";
import HangoutVisitedForm from "./HangoutVisitedForm";


export default class HangoutCard extends Component {
  state = {
    modalOpen: false,
    modalVisitedOpen: false
  };

  showBtn = () => {
    let didVisitCurrentUser = this.props.didVisit.filter(
      visit => visit.userId === parseInt(sessionStorage.getItem("currentUser"))
    );
    let str = true;
    didVisitCurrentUser.forEach(visit => {
      if (visit.hangoutId === this.props.hangout.id) {
        str = false;
      }
    });
    return str;
  };

  render() {
    return (
      <Card key={this.props.hangout.id}>
        <Image
          rounded
          src={this.props.hangout.imgUrl}
          onClick={() => {
            this.props.history.push(`/hangouts/${this.props.hangout.id}`);
          }}
        />
        <Card.Content>
          <Card.Header>{this.props.hangout.hangoutName}</Card.Header>
          <Card.Description>{this.props.hangout.address}</Card.Description>
          <Button
            content="Write a Review"
            size="small"
            onClick={() => {
              this.setState({ modalOpen: true });
            }}
          />
          <ReviewForm
            hangoutId={this.props.hangout.id}
            addReviewToApi={this.props.addReviewToApi}
            modalOpen={this.state.modalOpen}
            handleClose={() => {
              this.setState({ modalOpen: false });
            }} {...this.props}
          />
          <Button
            content="Add to your Skoolie's Map"
            size="small"
            style={{
              display: this.showBtn() ? "block" : "none"
            }}
            onClick={() => {
              this.setState({ modalVisitedOpen: true });
            }}
          />
          <HangoutVisitedForm
            modalVisitedOpen={this.state.modalVisitedOpen}
            hangoutId={this.props.hangout.id}
            addToApi={this.props.addToApi}
            handleClose={() => {
              this.setState({ modalVisitedOpen: false });
            }}
          />
        </Card.Content>
      </Card>
    );
  }
}
