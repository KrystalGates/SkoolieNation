import React, { Component } from "react";
import { Image, Button, List } from "semantic-ui-react";
import RemoveDestination from "./RemoveDestination";
import EditVisitDestination from "./EditVisitDestination";

export default class DesiredDestination extends Component {
  state = {
    modalDestinationDeleteOpen: false,
    modalVisitedEditOpen: false
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
      <List.Item>
        <Image
          rounded
          size="tiny"
          src={this.props.visit.hangout.imgUrl}
          onClick={() => {
            this.props.history.push(`/hangouts/${this.props.visit.hangoutId}`);
          }}
        />
        <List.Content>
          <List.Header>{this.props.visit.hangout.hangoutName}</List.Header>
          <List.Description>
            {this.props.visit.hangout.address}
          </List.Description>
          <div style={{  display: "flex",
  flexDirection: "row"}}>
          <div>

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
          </div>


<div>

          <Button
            content="Move to visited"
            style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            onClick={() => {
              this.setState({ modalVisitedEditOpen: true });
            }}
          />


          <EditVisitDestination
            updateVisitApi={this.props.updateVisitApi}
            visitId={this.props.visit.id}
            modalVisitedEditOpen={this.state.modalVisitedEditOpen}
            handleClose={() => {
              this.setState({ modalVisitedEditOpen: false });
            }}
          />
</div>
          </div>
        </List.Content>
      </List.Item>
    );
  }
}
