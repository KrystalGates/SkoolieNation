import React, { Component } from 'react'
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

export default class ReviewCardDelete extends Component {

handleDeleteReview = () =>{
  this.props.deleteFromApi(this.props.reviewId, "reviews")
  .then(this.props.handleClose)
}

    render() {
        return (
            <Modal open={this.props.modalDeleteOpen}>
            <Header content='Are you sure you want to delete this review?' />
            <Modal.Actions>
              <Button color='red' onClick={this.props.handleClose}>
                <Icon name='remove' onClick={this.props.handleClose}/> No
              </Button>
              <Button color='green' onClick={this.handleDeleteReview}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}
