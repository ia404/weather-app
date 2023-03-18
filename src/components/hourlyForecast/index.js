// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class hourlyForecast extends Component {

	//function to find corresponding icon for the weather description
	findWeatherIcon = () => {
		let description = this.props.details[1];
		let temp = this.props.details[2];
		//check if the descripton has any icon relevant to it
		if (description.includes("heavy intensity rain")) {
			return "../assets/icons//weather-thunder.png";
		}else if (description.includes("rain")) {
			return "../assets/icons/weather-rain.png";
		} else if (description.includes("clouds")) {
			return "../assets/icons/weather-cloud.png";
		} else if (description.includes("clear")) {
			return "../assets/icons/weather-sun.png";
		} else if (description.includes("snow")) {
			return "../assets/icons/weather-snow.png";
		} 

		//if there is no relevant icon, then use the temperature to choose an icon
		if(temp >= 15 ){
			return "../assets/icons/weather-sun.png";
		} else if ((temp < 15 && temp >= 0) || temp < 0) {
			return "../assets/icons/weather-cloud.png";
		}
	}

	render() {
		return (
			<div>
				<p  className={style.detailsText}> { this.props.details[0] } </p>
				<img className={style.weatherIcon} src={ this.findWeatherIcon() } /> 
				<p className={style.detailsText}> { this.props.details[2] }° </p>
			</div>			
		);
	}
}
