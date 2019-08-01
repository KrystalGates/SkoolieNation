import React, { Component } from 'react'
import { Button, Header, Modal } from "semantic-ui-react";

export default class HangoutVisitedForm extends Component {
    render() {
        return (
             <Modal open={this.props.modalVisitedOpen}>
            <Header content='Desired Hangout or Visited?' />
            <Modal.Actions>
              <Button content="Desired" />
              <Button content="Visited" />
            </Modal.Actions>
          </Modal>
        )
    }
}
