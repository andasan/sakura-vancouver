import React from "react";
import { Menu, Button, Dropdown, Icon, message } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/antd.css";



class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTitle: 'Cherry Cultivars',
    };

  }

  render() {

    const getTree = (treeName,title) => {
      axios.get(`https://opendata.vancouver.ca/api/v2/catalog/datasets/street-trees/exports/json?search=${treeName}&rows=-1&pretty=false&timezone=UTC`)
      // axios.get(`https://opendata.vancouver.ca/api/v2/catalog/datasets/street-trees/records?search=${treeName}&rows=225&pretty=false&timezone=UTC`)
      // axios.get(`https://opendata.vancouver.ca/api/records/1.0/search//?dataset=street-trees&q=${treeName}&rows=200`)
      // axios.get(`https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=${treeName}&rows=200&facet=genus_name&facet=species_name&facet=common_name&facet=assigned&facet=root_barrier&facet=plant_area&facet=on_street&facet=neighbourhood_name&facet=street_side_name&facet=height_range_id&facet=curb&facet=date_planted&refine.plant_area=10&refine.common_name=AKEBONO+FLOWERING+CHERRY`)
        .then(res => {
          const treeArray = res.data;
          this.setState({menuTitle: title})
          this.props.onTreeChange(treeArray);
        })
    }

    const onClick = ({ key, item }) => {
      message.info(`Clicked on : ${item.props.children}`);
      getTree(key, item.props.children);
    };
    
    const Menus = (
      <Menu onClick={onClick}>
        <Menu.Item key="Accolade cherry">Accolade Cherry</Menu.Item>
        <Menu.Item key="Akebono flowering cherry">Akebono Flowering Cherry</Menu.Item>
        <Menu.Item key="Amanogawa">Ama-no-gawa</Menu.Item>
        <Menu.Item key="Kiku shidare zakura">Kiku-shidare-zakura</Menu.Item>
        <Menu.Item key="Mikuruma">Mikuruma-gaeshi</Menu.Item>
        <Menu.Item key="Pink perfection">Pink Perfection</Menu.Item>
        <Menu.Item key="Rancho">Rancho Sargent Cherry</Menu.Item>
        <Menu.Item key="Shirofugen">Shiro-fugen</Menu.Item>
        <Menu.Item key="Shirotae(Mt Fuji) Cherry">Shirotae (Mt. Fuji) Cherry</Menu.Item>
        <Menu.Item key="Shogetsu">Shogetsu</Menu.Item>
        <Menu.Item key="Snow goose">Snow Goose</Menu.Item>
        <Menu.Item key="Yoshino">Somei-yoshino</Menu.Item>
        <Menu.Item key="Common chokecherry">Spire</Menu.Item>
        <Menu.Item key="Japanese Flowering Cherry">Tai-haku</Menu.Item>
        <Menu.Item key="Ukon Japanese Cherry">Ukon</Menu.Item>
        <Menu.Item key="Whitecomb">Whitcomb</Menu.Item>
      </Menu>
    );
    return (
      <div className="header_dropdown">
        <Dropdown overlay={Menus}>
          <Button>
            {this.state.menuTitle}<Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default MenuComponent;
