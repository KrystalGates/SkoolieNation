import React, { Component } from 'react'
import { Button, List, Image } from 'semantic-ui-react';

export default class HangoutCard extends Component {
    render() {
        return (
            <List.Item key={this.props.hangout.id}>
            <Image avatar src={this.props.hangout.imgUrl} />
            <List.Content>
              <List.Header >{this.props.hangout.hangoutName}</List.Header>
              <List.Description>
                Address: {this.props.hangout.address}
              </List.Description>
              <Button content="Write Review" size="tiny" />
            </List.Content>
          </List.Item>
        )
    }
}
