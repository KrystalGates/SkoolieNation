import React, { Component } from 'react'
import ApiManager from "../../modules/ApiManager";
import { Container, List, Card, Image } from 'semantic-ui-react';
import ReviewCard from '../review/ReviewCard';

export default class HangoutReview extends Component {
    state={
        reviews:[],
        hangout: []
    }

    componentDidMount() {
        const newState = {};

        ApiManager.getReviewsFromApi(this.props.match.params.hangoutId).then(reviews => (newState.reviews = reviews))
        ApiManager.get("hangouts", this.props.match.params.hangoutId).then(hangout => (newState.hangout = hangout))
          .then(() => this.setState(newState));
          }

          updateApi = (obj, entity) => {
            return ApiManager.put(obj, entity)
              .then(() => ApiManager.getReviewsFromApi(this.props.match.params.hangoutId))
              .then(obj => {
                this.setState({
                  [entity]: obj
                });
              });
          };

          deleteFromApi = (obj, entity) =>
          ApiManager.delete(obj, entity)
            .then(ApiManager.getReviewsFromApi())
            .then(obj => {
              this.setState({ [entity]: obj });
            });

    render() {
        return (
            <Container>
                <Card key={this.state.hangout.id} size="small">
                    <Image rounded src={this.state.hangout.imgUrl} />
                    <Card.Header>{this.state.hangout.hangoutName}</Card.Header>
                    <Card.Description>
                     Address: {this.state.hangout.address}
                    </Card.Description>
                </Card>
                <List>
                {
                    this.state.reviews.map(review => (
                        <ReviewCard review={review} updateApi={this.updateApi} key={review.id} deleteFromApi={this.deleteFromApi} />

                    ))
                }
                </List>
            </Container>
        )
    }
}
