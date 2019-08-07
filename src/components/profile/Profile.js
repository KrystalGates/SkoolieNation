import React, { Component } from "react";
import {
  Image,
  Grid,
  Header,
  Segment,
  Button,
  List
} from "semantic-ui-react";
import AboutMeEdit from "./AboutMe/AboutMeEdit";
import VisitedDestination from "./destinations/VisitedDestination";
import DesiredDestination from "./destinations/DesiredDestination";
import Map from "./map/Map.js";
import location from "./map/location.svg";
import locationPin from "./map/locationPin.svg";

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
      <React.Fragment>
        <Grid columns={2}>
          <Grid.Row>

          {this.props.user.map(userinfo => (
            // <Container key={userinfo.id}>
            <React.Fragment>
              <Grid.Column style={{ width: "35%"}}>
                <Segment style={{border: "none", boxShadow: "none"}}>
                  <Header>{userinfo.username}</Header>
                  <Image
                    src={userinfo.imgUrl}
                    size="medium"
                    rounded

                  />
                </Segment>
                <Segment style={{border: "none", boxShadow: "none"}}>
                  <Header>About My Skoolie</Header>
                  <div style={{ whiteSpace: "pre" }}>{userinfo.aboutMe} </div>
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
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Header>Your Destinations</Header>
                  <Map
                    userDesiredVisit={this.props.userDesiredVisit}
                    userVisited={this.props.userVisited}
                  />
                </div>
              </Grid.Column>
            {/* // </Container> */}
            </React.Fragment>
          ))}
           </Grid.Row>
        </Grid>
<Grid columns={2}>
  <Grid.Column>

        <List style={{marginLeft: "10em"}}>
          <Header>
            Desired Destination
            <Image
              size="mini"
              src={location}
              style={{ marginRight: "1.5em" }}
            />
          </Header>
          {this.props.userDesiredVisit.map(visit => (
            <DesiredDestination
              visit={visit}
              key={visit.id}
              deleteVisitFromApi={this.props.deleteVisitFromApi}
              updateVisitApi={this.props.updateVisitApi}
            />
          ))}
        </List>
  </Grid.Column>
  <Grid.Column>

        <List style={{marginLeft: "10em"}}>
          <Header>
            Visited Destinations{" "}
            <Image
              size="mini"
              src={locationPin}
              style={{ marginRight: "1.5em" }}
            />
          </Header>
          {this.props.userVisited.map(visit => (
            <VisitedDestination
              visit={visit}
              key={visit.id}
              deleteVisitFromApi={this.props.deleteVisitFromApi}
            />
          ))}
        </List>
  </Grid.Column>

        </Grid>
      </React.Fragment>
    );
  }
}
