import {Layout, Menu, Icon, Avatar} from 'antd';
import React from "react";
import "./layout.css";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import ToDo from "../todo/todo";
import ReactReduxToDo from "../reactreduxtodo/todo";
import Calculater from "../calculate/calculater";
import Game from "../tictac/game";
import Breadcrumb from "../breadcrumb/breadcrumb";
import {Redirect} from "react-router";
import Weather from "../weather/weather";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class LayOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            date: new Date().toLocaleTimeString(),
            dateInterval: null
        };
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        let {path: matchPath} = this.props.match;
        let {pathname: currentPath} = this.props.location;
        console.log("current path %s",currentPath);
        return (
            <Layout style={{minHeight: '100vh',backgroundColor:"gray"}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" defaultSelectedKeys={[`${currentPath}`]} mode="inline">
                        <Menu.Item key={`${matchPath}/todo`}>
                            <Link to={`${matchPath}/todo`}>
                                <Icon type="pie-chart"/>
                                <span>代办</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={`${matchPath}/calculate`}>
                            <Link to={`${matchPath}/calculate`}>
                                <Icon type="pie-chart"/>
                                <span>计算器</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={`${matchPath}/tictac`}>
                            <Link to={`${matchPath}/tictac`}>
                                <Icon type="pie-chart"/>
                                <span>跳棋</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={`${matchPath}/routereduxtodo`}>
                            <Link to={`${matchPath}/routereduxtodo`}>
                                <Icon type="pie-chart"/>
                                <span>react-redux-todo</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={`${matchPath}/weather`}>
                            <Link to={`${matchPath}/weather`}>
                                <Icon type="pie-chart"/>
                                <span>天气</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={"header"} >
                        Welcome {new Date().toLocaleTimeString()}
                        <div className={"user-info"}><Avatar className={"user-icon"} >TOM</Avatar></div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Breadcrumb/>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            <Switch>
                                <Route path={`${matchPath}/todo`} exact component={ToDo}/>
                                <Route path={`${matchPath}/calculate`} exact component={Calculater}/>
                                <Route path={`${matchPath}/tictac`} exact component={Game}/>
                                <Route path={`${matchPath}/routereduxtodo`} exact component={ReactReduxToDo}/>
                                <Route path={`${matchPath}/weather`} exact component={Weather}/>
                                <Route path="*" render={(props) => {
                                    return <div>Page not Found</div>
                                }}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayOut;