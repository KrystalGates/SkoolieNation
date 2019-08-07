import React, { Component } from "react";
import {
  Image,
  Grid,
  Header,
  Container,
  Button,
  List
} from "semantic-ui-react";
import AboutMeEdit from "./AboutMe/AboutMeEdit";
import VisitedDestination from "./destinations/VisitedDestination";
import DesiredDestination from "./destinations/DesiredDestination";
import Map from "./map/Map.js"

export default class Profile extends Component {
  state = {
    editEnabled: false,
    modalOpen: false
  };

  componentDidMount() {
    let currentUser = this.props.user.filter(
      user => user.id === sessionStorage.getItem("currentUser")
    );
    if (currentUser === 0) {
      this.setState({ editEnabled: true });
    }
  }

  render() {
    return (
      <Grid divid="vertically" stackable>
        {this.props.user.map(userinfo => (
          <Container key={userinfo.id}>
            <Grid.Row columns={2} stretched>
              <Grid.Column>
                <Header>{userinfo.username}</Header>
                <Image
                  src={userinfo.imgUrl}
                  size="medium"
                  rounded
                  floated="left"
                />
              </Grid.Column>
              <Grid.Column>
                <Header>About My Skoolie</Header>
                <div style={{whiteSpace: "pre"}}>{userinfo.aboutMe} </div>
                <Button
                  content="Edit"
                  icon="signup"
                  size="tiny"
                  style={{
                    display: !this.state.editEnabled ? "block" : "none"
                  }}
                  onClick={() => {
                    this.setState({ modalOpen: true });
                  }}
                />
                <AboutMeEdit
                  updateApi={this.props.updateApi}
                  userId={userinfo.id}
                  modalOpen={this.state.modalOpen}
                  handleClose={() => {
                    this.setState({ modalOpen: false });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header>Your Destinations</Header>
                <Map userDesiredVisit={this.props.userDesiredVisit} userVisited={this.props.userVisited} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List>
                  <Header>Desired Destination</Header>
                  {this.props.userDesiredVisit.map(visit => (
                    <DesiredDestination visit={visit} key={visit.id} deleteVisitFromApi={this.props.deleteVisitFromApi} updateVisitApi={this.props.updateVisitApi} />
                  ))}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List>
                  <Header>Visited Destinations</Header>
                  {this.props.userVisited.map(visit => (
                    <VisitedDestination visit={visit} key={visit.id} deleteVisitFromApi={this.props.deleteVisitFromApi} />
                  ))}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Container>
        ))}
      </Grid>
    );
  }
}
