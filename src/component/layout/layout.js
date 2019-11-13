import {Layout, Menu, Icon} from 'antd';
import React from "react";
import "./layout.css";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import ToDo from "../todo/todo";
import ReactReduxToDo from "../reactreduxtodo/todo";
import Calculater from "../calculate/calculater";
import Game from "../tictac/game";
import Breadcrumb from "../breadcrumb/breadcrumb";
import {Redirect} from "react-router";

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
        console.log("### props.match is ####")
        console.log(this.props.match);
    }

    componentWillUnmount() {
        // this.state.dateInterval();
    }

    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                       style={{background: '#fff'}}>
                    <div className="logo"/>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to={"/app/todo"}>
                                <Icon type="pie-chart"/>
                                <span>代办</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`/app/calculate`}>
                                <Icon type="pie-chart"/>
                                <span>计算器</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={`/tictac`}>
                                <Icon type="pie-chart"/>
                                <span>跳棋</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={"/app/routereduxtodo"}>
                                <Icon type="pie-chart"/>
                                <span>react-redux-todo</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Breadcrumb/>
                    <Header style={{background: 'green', padding: 0, margin: '10 16px'}}>
                        Welcome {new Date().toLocaleTimeString()}
                    </Header>
                      <Content style={{margin: '10 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            <Switch>
                                <Route path={`/app/todo`} exact component={ToDo}/>
                                <Route path={`/app/calculate`} exact component={Calculater}/>
                                <Route path={"/app/tictac"} exact component={Game}/>
                                <Route path={"/app/routereduxtodo"} exact component={ReactReduxToDo}/>
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