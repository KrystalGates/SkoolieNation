import React, { Component } from "react";
import {
  Image,
  Grid,
  Header,
  GridColumn,
  Container,
  Button
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
    return (
      <Grid column={5} row={3} relaxed="very" stackable>
        {this.props.user.map(userinfo => (
          <Container key={userinfo.id}>
            <Grid.Row>
              <Grid.Column>
                <Header>{userinfo.username}</Header>
                <Image src={userinfo.imgUrl} size="medium" />
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
              <GridColumn>{/* Map goes here */}</GridColumn>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header>Visited Destinations</Header>
              </Grid.Column>
              <Grid.Column>
                <Header>Desired Destinations</Header>
              </Grid.Column>
            </Grid.Row>
          </Container>
        ))}
      </Grid>
    );
  }
}
