import React, { Component } from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";

export default class EditVisitDestination extends Component {
  state = {
    userId: null,
    hangoutId: null,
    didVisit: null
  };

  updateVisit = evt => {
    let editVisit = {
      id: this.props.visitId,
      userId: this.state.userId,
      hangoutId: this.state.hangoutId,
      didVisit: true
    };
    this.props
      .updateVisitApi(editVisit, "didVisits")
      .then(this.props.handleClose);
  };

  componentDidMount() {
    ApiManager.get("didVisits", this.props.visitId).then(visit => {
      this.setState({
        userId: visit.userId,
        hangoutId: visit.hangoutId,
        didVisit: visit.didVisit
      });
    });
  }

  render() {
    return (
      <Modal open={this.props.modalVisitedEditOpen}>
        <Header style={{color: "#05386B"}} content="Have you visited this Destination?" />
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>
            <Icon name="remove" /> No
          </Button>
          <Button onClick={this.updateVisit}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
