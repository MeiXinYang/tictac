import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';
import React from "react";
import "./breadcrumb.css";

function Apps(props){
    return (
        <ul className="app-list">
            <li>
                <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
            </li>
            <li>
                <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
            </li>
        </ul>
    );
}


const Home = withRouter(props => {
    const { location,history,match } = props;
    console.log(location);
    console.log(history);
    console.log(match);

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item  key={url}>
                <Link key={_} className="breadcrumbItems" to={url}>{_}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item className="breadcrumbItems" key="home">
            <Link  to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <div className="cus-breadcrumb">
            <Breadcrumb className="cus-breadcrumb" separator={">"}>{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

export default Home;