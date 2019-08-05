import React, { Component } from 'react'
import {
    Image,
    Button,
    List
  } from "semantic-ui-react";

export default class DesiredDestination extends Component {

    btnEnabled = () => {
        let currentUser = parseInt(sessionStorage.getItem("currentUser"));
        let str = false
        if (this.props.visit.userId === currentUser) {
          str=true
        }
        return str
      }

    render() {
        return (
            <List.Item>
            <Image
              rounded
              size="tiny"
              src={this.props.visit.hangout.imgUrl}
              onClick={() => {
                this.props.history.push(
                  `/hangouts/${this.props.visit.hangoutId}`
                );
              }}
            />
            <List.Content>
              <List.Header>{this.props.visit.hangout.hangoutName}</List.Header>
              <List.Description>
                {this.props.visit.hangout.address}
              </List.Description>
            <Button content="Remove"
                      style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            />
            <Button content="Move to visited"
                      style={{
              display: this.btnEnabled() ? "block" : "none"
            }}
            />
            </List.Content>
          </List.Item>
        )
    }
}
