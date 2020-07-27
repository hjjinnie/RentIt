import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
// import './styles.css';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Link,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    // this.delete = this.delete.bind(this);
  }

  //credentials: "same-origin" - enables cookies
  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      // mode:"cors",
      credentials: 'include',
      // body: JSON.stringify({firstname, lastname, email, password, building}),
    };
    fetch('http://localhost:3000/homepage', requestOptions)
      //need to return in .then or console.log
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log('DATA', data);
        this.setState({ products: data });
      })
      .catch((err) => {
        console.log('failed to login');
      });
    // return (
    //     <div>
    //         <img src={this.state.products.image} style={{height:'100px'}}/><br />
    //         <b>Name:</b>{this.state.products}< br/>
    //         <b>Price:</b>${this.state.products.price}<br />
    //         <hr/>
    //     </div>
    // )
  }

  render() {
    return this.state.products.length === 0 ? (
      <div></div>
    ) : (
      <Layout>
        <Header className="header">
          <div className="logo">RentIt</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Manage Building</Menu.Item>
            <Menu.Item key="2">Manage Products</Menu.Item>
            <Menu.Item key="3" style={{ float: 'right' }}>
              Logout
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              Building {this.state.products[0].building_address}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Kitchen">
                  <Menu.Item key="1">KitchenAid</Menu.Item>
                  <Menu.Item key="2">Le Creuset</Menu.Item>
                  <Menu.Item key="3">Silverware</Menu.Item>
                  <Menu.Item key="4">Champagne Glasses</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Technology"
                >
                  <Menu.Item key="5">Go Pro</Menu.Item>
                  <Menu.Item key="6">Speakers</Menu.Item>
                  <Menu.Item key="7">Drone</Menu.Item>
                  <Menu.Item key="8">iPad</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Adventure"
                >
                  <Menu.Item key="9">Tent</Menu.Item>
                  <Menu.Item key="10">Rock Climbing Gear</Menu.Item>
                  <Menu.Item key="11">Ski's</Menu.Item>
                  <Menu.Item key="12">Snowboard</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content
              className="cardGrid"
              style={{ padding: '0 24px', minHeight: 150 }}
            >
              {this.state.products.map((x) => (
                <Card
                  className="productCard"
                  hoverable
                  style={{ width: 252, backgroundColor: 'white' }}
                  cover={<img alt="example" src={x.image_url} />}
                >
                  <br />
                  <Meta
                    title={`${x.product}`}
                    description={`$${x.price_per_day}/day`}
                  />
                </Card>
              ))}
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

//add form field to add products to the building page

export default Homepage;
