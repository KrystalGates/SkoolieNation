import React, { Component } from 'react'
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

export default class ReviewCardDelete extends Component {

handleDeleteReview = () =>{
  this.props.deleteReviewFromApi(this.props.reviewId, "reviews")
}

    render() {
        return (
            <Modal open={this.props.modalDeleteOpen}>
            <Header style={{color: "#05386B"}} content='Are you sure you want to delete this review?' />
            <Modal.Actions>
              <Button onClick={this.props.handleClose}>
                <Icon name='remove' onClick={this.props.handleClose}/> No
              </Button>
              <Button onClick={this.handleDeleteReview}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}
