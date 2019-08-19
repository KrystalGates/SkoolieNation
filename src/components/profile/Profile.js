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
import desired from "./map/desired.png"
import visited from "./map/visited.png"

export default class Profile extends Component {
  state = {
    editEnabled: false,
    modalOpen: false
  };

  editBtnEnabled = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUser"));
    let findUser = this.props.user.map(user => (user.id === currentUser))
    return findUser[0];
  };

  render() {
    return (
      <React.Fragment>
        <Grid columns={2}>
          <Grid.Row>

          {this.props.user.map(userinfo => (
            <React.Fragment>
              <Grid.Column style={{ width: "45%"}}>
                <Segment style={{border: "none", boxShadow: "none"}}>
                  <Header style={{fontSize: "3em"}}>{userinfo.username}</Header>
                  <Image
                    src={userinfo.imgUrl}
                    size="large"
                    rounded

                  />
                </Segment>
                <Segment style={{border: "none", boxShadow: "none"}}>
                  <Header style={{fontSize: "2em"}}>About My Skoolie</Header>
                  <div style={{ whiteSpace: "pre", marginBottom: "1em" }}>{userinfo.aboutMe} </div>
                  <Button
                    content="Edit"
                    icon="signup"
                    size="tiny"
                    style={{
                      display: this.editBtnEnabled() ? "block" : "none"
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
                <div style={{marginTop: "1em"}}>
                  <Header style={{fontSize: "2em"}}>Your Destinations</Header>
                  <Map
                    userDesiredVisit={this.props.userDesiredVisit}
                    userVisited={this.props.userVisited}
                  />
                </div>
              </Grid.Column>
            </React.Fragment>
          ))}
           </Grid.Row>
        </Grid>
<Grid columns={2} style={{marginTop: "1em"}}>
  <Grid.Column>

        <List style={{marginLeft: "10em"}}>
          <Header style={{fontSize: "2em"}}>
            Desired Destination
            <Image
              src={desired}
              style={{ marginRight: "1.5em" }}
            />
          </Header>
          {this.props.userDesiredVisit.map(visit => (
            <DesiredDestination {...this.props}
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
          <Header style={{fontSize: "2em"}}>
            Visited Destinations{" "}
            <Image
              src={visited}
              style={{ marginRight: "1.5em" }}
            />
          </Header>
          {this.props.userVisited.map(visit => (
            <VisitedDestination {...this.props}
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
