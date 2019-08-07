import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TOKEN } from "../../../config/mapbox";
import "./map.css";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 39.8283,
      longitude: -98.5795,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: "50%",
      height: 500
    },
    popupInfo: null
  };

  showDetails = () => {
    this.setState({ popupInfo: true });
  };

  hideDetails = () => {
    this.setState({ popupInfo: null });
  };

  renderPopup(marker) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={marker.hangout.longitude}
          latitude={marker.hangout.latitude}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>{marker.hangout.hangoutName}</p>
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={TOKEN}
        children={this.props.children}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
          {this.props.userVisited.map(marker => {
            return (
              <Marker
                latitude={marker.hangout.latitude}
                longitude={marker.hangout.longitude}
                offsetLeft={-5}
                offsetTop={-10}
              >
                <div
                  key={marker.hangout.id}
                  className="mapMarkerStyleVisited"
                  onMouseEnter={() => this.setState({ popupInfo: true })}
                  onMouseLeave={() => this.setState({ popupInfo: null })}
                />
                {this.renderPopup(marker)}
              </Marker>
            );
          })}
          {this.props.userDesiredVisit.map(marker => {
            return (
              <div>
                <Marker
                  latitude={marker.hangout.latitude}
                  longitude={marker.hangout.longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <div
                    key={marker.hangout.id}
                    className="mapMarkerStyleDesired"
                    onMouseEnter={() => this.setState({ popupInfo: true })}
                    onMouseLeave={() => this.setState({ popupInfo: null })}
                  />
                  {this.renderPopup(marker)}
                </Marker>
              </div>
            );
          })}
        </div>
      </ReactMapGL>
    );
  }
}
