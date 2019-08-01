import React, { Component } from 'react'
import { List, Button, Image } from 'semantic-ui-react';

export default class ReviewCard extends Component {
    state={
        modalOpen: false,
        btnEnabled: false
    }

    componentDidMount() {
        let currentUser = parseInt(sessionStorage.getItem("currentUser"))
        if (this.props.review.user.id === currentUser) {
          this.setState({ btnEnabled: true });
        }
      }

    render() {
        return (
            <List.Item key={this.props.review.id}>
                        <Image avatar src={this.props.review.user.imgUrl} onClick={() => {
                           this.props.history.push(`/${this.props.review.user.id}`)
                        }}
                          />
                        <List.Content>
                          <List.Header >{this.props.review.user.username}</List.Header>
                          <List.Description>
                            Restrictions: {this.props.review.restrictions}
                          </List.Description>
                          <List.Description>
                            Review: {this.props.review.review}
                          </List.Description>
                          <Button content="Edit" size="small" style={{
                    display: this.state.btnEnabled ? "block" : "none"
                  }} />
                             {/* <ReviewForm
                             hangoutId={this.props.hangout.id}
                              addToApi={this.props.addToApi}
                              modalOpen={this.state.modalOpen}
                              handleClose={() => {
                                this.setState({ modalOpen: false });
                              }}
                            /> */}
                             <Button content="Delete" size="small" style={{
                    display: this.state.btnEnabled ? "block" : "none"
                  }}
                onClick={() => {
                                this.setState({ modalVisitedOpen: true });
                              }}/>
                        </List.Content>
                      </List.Item>
        )
    }
}
