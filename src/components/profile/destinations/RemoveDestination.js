import React, { Component } from 'react'
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

export default class RemoveDestination extends Component {

    // handleDeleteReview = () =>{
    //     this.props.deleteReviewFromApi(this.props.reviewId, "didVisits")
    //     .then(this.props.handleClose)
    //   }

    render() {
        console.log("modal")
        return (
            <Modal open={this.props.modalDestinationDeleteOpen}>
            <Header content='Are you sure you want to delete this Destination?' />
            <Modal.Actions>
              <Button color='red' onClick={this.props.handleClose}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={this.handleDeleteReview}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}
