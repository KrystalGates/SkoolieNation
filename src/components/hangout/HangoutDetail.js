import React, { Component } from 'react'
import ApiManager from "../../modules/ApiManager";
import { Container, List, Card, Image } from 'semantic-ui-react';
import ReviewCard from '../review/ReviewCard';

export default class HangoutDetail extends Component {
    state={
        reviews:[],
        hangout: ""
    }

    componentDidMount() {
        const newState = {};

        ApiManager.getReviewsFromApi(this.props.match.params.hangoutId).then(reviews => (newState.reviews = reviews))
        ApiManager.get("hangouts", this.props.match.params.hangoutId).then(hangout => (newState.hangout = hangout))
          .then(() => this.setState(newState));
          }

    render() {
        return (
            <Container>
                <Card size="small">
                    <Image rounded src={this.state.hangout.imgUrl} />
                    <Card.Header>{this.state.hangout.hangoutName}</Card.Header>
                    <Card.Description>
                     Address: {this.state.hangout.address}
                    </Card.Description>
                </Card>
                <List>
                {
                    this.state.reviews.map(review => (
                        <ReviewCard review={review} />

                    ))
                }
                </List>
            </Container>
        )
    }
}
