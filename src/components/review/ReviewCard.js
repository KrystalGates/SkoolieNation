import React, { Component } from 'react'
import { List, Button, Image } from 'semantic-ui-react';
import ReviewCardDelete from './ReviewCardDelete';
import ReviewFormEdit from './ReviewFormEdit';
import moment from 'moment'


export default class ReviewCard extends Component {
    state={
        modalEditOpen: false,
        modalDeleteOpen: false,
        btnEnabled: false
    }

    componentDidMount() {
        let currentUser = parseInt(sessionStorage.getItem("currentUser"))
        if (this.props.review.user.id === currentUser) {
            this.setState({ btnEnabled: true });
        }
    }

    render() {
        const date=moment(this.props.review.date).format("MMM Do YYYY");
        return (
            <List.Item key={this.props.review.id}>
                        <Image avatar src={this.props.review.user.imgUrl} onClick={() => {
                           this.props.history.push(`/${this.props.review.user.id}`)
                        }}
                          />
                        <List.Content>
                          <List.Header >{this.props.review.user.username}</List.Header>
                          <List.Description>Date Posted: {date} </List.Description>
                          <List.Description>
                            Restrictions: {this.props.review.restrictions}
                          </List.Description>
                          <List.Description>
                            Review: {this.props.review.review}
                          </List.Description>
                          <Button content="Edit" size="small" style={{
                    display: this.state.btnEnabled ? "block" : "none"
                  }} onClick={() => {
                    this.setState({ modalEditOpen: true });
                  }} />
                             <ReviewFormEdit
                             reviewId={this.props.review.id}
                             updateApi={this.props.updateApi}
                             modalOpen={this.state.modalEditOpen}
                              handleClose={() => {
                                this.setState({ modalEditOpen: false });
                              }}
                            />
                             <Button content="Delete" size="small" style={{
                    display: this.state.btnEnabled ? "block" : "none"
                  }}
                onClick={() => {
                                this.setState({ modalDeleteOpen: true });
                              }}/>
                              <ReviewCardDelete modalDeleteOpen={this.state.modalDeleteOpen} handleClose={() => { this.setState({ modalDeleteOpen: false})}} />
                        </List.Content>
                      </List.Item>
        )
    }
}
