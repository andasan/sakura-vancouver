import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import 'antd/dist/antd.css';
import { svg } from './cherry';
import MenuComponent from './MenuComponent';
import './App.css';

const layoutLayer = { 'icon-image': 'cherryBlossom' };

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
const images = ['cherryBlossom', image];

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESSTOKEN
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-123.131, 49.251],
      zoom: [11.8],
      streetTrees: []
    };

  }

  handleTreeChange = arr => {
    this.setState({ streetTrees: arr })
  }

  render() {

    return (
      <>
        <header>SAKURA 2020</header>
        <MenuComponent onTreeChange={this.handleTreeChange} />

        <Map
          style='mapbox://styles/andasan/ck71fj2bf0cpd1ikjd01exi05'
          center={this.state.center}
          zoom={this.state.zoom}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
            {this.state.streetTrees.filter(tree => {
              return tree.geom !== null;
            }).map(coords => (
              <Feature key={coords.recordid} coordinates={coords.geom.geometry.coordinates} />
            ))
            }
          </Layer>
        </Map>
      </>
    );
  }
}

export default App;