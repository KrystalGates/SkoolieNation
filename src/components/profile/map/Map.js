import React, {Component} from 'react';
import MapGL, {NavigationControl, Marker,Popup} from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
import {bus} from './bus.svg'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN="pk.eyJ1Ijoia3J5c3RhbHNhYnJpbmExNCIsImEiOiJjanlhYTI0Y2UwY3J4M21zYThxdGl4MTN4In0.oNqI6bZSc0aNic8KkXsl0g"

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const markerList=[
    {lat: 17.441013,
    long: 78.391796,
    info: 10},
    { lat:17.442889,
    long: 78.396073,
    info: 20},
    {lat: 17.441681,
    long: 78.394357,
    info: 10}
    ];
export default class Map extends Component {
state= {
      viewport: {
        latitude: 17.442120,
        longitude: 78.391384,
        zoom: 15,
        bearing: 0,
        pitch: 0,
        width: '50%',
        height: 500,
      },
      popupInfo: null
    };


showDetails=() => {
this.setState({popupInfo: true});
}

hideDetails= ()=> {
this.setState({popupInfo: null});
}

renderPopup(index){
    return this.state.popupInfo && (
      <Popup tipSize={5}
        anchor="bottom-right"
        longitude={markerList[index].long}
        latitude={markerList[index].lat}
        onMouseLeave={() => this.setState({popupInfo: null})}
        closeOnClick={true}>
        <p>Available beds:{markerList[index].info}</p>
      </Popup>
    )
  }

render() {
    const {viewport} = this.state;
return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={TOKEN} >
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>
              {markerList.map((marker, index)=>{
                 return(<div key={index} > <Marker  longitude={marker.long} latitude={marker.lat}>
                    <Icon src={bus} size='big' onMouseEnter={()=>this.setState({popupInfo: true})} onMouseLeave={()=>this.setState({popupInfo: null})}/>
                    </Marker> {this.renderPopup(index)}</div> );
              }
               ) }
       </div>
      </MapGL>
    );
  }
}

