import * as React from "react";
import {Avatar, Card, Input, List, Skeleton} from "antd";
import weatherInstance from "../../api/httpclient";
import TextArea from "antd/lib/input/TextArea";
import "./weather.css";
import Meta from "antd/es/card/Meta";
import BMap from 'BMap';

class Weather extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            city: "",
            weather: "",
            currentCity: "",
            searchLoading: true
        };
        this.getWeather = this.getWeather.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.getCity = this.getCity.bind(this);
    }

    getWeather() {
        this.setState({searchLoading: true});
        let {city} = this.state;
        let resp = weatherInstance.get(null, {params: {city}})
            .then((resp) => {
                let result = resp.data.results[0];
                this.setState({
                    weather: result.weather_data,
                    currentCity: result.currentCity,
                    pm:result.pm25,
                    searchLoading: false
                });
            });
    }

    componentDidMount() {
        let localCity = new BMap.LocalCity();
        localCity.get(this.getCity);
        this.getWeather();
    }

    getCity(result){
        let cityName = result.name;
        this.setState({"city":cityName});
    }

    renderCard(weatherData, index) {
        if (0 === index) {
            return (<List.Item key={index}>
                <Card className={"weather-card-today weather-card"} hoverable>
                    <Meta
                        avatar={
                            <Avatar src={weatherData.dayPictureUrl}/>
                        }
                        title={`${this.state.currentCity} ${weatherData.date}`}
                        description={`${weatherData.weather} ${weatherData.wind} ${weatherData.temperature} pm2.5 :${this.state.pm}`}
                    />
                </Card>
            </List.Item>);
        }
        return (<List.Item key={index}>
            <Card className={"weather-card"} hoverable>
                <Meta
                    avatar={
                        <Avatar src={weatherData.dayPictureUrl}/>
                    }
                    title={weatherData.date}
                    description={`${weatherData.weather} ${weatherData.wind} ${weatherData.temperature}`}
                />
            </Card>
        </List.Item>);
    }

    render() {

        return (
            <div className={"weather"}>
                <Input.Search className={"city-input"} placeholder={"请输入查询城市"} onChange={(e) => {
                    this.setState({"city": e.target.value});
                }} onPressEnter={this.getWeather} value={this.state.city} onSearch={this.getWeather}
                              loading={this.state.searchLoading} enterButton/>
                <Skeleton loading={this.state.searchLoading} active>
                    <List dataSource={this.state.weather} split={false}
                          renderItem={(data, index) => {
                              return this.renderCard(data, index)
                          }}/>
                </Skeleton>
            </div>
        );
    }
}

export default Weather;