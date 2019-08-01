import React, { Component } from 'react'

export default class VisitedHangoutForm extends Component {
    render() {
        return (
            <Modal  open={this.props.modalVisitedOpen}
            size='small'
            >
            <Modal.Header>Have you visited </Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.handleNewReview}>
                <CharacterCounter value={this.state.restrictions} maxLength={150} >
                <Form.TextArea
                onChange={this.handleFieldChange}
                id="restrictions"
                label="Skoolie Restrictions"
                type="text"
              />
                </CharacterCounter>
              <CharacterCounter value={this.state.review} maxLength={350} >
                <Form.TextArea
                onChange={this.handleFieldChange}
                id="review"
                label="Review"
                type="text"
              />
              </CharacterCounter>
                    <Button content='Add Review' primary  />
                    <Button onClick = {this.props.handleClose}>Cancel
        </Button>
                </Form>
            </Modal.Content>
            </Modal>
        )
    }
}
