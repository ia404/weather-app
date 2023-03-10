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



// API KEY: c136ee287fd54b2489b78c2b03ce8899
export default class Iphone extends Component {
	
//var Iphone = React.createClass({

	// a constructor with initial set states

	constructor(props){
		super(props);
		// temperature state
		this.pages = ["home", "forecast", "warning"];
		this.state.temp = "";
		this.state.description = "";
		this.state.currentWarning = true; //change to false in reality
		this.state.page = this.pages[0];
	}

	//create pages for the iphone
	// fetch weather data from openweathermap.org
	fetchWeatherData = () => {
		// API call to openweathermap.org
		const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=c136ee287fd54b2489b78c2b03ce8899";
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
			
			if((this.state.currentWarning === true && (i === 0 || i == 1)) || (this.state.currentWarning === false && i === 0)){ //if there is no warning, there would be no warning page
				this.setState({ page: this.pages[i+1] }); 
			} else {
				this.setState({ page: this.pages[i] }); 
			}
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

	//function to change the page to a specific page
	changePage = (pageNumber) => {
		return this.setState({ page: this.pages[pageNumber] });
	}

	// the main render method for the iphone component
	render() {
		//fetch weatherdata
		//setInterval(this.fetchWeatherData, 120000);

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		return (
			<div class={ style.container }>
				<div class={ style.header }>
				   {  this.state.page === "home" && <div class= { style.today }> Today </div>}
				   { this.state.page === "home" && <img class={ style.header } src="../assets/backgrounds/mountain.png" alt="mountain" /> }
				   { this.state.page === "warning" && <img class={ style.hazard } src="../assets/icons/warning-forecast.png" alt="hazard" /> }
				   { this.state.page === "warning" && <img class={style.clouds } src="../assets/icons/clouds.png" alt="cloud" /> }

				</div>

				<div class={ style.details }></div>
				{ this.state.page === "home" && <div class={ style.home }>
					<div> Home </div>
					<span class={ tempStyles }> { this.state.temp } </span>
				</div> }
				
				{ this.state.page === "forecast" && <div class={ style.forecast }>
					<div> Forecast X </div>
					<p class ="smallTemp"> Today: {this.state.temp} </p>
					
				</div> }

				{ this.state.page === "warning" && <div class={ style.warning }>
					<div> Ensure to dress up correctly for: </div>
					{ this.state.description === "heavy intensity rain" && <div className= { style.warningTitle }> HEAVY INTENSITY RAIN </div> }
					{ this.state.description === "heavy intensity rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{ this.state.description === "moderate rain" && <div className= { style.warningTitle }> MODERATE RAIN </div> }
					{ this.state.description === "moderate rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{ this.state.description === "heavy snow" && <div className= { style.warningTitle }> HEAVY SNOW </div> }
					{ this.state.description === "heavy snow" && <div className= { style.warningDescription }> POTENTIAL LOW VISIBILITY </div> }
				</div> }
				
				<div class={ style.footer }>
					<div className={ style_leftarrow.container }>
						<Button  className={ style_leftarrow.button } clickFunction={ this.changePageBackward }/>
					</div>
					<div className={ style_button.container }>
						<Button  className={ style_button.button } clickFunction={() => this.changePage(0)}/> 
						<Button  className={ style_button.button } clickFunction={() => this.changePage(1)}/> 
						{ this.state.currentWarning === true && <Button  className={ style_button.button } clickFunction={() => this.changePage(2)}/> }
					</div>
					<div className={ style_rightarrow.container }>
						<Button  className={ style_rightarrow.button } clickFunction={ this.changePageForward }/>
					</div>

				</div>
			</div>
		);
	}

	componentDidMount() {
		this.fetchWeatherData();
		setInterval(this.fetchWeatherData, 240000)
	}

	parseResponse = (parsed_json) => {
		//LOCATION: var location = parsed_json['name'];
		let temp_c = parsed_json['main']['temp'];
		let avgWeather = parsed_json['weather'][0]['main']; //E.g. "Cloudy"
		let currentCondition = parsed_json['weather']['0']['description']; //More detailed version of above
		let windSpeed = parsed_json['wind']['speed'];
		let humidity = parsed_json['main']['humidity']

		//console.log(temp_c) //Don't think it needs to be logged
		
		// set states for fields so they could be rendered later on
		this.setState({ description: currentCondition });      

		this.setState({
			temp: temp_c
			
		});     //Rest add later


		//check if weather condition is a dangerous warning -> throw hazard 
		// if (parsed_json['weather']['0']['description'] in []){
		// 	this.setState({ currentWarning: true }); 
		// }

		//temporary
		this.setState({ currentWarning: true });      

	}
}