import React, { Component } from 'react'
import _ from "lodash";
import { Header, Container, Button, Search, List} from 'semantic-ui-react';
import HangoutForm from './HangoutForm';
import HangoutCard from './HangoutCard';

const initialState = { modalOpen: false,isLoading: false, results: [], value: '', hangoutId: null }

export default class HangoutList extends Component {
  state = initialState

      handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, hangoutId: result.id })
        this.props.history.push(`/hangouts/${this.state.hangoutId}`)
      }

      handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.title)

          this.setState({
            isLoading: false,
            results: _.filter(this.props.source, isMatch),
          })
        }, 300)
      }

    render() {
        return (
            <Container>
                <Header>Hangouts</Header>
                <Button content="Add a Hangout" onClick={() => {
                    this.setState({ modalOpen: true });
                  }}/>
                 <HangoutForm
                  hangouts={this.props.hangouts}
                  addToApi={this.props.addToApi}
                  modalOpen={this.state.modalOpen}
                  handleClose={() => {
                    this.setState({ modalOpen: false });
                  }}
                />
               <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={this.state.results}
            value={this.state.value}
            {...this.props}
          />
                <List>
                    {
                        this.props.hangouts.map(hangout =>(
                            <HangoutCard hangout={hangout} addToApi={this.props.addToApi} {...this.props} key={hangout.id} />
                         ))
                        }
                        </List>
            </Container>
        )
    }
}
