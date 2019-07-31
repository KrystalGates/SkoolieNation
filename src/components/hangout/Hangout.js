import React, { Component } from 'react'
import { Header, Container, Button, Search, List, Image } from 'semantic-ui-react';
import HangoutForm from './HangoutForm';

export default class Hangout extends Component {
    state = {
        modalOpen: false,
        isLoading: false,
        results: [],
        value: ''
      };

    render() {
        return (
            <Container>
                <Header>Hangouts</Header>
                <Button content="Add a Hangout" onClick={() => {
                    this.setState({ modalOpen: true });
                  }}/>
                 <HangoutForm
                  hangouts={this.props.hangouts}
                  addHangout={this.props.addHangout}
                  modalOpen={this.state.modalOpen}
                  handleClose={() => {
                    this.setState({ modalOpen: false });
                  }}
                />
                   <Search
            // loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={_.debounce(this.handleSearchChange, 500, {
            //   leading: true,
            // })}
            // results={results}
            // value={value}
            // {...this.props}
          />
                <List>
                    {
                        this.props.hangouts.map(hangout =>(
                            <List.Item key={hangout.id}>
                              <Image avatar src={hangout.imgUrl} />
                              <List.Content>
                                <List.Header >{hangout.hangoutName}</List.Header>
                                <List.Description>
                                  Address: {hangout.address}
                                </List.Description>
                                <Button content="Write Review" size="tiny" />
                              </List.Content>
                            </List.Item>
                         ))
                        }
                        </List>
            </Container>
        )
    }
}
