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


    componentDidMount() {
        // let interval = setInterval(() => {
        //     this.setState({
        //         "date": new Date().toLocaleTimeString()
        //     })
        // }, 1000);
        // this.setState({
        //     "dateInterval": interval
        // })
    }

    componentWillUnmount() {
        // this.state.dateInterval();
    }

    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        let {path: matchPath} = this.props.match;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to={`${matchPath}/todo`}>
                                <Icon type="pie-chart"/>
                                <span>代办</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`${matchPath}/calculate`}>
                                <Icon type="pie-chart"/>
                                <span>计算器</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={`${matchPath}/tictac`}>
                                <Icon type="pie-chart"/>
                                <span>跳棋</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={`${matchPath}/routereduxtodo`}>
                                <Icon type="pie-chart"/>
                                <span>react-redux-todo</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={`${matchPath}/weather`}>
                                <Icon type="pie-chart"/>
                                <span>天气</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={"header"}>
                        Welcome {new Date().toLocaleTimeString()}
                        <div className={"user-info"}><Avatar className={"user-icon"} >TOM</Avatar></div>
                    </Header>
                    <Content>
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