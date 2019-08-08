import React, { Component } from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

export default class RemoveDestination extends Component {
  handleDeleteVisit = () => {
    this.props.deleteVisitFromApi(this.props.didVisitId, "didVisits");
  };

  render() {
    return (
      <Modal open={this.props.modalDestinationDeleteOpen}>
        <Header style={{color: "#05386B"}} content="Are you sure you want to delete this Destination?" />
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>
            <Icon name="remove" /> No
          </Button>
          <Button onClick={this.handleDeleteVisit}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
