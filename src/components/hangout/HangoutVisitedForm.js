import React, { Component } from 'react'
import { Button, Header, Modal } from "semantic-ui-react";


export default class HangoutVisitedForm extends Component {
  state={
    didVisit: null
  }

  handleDesiredHangout = () => {
    const desired = {
      userId: parseInt(sessionStorage.getItem("currentUser")),
      hangoutId: this.props.hangoutId,
      didVisit: false
    }
    this.props.addToApi(desired, "didVisits")
    .then(this.props.handleClose)
  }

  handleVisitedHangout = () => {
    const visited = {
      userId: parseInt(sessionStorage.getItem("currentUser")),
      hangoutId: this.props.hangoutId,
      didVisit: true
    }
    this.props.addToApi(visited, "didVisits")
    .then(this.props.handleClose)

  }
    render() {
        return (
             <Modal closeIcon onClose={this.props.handleClose} open={this.props.modalVisitedOpen}>
            <Header content='Desired Hangout or Visited?' />
            <Modal.Actions>
              <Button content="Desired" onClick={this.handleDesiredHangout} />
              <Button content="Visited" onClick={this.handleVisitedHangout} />
            </Modal.Actions>
          </Modal>
        )
    }
}
