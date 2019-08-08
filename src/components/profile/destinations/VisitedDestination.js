import React, { Component } from "react";
import { Image, Button, List } from "semantic-ui-react";
import RemoveDestination from "./RemoveDestination";

export default class VisitedDestination extends Component {
  state = {
    modalDestinationDeleteOpen: false
  };

  btnEnabled = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUser"));
    let str = false;
    if (this.props.visit.userId === currentUser) {
      str = true;
    }
    return str;
  };

  render() {
    return (
      <List.Item style={{marginBottom: "1em"}}>
        <Image
          rounded
          size="tiny"
          src={this.props.visit.hangout.imgUrl}
          onClick={() => {
            this.props.history.push(`/hangouts/${this.props.visit.hangoutId}`);
          }}
        />
        <List.Content>
          <List.Header style={{color: "#05386B", fontWeight: "bold", fontSize: "1em", marginBottom: ".5em"}}>{this.props.visit.hangout.hangoutName}</List.Header>
          <List.Description style={{color: "#05386B", marginBottom: ".5em"}}>
            {this.props.visit.hangout.address}
          </List.Description>
          <Button
            content="Remove"
            style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            onClick={() => {
              this.setState({ modalDestinationDeleteOpen: true });
            }}
          />
          <RemoveDestination
            modalDestinationDeleteOpen={this.state.modalDestinationDeleteOpen}
            handleClose={() => {
              this.setState({ modalDestinationDeleteOpen: false });
            }}
            deleteVisitFromApi={this.props.deleteVisitFromApi}
            didVisitId={this.props.visit.id}
          />
        </List.Content>
      </List.Item>
    );
  }
}
