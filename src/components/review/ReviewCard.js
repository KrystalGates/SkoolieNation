import React, { Component } from "react";
import { List, Button, Image } from "semantic-ui-react";
import ReviewCardDelete from "./ReviewCardDelete";
import ReviewFormEdit from "./ReviewFormEdit";
import moment from "moment";
import { withRouter } from "react-router";

class ReviewCard extends Component {
  state = {
    modalEditOpen: false,
    modalDeleteOpen: false
  };

  btnEnabled = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUser"));
    let str = false;
    if (this.props.review.user.id === currentUser) {
      str = true;
    }
    return str;
  };

  render() {
    const date = moment(this.props.review.date).format("MMM Do YYYY");
    return (
      <List.Item key={this.props.review.id}>
        <Image
          avatar
          src={this.props.review.user.imgUrl}
          onClick={() => {
            this.props.history.push(`/${this.props.review.userId}`);
          }}
        />
        <List.Content>
          <List.Header>{this.props.review.user.username}</List.Header>
          <List.Description>Date Posted: {date} </List.Description>
          <List.Description>
            Restrictions: {this.props.review.restrictions}
          </List.Description>
          <List.Description>
            <div style={{ whiteSpace: "pre" }}>
              Review: {this.props.review.review}{" "}
            </div>
          </List.Description>
          <Button
            content="Edit"
            size="small"
            style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            onClick={() => {
              this.setState({ modalEditOpen: true });
            }}
          />
          <ReviewFormEdit
            reviewId={this.props.review.id}
            updateApi={this.props.updateApi}
            modalOpen={this.state.modalEditOpen}
            handleClose={() => {
              this.setState({ modalEditOpen: false });
            }}
          />
          <Button
            content="Delete"
            size="small"
            style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            onClick={() => {
              this.setState({ modalDeleteOpen: true });
            }}
          />
          <ReviewCardDelete
            hangoutId={this.props.hangoutId}
            modalDeleteOpen={this.state.modalDeleteOpen}
            handleClose={() => {
              this.setState({ modalDeleteOpen: false });
            }}
            deleteReviewFromApi={this.props.deleteReviewFromApi}
            reviewId={this.props.review.id}
          />
        </List.Content>
      </List.Item>
    );
  }
}

export default withRouter(ReviewCard);
