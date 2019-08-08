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
      <Card key={this.props.hangout.id} style={{background:"#8EE48F", boxShadow: "none"}}>
        <Image
          rounded
          src={this.props.hangout.imgUrl}
          onClick={() => {
            this.props.history.push(`/hangouts/${this.props.hangout.id}`);
          }}
        />
        <Card.Content>
          <Card.Header textAlign="center" style={{color: "#05386B", fontSize: "2em"}}>{this.props.hangout.hangoutName}</Card.Header>
          <Card.Description textAlign="center" style={{color: "#05386B"}}>{this.props.hangout.address}</Card.Description>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1em"}}>

          <div>

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
          </div>
          <div>

          <Button
            content="Add to Destinations"
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
          </div>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
