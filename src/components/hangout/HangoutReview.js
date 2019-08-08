import React, { Component } from "react";
import ApiManager from "../../modules/ApiManager";
import { List, Card, Image, Button, Grid } from "semantic-ui-react";
import ReviewCard from "../review/ReviewCard";

export default class HangoutReview extends Component {
  state = {
    reviews: [],
    hangout: []
  };

  componentDidMount() {
    const newState = {};

    ApiManager.getReviewsFromApi(this.props.match.params.hangoutId).then(
      reviews => (newState.reviews = reviews)
    );
    ApiManager.get("hangouts", this.props.match.params.hangoutId)
      .then(hangout => (newState.hangout = hangout))
      .then(() => this.setState(newState));
  }

  updateApi = (obj, entity) => {
    return ApiManager.put(obj, entity)
      .then(() =>
        ApiManager.getReviewsFromApi(this.props.match.params.hangoutId)
      )
      .then(obj => {
        this.setState({
          [entity]: obj
        });
      });
  };

  deleteReviewFromApi = (obj, entity) => {
    ApiManager.delete(obj, entity)
      .then(() =>
        ApiManager.getReviewsFromApi(this.props.match.params.hangoutId)
      )
      .then(reviews => {
        this.setState({ [entity]: reviews });
      });
  };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column style={{ width: "10%", marginLeft: "2em" }}>
          <Button
            icon="arrow left"
            onClick={() => {
              this.props.history.push("/hangouts");
            }}
          />
        </Grid.Column>
        <Grid.Column style={{marginLeft: "10em"}}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              key={this.state.hangout.id}
              style={{ background: "#8EE48F", boxShadow: "none" }}
            >
              <Image style={{marginBottom: "1em"}} rounded src={this.state.hangout.imgUrl} />
              <Card.Header style={{ fontWeight: "bold", fontSize: "3em" }}>
                {this.state.hangout.hangoutName}
              </Card.Header>
              <Card.Description style={{marginTop: "1em"}}>{this.state.hangout.address}</Card.Description>
            </Card>
            <List style={{marginLeft: "2em"}}>
              {this.state.reviews.map(review => (
                <ReviewCard
                  review={review}
                  updateApi={this.updateApi}
                  key={review.id}
                  deleteReviewFromApi={this.deleteReviewFromApi}
                  hangoutId={this.props.match.params.hangoutId}
                />
              ))}
            </List>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}
