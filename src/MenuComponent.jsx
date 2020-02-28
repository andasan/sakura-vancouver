import React from "react";
import { Popover, Menu, Button, Dropdown, Icon, message } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/antd.css";

const content = tree => {
  return (
    <div>
      <img src={`/images/${tree}.jpg`} alt={`${tree}`} width="200px" />
    </div>
  );
};

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTitle: "Cherry Cultivars",
      type: undefined
    };
  }

  render() {
    const getTree = (treeName, title) => {
      let apiURL;
      treeName === "All"
        ? (apiURL = `https://opendata.vancouver.ca/api/v2/catalog/datasets/street-trees/exports/json?rows=-1&pretty=false&timezone=UTC`)
        : (apiURL = `https://opendata.vancouver.ca/api/v2/catalog/datasets/street-trees/exports/json?search=${treeName}&rows=-1&pretty=false&timezone=UTC`);

      axios.get(apiURL).then(res => {
        const treeArray = res.data;

        if (treeName === "All") {
          const newTree = treeArray.filter(tree =>
            tree.common_name.includes("cherry")
          );
          console.log("New Tree: ", newTree);
        }

        this.setState({ menuTitle: title });
        this.props.onTreeChange(treeArray);
        this.props.preloaderStatus(false);
      });
    };

    const onClick = ({ key, item }) => {
      message.info(`Clicked on : ${item.props.children.props.children.props.children}`);
      this.props.preloaderStatus(true);
      getTree(key, item.props.children);
    };

    const Menus = (
      <Menu onClick={onClick}>
        {/* <Menu.Item key="All">All</Menu.Item> */}
        <Menu.Item key="Accolade cherry">
          <Popover placement="right" content={content("accolade")}>
            <Button type="link" block>
              Accolade Cherry
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Akebono flowering cherry">
          <Popover placement="right" content={content("akebono")}>
            <Button type="link" block>
              Akebono Flowering Cherry
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Amanogawa">
          <Popover placement="right" content={content("amanogawa")}>
            <Button type="link" block>
              Ama-no-gawa
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Mikuruma">
          <Popover placement="right" content={content("mikuruma")}>
            <Button type="link" block>
              Mikuruma-gaeshi
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Pink perfection">
          <Popover placement="right" content={content("pinkperfection")}>
            <Button type="link" block>
              Pink Perfection
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Rancho">
          <Popover placement="right" content={content("rancho")}>
            <Button type="link" block>
              Rancho Sargent Cherry
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Shirofugen">
          <Popover placement="right" content={content("shirofugen")}>
            <Button type="link" block>
              Shiro-fugen
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Shirotae(Mt Fuji) Cherry">
          <Popover placement="right" content={content("shirotae")}>
            <Button type="link" block>
              Shirotae (Mt. Fuji) Cherry
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Shogetsu">
          <Popover placement="right" content={content("shogetsu")}>
            <Button type="link" block>
              Shogetsu
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Snow goose">
          <Popover placement="right" content={content("snowgoose")}>
            <Button type="link" block>
              Snow Goose
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Yoshino">
          <Popover placement="right" content={content("yoshino")}>
            <Button type="link" block>
              Somei Yoshino
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="chokecherry">
          <Popover placement="right" content={content("spire")}>
            <Button type="link" block>
              Spire
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Japanese Flowering Cherry">
          <Popover placement="right" content={content("taihaku")}>
            <Button type="link" block>
              Tai-haku
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Ukon Japanese Cherry">
          <Popover placement="right" content={content("ukon")}>
            <Button type="link" block>
              Ukon
            </Button>
          </Popover>
        </Menu.Item>
        <Menu.Item key="Whitcomb">
          <Popover placement="right" content={content("whitcomb")}>
            <Button type="link" block>
              Whitcomb
            </Button>
          </Popover>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header_dropdown">
        <Dropdown overlay={Menus}>
          <Button>
            {this.state.menuTitle}
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default MenuComponent;
