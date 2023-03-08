// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone
import style from './style';
import style_button from '../button/style_button';
import style_leftarrow from '../button/left_arrow';
import style_rightarrow from '../button/right_arrow';

// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';



// API KEY: 55c7bf54637844c3556adeff289f1b44
export default class Iphone extends Component {
	
//var Iphone = React.createClass({

	// a constructor with initial set states

	constructor(props){
		super(props);
		// temperature state
		this.pages = ["home", "forecast", "warning"];
		this.state.temp = "";
		this.state.page = this.pages[0];
	}

	//create pages for the iphone
	// fetch weather data from openweathermap.org
	fetchWeatherData = () => {
		// API call to openweathermap.org
		const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=55c7bf54637844c3556adeff289f1b44";
		// retrieve the data from the API call and parse it to JSON
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse, 
			error : function(req, err){ console.log('API call failed ' + err); }
		});

	}

	//function to change the page forward
	changePageForward = () => {
		let i = this.pages.indexOf(this.state.page); //checks current index of the page array
		//as long as the index is not on the last page, it can be changed.
		if (i !== this.pages.length-1) {
			this.setState({ page: this.pages[i+1] }); 
		}
	}

	//function to change the page backward
	changePageBackward = () => {
		let i = this.pages.indexOf(this.state.page); //checks current index of the page array 
		//if the index is either 1 or 2 then it can be moved backwards.
		if (i !== 0 && i < this.pages.length) { 
			this.setState({ page: this.pages[i-1] });
		} 
	}

	// the main render method for the iphone component
	render() {
		//fetch weatherdata
		//this.fetchWeatherData();

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		return (
			<div class={ style.container }>
				
				<div class={ style.header }>
					<div class= { style.today }> Today </div>
				   { this.state.page === "home" && <img class={ style.header } src="../assets/backgrounds/mountain.png" alt="mountain" /> }

				</div>

				<div class={ style.details }></div>
				{ this.state.page === "home" && <div class={ style.home }>
					<div> Home </div>
					<span class={ tempStyles }> { this.state.temp } </span>
				</div> }
				
				{ this.state.page === "forecast" && <div class={ style.forecast }>
					<div> Forecast </div>
				</div> }

				{ this.state.page === "warning" && <div class={ style.warning }>
					<div> Warning </div>
				</div> }
				
				<div class={ style.footer }>
					<div className={ style_leftarrow.container }>
						<Button  className={ style_leftarrow.button } id="left" clickFunction={ this.changePageBackward }/>
					</div>
					<div className={ style_button.container }>
						<Button  className={ style_button.button }/> 
						<Button  className={ style_button.button }/> 
						<Button  className={ style_button.button }/> 
					</div>
					<div className={ style_rightarrow.container }>
						<Button  className={ style_rightarrow.button } id="right" clickFunction={ this.changePageForward }/>
					</div>
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		//LOCATION: var location = parsed_json['name'];
		let temp_c = parsed_json['main']['temp'];
		//CURRENT WEATHER CONDITION: var conditions = parsed_json['weather']['0']['description'];
		// set states for fields so they could be rendered later on
		this.setState({ temp: temp_c });      
	}
}
