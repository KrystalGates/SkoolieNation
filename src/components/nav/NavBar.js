import React, { Component } from "react"
import { Link } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import {
    Container,
    Image,
    Menu
  } from "semantic-ui-react"
import busIcon from "./busIcon.png"


export default class NavBar extends Component {

handleLogout = (event)=>{
    sessionStorage.clear()
}
    render() {
        return (

        <Menu >
            <Container>
                <Menu.Item  style={{color: "#EDF5D1"}}as={Link} to="/" header>
                <Image size="mini" src={busIcon} style={{ marginRight: "1.5em" }} />Skoolie Nation
                </Menu.Item>
                    <Menu.Item style={{color: "#EDF5D1"}} as={Link} to="/hangouts">Hangouts</Menu.Item>
                    <Menu.Item style={{color: "#EDF5D1"}} header position ="right" as={Link} onClick={this.handleLogout} to="/login">Logout</Menu.Item>
            </Container>
        </Menu>
        )
    }
}
