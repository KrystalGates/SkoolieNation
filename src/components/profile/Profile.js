import React, { Component } from 'react'
import { Image, Grid, Header, Card, GridColumn, Container } from 'semantic-ui-react'

export default class Profile extends Component {
    
    state = {
        saveDisabled: false
      };

    render() {
        return (

                    <Grid column={5} row={3} relaxed='very' stackable>
                {
                    this.props.user.map(userinfo =>
                        <Container key={userinfo.id}>
                        <Grid.Row>
                        <Grid.Column>
                            <Header>{userinfo.username}</Header>
                            <Image src={userinfo.imgUrl} size="medium" />
                        </Grid.Column>
                        <Grid.Column>
                        <Header>About My Skoolie</Header>
                        {userinfo.aboutMe}
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <GridColumn>
                            {/* Map goes here */}
                            </GridColumn>
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
                    )
                }
                    </Grid>

        )
    }
}
