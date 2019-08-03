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
    console.log(this.props.match.params.userId)
    console.log("visited", this.props.userVisited);
    console.log("desired", this.props.userDesiredVisit);
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
                {userinfo.aboutMe}
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List>
                  <Header>Desired Destination</Header>
                  {this.props.userDesiredVisit.map(visit => (
                    <List.Item>
                      <Image
                        rounded
                        size="tiny"
                        src={visit.hangout.imgUrl}
                        onClick={() => {
                          this.props.history.push(
                            `/hangouts/${visit.hangoutId}`
                          );
                        }}
                      />
                      <List.Content>
                        <List.Header>{visit.hangout.hangoutName}</List.Header>
                        <List.Description>
                          {visit.hangout.address}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List>
                  <Header>Visited Destinations</Header>
                  {this.props.userVisited.map(visit => (
                    <List.Item>
                      <Image
                        rounded
                        size="tiny"
                        src={visit.hangout.imgUrl}
                        onClick={() => {
                          this.props.history.push(
                            `/hangouts/${visit.hangoutId}`
                          );
                        }}
                      />
                      <List.Content>
                        <List.Header>{visit.hangout.hangoutName}</List.Header>
                        <List.Description>
                          {visit.hangout.address}
                        </List.Description>
                      </List.Content>
                    </List.Item>
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
