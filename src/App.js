import React, { Fragment } from 'react';
import Media from 'react-media';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { GeolocateControl } from "mapbox-gl";
import 'antd/dist/antd.css';
import { svg } from './cherry';
import MenuComponent from './MenuComponent';
import MenuMobileComponent from './MenuMobileComponent';
import LoadingScreen from './LoadingScreen';
import './App.css';
import styled from 'styled-components';

const layoutLayer = { 'icon-image': 'cherryBlossom' };
const onMapLoad = map => { map.addControl(new GeolocateControl()); };

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
const images = ['cherryBlossom', image];

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESSTOKEN
});

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
  position: relative;
  z-index: 200;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 0 0 5px 5px;

  ${StyledPopup}:hover & {
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const CopyrightComp = styled.div`
  z-index: 100;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);
  background: rgba(255,255,255,0.6);
  color: #3f618c;
  font-weight: 400;
  font-size: 80%;
  padding: 5px;

  @media (max-width: 768px) {
    font-size: 50%;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-123.131, 49.251],
      zoom: [11.8],
      streetTrees: [],
      tree: undefined,
      loading: false
    };

  }

  markerClick = (tree) => {
    this.setState({
      center: tree.geom.geometry.coordinates,
      zoom: [16],
      tree
    });
  };

  handleTreeChange = arr => {
    this.setState({
      streetTrees: arr,
      tree: undefined
    })
  }

  handlePreloader = stats => {
    this.setState({ loading: stats });
  }

  resizeMap() {
    let { map } = this.state;
    if (map) {
      map.resize();
      if (this.props.center) {
        map.setCenter(this.props.center);
      }
    }
  }

  render() {
    const { center, zoom, streetTrees, tree } = this.state;

    return (
      <Container>

        <header>SAKURA 2020</header>
        <Media queries={{
          small: "(max-width: 1023px)",
          large: "(min-width: 1024px)"
        }}>
          {matches => (
            <Fragment>
              {matches.small && <MenuMobileComponent onTreeChange={this.handleTreeChange} preloaderStatus={this.handlePreloader} />}
              {matches.large && <MenuComponent onTreeChange={this.handleTreeChange} preloaderStatus={this.handlePreloader} />}
            </Fragment>
          )}
        </Media>
        
        {this.state.loading && <LoadingScreen />}
        {this.resizeMap()}
        <Map
          style='mapbox://styles/andasan/ck71fj2bf0cpd1ikjd01exi05'
          center={center}
          zoom={zoom}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          onStyleLoad={onMapLoad}
        >
          <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
            {streetTrees.filter(tree => {
              return tree.geom !== null;
            }).map(coords => (
              <Feature
                key={coords.tree_id}
                coordinates={coords.geom.geometry.coordinates}
                onClick={() => { this.markerClick(coords) }}
              />
            ))
            }
          </Layer>
          {tree && (
            <Popup
              key={tree.tree_id}
              coordinates={tree.geom.geometry.coordinates}
              onClick={() => { this.setState({ tree: undefined }) }}
            >
              <StyledPopup>
                <CloseButton><i>close</i></CloseButton>
                <div><br />{tree.common_name}</div>
                <div>
                  Street: {tree.std_street}<br />
                  Species Name: {tree.species_name}
                </div>
              </StyledPopup>
            </Popup>
          )}
        </Map>
        <CopyrightComp>
          Created by &copy;Andasan | Images from: https://www.vcbf.ca/
        </CopyrightComp>
      </Container>
    );
  }
}

export default App;