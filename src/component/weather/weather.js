import * as React from "react";
import {Avatar, Card, Input, Skeleton} from "antd";
import weatherInstance from "../../api/httpclient";
import TextArea from "antd/lib/input/TextArea";
import "./weather.css";
import Meta from "antd/es/card/Meta";

class Weather extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            city: "南京",
            weather: "",
            searchLoading: true
        };
        this.getWeather = this.getWeather.bind(this);
        this.renderCard = this.renderCard.bind(this);
    }

    getWeather() {
        this.setState({searchLoading: true});
        let {city} = this.state;
        let resp = weatherInstance.get(null, {params: {city}})
            .then((resp) => {
                this.setState({weather: resp.data.results, searchLoading: false});
            });
    }

    componentDidMount() {
        this.getWeather();
    }

    renderCard(){
        let weatherDatas;
        try {
            weatherDatas = this.state.weather[0].weather_data;
            console.log(weatherDatas);
        } catch (e) {
            console.error(e)
            return ;
        }
        let weatherCards = Array.of(weatherDatas).map((weatherData,index)=>{
            return (<Card loading={this.state.searchLoading}> key={index}
                <Meta
                    avatar={
                        <Avatar src={weatherData.dayPictureUrl}/>
                    }
                    title={weatherData.date}
                    description={`${weatherData.weather} ${weatherData.wind} ${weatherData.temperature}`}
                />
            </Card>);
        });
        return weatherCards;
    }

    render() {

        return (
            <div className={"weather"}>
                <Input.Search className={"city-input"} placeholder={"请输入查询城市"} onChange={(e) => {
                    this.setState({"city": e.target.value});
                }} onPressEnter={this.getWeather} value={this.state.city} onSearch={this.getWeather}
                              loading={this.state.searchLoading} enterButton/>
                <Skeleton loading={this.state.searchLoading} active>
                    {this.renderCard()}
                </Skeleton>
                <div></div>
            </div>
        );
    }
}

export default Weather;