import React from "react";
import { Menu, Button } from "antd";
import axios from "axios";
import "./App.css";

const { SubMenu } = Menu;

class MenuMobileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rootSubmenuKeys = [
      "sub1",
      "sub2",
      "sub3",
      "sub4",
      "sub5",
      "sub6",
      "sub7",
      "sub8",
      "sub9",
      "sub10"
    ];
    this.state = {
      type: undefined,
      collapsed: true,
      openKeys: [""],
      openMenu: false
    };
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      openMenu: !this.state.openMenu
    });
  };

  someFunc =() => {
      return 'promise';
  }

  render() {
    const getTree = treeName => {
      let apiURL = `https://opendata.vancouver.ca/api/v2/catalog/datasets/street-trees/exports/json?search=${treeName}&rows=-1&pretty=false&timezone=UTC`;

      axios.get(apiURL).then(res => {
        const treeArray = res.data;
        this.props.onTreeChange(treeArray);
        this.props.preloaderStatus(false);
      });
    };

    const onClick = key => {
      this.toggleCollapsed();
      this.props.preloaderStatus(true);
      getTree(key);
    };

    return (
      <div className="navmobile">
        {/* <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {this.state.collapsed ? "open" : "close"}
        </Button> */}
        <div onClick={this.toggleCollapsed} id="nav-icon1" className={(this.state.openMenu ? "open" : "")}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Menu
            className={(this.state.openMenu ? "" : "hide")}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          <SubMenu key="sub1" title={<span>Accolade cherry</span>}>
            <img src={`/images/accolade.jpg`} alt="accolade" width="200px" />
            <button onClick={() => onClick("accolade")}> Show </button>
          </SubMenu>
          <SubMenu key="sub2" title={<span>Akebono Flowering Cherry</span>}>
            <img src={`/images/akebono.jpg`} alt="akebono" width="200px" />
            <button onClick={() => onClick("akebono")}> Show </button>
          </SubMenu>
          <SubMenu key="sub3" title={<span>Pink Perfection</span>}>
            <img
              src={`/images/pinkperfection.jpg`}
              alt="pinkperfection"
              width="200px"
            />
            <button onClick={() => onClick("pinkperfection")}> Show </button>
          </SubMenu>
          <SubMenu key="sub4" title={<span>Rancho Sargent Cherry</span>}>
            <img src={`/images/rancho.jpg`} alt="rancho" width="200px" />
            <button onClick={() => onClick("rancho")}> Show </button>
          </SubMenu>
          <SubMenu key="sub5" title={<span>Shiro-fugen</span>}>
            <img
              src={`/images/shirofugen.jpg`}
              alt="shirofugen"
              width="200px"
            />
            <button onClick={() => onClick("shirofugen")}> Show </button>
          </SubMenu>
          <SubMenu key="sub6" title={<span>Shirotae (Mt. Fuji) Cherry</span>}>
            <img src={`/images/shirotae.jpg`} alt="shirotae" width="200px" />
            <button onClick={() => onClick("shirotae")}> Show </button>
          </SubMenu>
          <SubMenu key="sub7" title={<span>Somei Yoshino</span>}>
            <img src={`/images/yoshino.jpg`} alt="yoshino" width="200px" />
            <button onClick={() => onClick("yoshino")}> Show </button>
          </SubMenu>
          <SubMenu key="sub8" title={<span>Spire</span>}>
            <img src={`/images/spire.jpg`} alt="spire" width="200px" />
            <button onClick={() => onClick("chokecherry")}> Show </button>
          </SubMenu>
          <SubMenu key="sub9" title={<span>Tai-haku</span>}>
            <img src={`/images/taihaku.jpg`} alt="taihaku" width="200px" />
            <button onClick={() => onClick("taihaku")}> Show </button>
          </SubMenu>
          <SubMenu key="sub10" title={<span>Ukon</span>}>
            <img src={`/images/ukon.jpg`} alt="ukon" width="200px" />
            <button onClick={() => onClick("ukon")}> Show </button>
          </SubMenu>
        </Menu>
        {/* <Menu onClick={onClick}>
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
        </Menu> */}
      </div>
    );
  }
}

export default MenuMobileComponent;
