import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
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
      width: "100%",
      height: 600
    }
  };

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/krystalsabrina14/cjz1qzllg2lc11cldki59nyl0"
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
                />
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
                  />
                </Marker>
              </div>
            );
          })}
        </div>
      </ReactMapGL>
    );
  }
}
