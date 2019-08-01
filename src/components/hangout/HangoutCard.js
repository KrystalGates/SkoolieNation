import React, { Component } from 'react'
import { Button, List, Image } from 'semantic-ui-react';
import ReviewForm from '../review/ReviewForm';
import HangoutVisitedForm from './HangoutVisitedForm';

export default class HangoutCard extends Component {
  state={
    modalOpen: false,
    modalVisitedOpen: false
  }
    render() {
        return (
            <List.Item key={this.props.hangout.id}>
            <Image avatar src={this.props.hangout.imgUrl} onClick={() => {
               this.props.history.push(`/hangouts/${this.props.hangout.id}`)
            }}
              />
            <List.Content>
              <List.Header >{this.props.hangout.hangoutName}</List.Header>
              <List.Description>
                 {this.props.hangout.address}
              </List.Description>
              <Button content="Write a Review" size="small" onClick={() => {
                    this.setState({ modalOpen: true });
                  }}/>
                 <ReviewForm
                 hangoutId={this.props.hangout.id}
                  addToApi={this.props.addToApi}
                  modalOpen={this.state.modalOpen}
                  handleClose={() => {
                    this.setState({ modalOpen: false });
                  }}
                />
                 <Button content="Add to your Skoolie's Map" size="small" onClick={() => {
                    this.setState({ modalVisitedOpen: true });
                  }}/>
                  <HangoutVisitedForm  modalVisitedOpen={this.state.modalVisitedOpen}/>
            </List.Content>
          </List.Item>
        )
    }
}
