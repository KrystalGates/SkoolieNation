import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class HangoutForm extends Component {
  state = {
    hangoutName: "",
    address: "",
    latitude: null,
    longitude: null,
    imgUrl: null
  };

  storageRef = firebase.storage().ref("hangoutImage");

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleNewHangout = event => {
    let hangoutMatch = this.props.hangouts.filter(
      hangout =>
        hangout.address === this.state.address ||
        hangout.hangoutName === this.state.hangoutName
    );
    if (
      this.state.hangoutName === "" ||
      this.state.address === "" ||
      this.state.imgUrl === null
    ) {
      alert("Please fill in all fields!");
    } else if (hangoutMatch.length === 0) {
      const ref = this.storageRef.child(this.state.hangoutName);
      return ref
        .put(this.state.imgUrl)
        .then(data => data.ref.getDownloadURL())
        .then(imageUrl => {
          return this.props
            .addToApi(
              {
                hangoutName: this.state.hangoutName,
                address: this.state.address,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                imgUrl: imageUrl
              },
              "hangouts"
            )
            .then(this.props.handleClose);
        });
    } else {
      alert("Someone has already added this hangout!");
    }
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ longitude: latLng.lng });
        this.setState({ latitude: latLng.lat });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <Modal open={this.props.modalOpen} size="small">
        <Modal.Header>New Hangout</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleNewHangout}>
            <Form.Input
              onChange={this.handleFieldChange}
              id="hangoutName"
              label="Name"
              type="text"
            />
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input"
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <Form.Field
              control="input"
              type="file"
              label="Upload a Photo"
              onChange={e => this.setState({ imgUrl: e.target.files[0] })}
            />
            <Button content="Save" primary />
            <Button onClick={this.props.handleClose}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
