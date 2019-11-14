import * as React from "react";
import {Input} from "antd";
import weatherInstance from "../../api/httpclient";
import TextArea from "antd/lib/input/TextArea";

class Weather extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            city: "南京",
            weather: ""
        };
        this.getWeather = this.getWeather.bind(this);
    }

    getWeather() {
        let {city} = this.state;
        let resp = weatherInstance.get(null, {params: {city}})
            .then((resp) => {
                return resp;
            })
        this.setState({weather:resp})
    }

    render() {
        return (
            <div className={"weather"}>
                <Input className={"city-input"} placeholder={"请输入查询城市"} onChange={(e) => {
                    this.setState({"city": e.target.value});
                }} onPressEnter={this.getWeather} value={this.state.city}/>
                <TextArea value={this.state.weather}></TextArea>
            </div>
        );
    }
}

export default Weather;