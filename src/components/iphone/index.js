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
		this.state.temp = 2;
		this.state.windSpeed = 20;
		this.state.humidity = 1;
		this.state.precipitation = 10;
		this.state.description = "";
		this.state.currentWarning = true; //change to false in reality
		this.state.page = this.pages[0];
	}

	//create pages for the iphone
	// fetch weather data from openweathermap.org
	fetchWeatherData = () => {
		// API call to openweathermap.org
		const url = "https://api.openweathermap.org/data/2.5/forecast?lat=54.46087&lon=-3.088625&cnt=7&appid=76e5bd7bbfc1b3d0f82d533b3b231151";
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
			//the two conditions to check if the user can move forward:
			//if there is a warning, the user will be able to change the page forward (if on first or second page
			//if there is no warning, the user will be able to change the page forward only to the second page
			if((this.state.currentWarning === true && (i === 0 || i == 1)) || (this.state.currentWarning === false && i === 0)){ //if there is no warning, there would be no warning page
				this.setState({ page: this.pages[i+1] }); 
			} else {
				this.setState({ page: this.pages[i] }); //if there is no warning, the user will be not able to change the page forward
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


	componentDidMount() {
		//this.fetchWeatherData();
		//setInterval(this.fetchWeatherData, 240000)
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
				   {/* */  this.state.page === "home" && <div class= { style.today }> Today </div>}
				   {/* */  this.state.page === "home" && <img class={ style.header } src="../assets/backgrounds/mountain.png" alt="mountain" /> }
				   {/* */  this.state.page === "warning" && <img class={ style.hazard } src="../assets/icons/warning-forecast.png" alt="hazard" /> }
				   {/* */  this.state.page === "warning" && <img class={style.clouds } src="../assets/icons/clouds.png" alt="cloud" /> }

				</div>

				<div class={ style.details }></div>
				{/*check if the user is on the homepage so it can output the wind speed, humidity and precipitation */  this.state.page === "home" && <div class={ style.home }>
					<span class={ tempStyles }> { this.state.temp } </span>

					<div className={style.detailsContainer}>
						
						<div className={style.detailsType}>
							<img className={style.detailsIcon} src="../assets/icons/humidity.png" alt="humidity" />
							<p className={style.detailsText}> { this.state.humidity }% </p>
						</div>	

						<div className={style.detailsItem}>
							<img className={style.detailsIcon} src="../assets/icons/precipitation.png" alt="precipitation" />
							<p className={style.detailsText}> { this.state.precipitation } </p>
						</div>

						<div className={style.detailsType}>
							<img className={style.detailsIcon} src="../assets/icons/wind.png" alt="wind-speed" />
							<p className={style.detailsText}> { this.state.windSpeed }km/h </p>
						</div>

					</div>


				</div> }
				
				{/* check if the user is on the forecast page */  this.state.page === "forecast" && <div class={ style.forecast }>
					<div> Forecast X </div>
					<p class ="smallTemp"> Today: {this.state.temp} </p>
					
				</div> }

				{/*If the user is on the warning page, they are able to see the exact warning */  this.state.page === "warning" && <div class={ style.warning }>
					<div> Ensure to dress up correctly for: </div>

					{/* Give a warning if there is heavy intesnity rain */  this.state.description === "heavy intensity rain" && <div className= { style.warningTitle }> HEAVY INTENSITY RAIN </div> }
					{ this.state.description === "heavy intensity rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{/* Give a warning if there is moderate rain */ this.state.description === "moderate rain" && <div className= { style.warningTitle }> MODERATE RAIN </div> }
					{ this.state.description === "moderate rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{/* Give a warning if there is hevay snow */ this.state.description === "heavy snow" && <div className= { style.warningTitle }> HEAVY SNOW </div> }
					{ this.state.description === "heavy snow" && <div className= { style.warningDescription }> POTENTIAL SLIPPING </div> }

					{this.state.temp > 0 && ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false  && <div className= { style.warningTitle }> NO WARNING AT THIS CURRENT TIME </div> }
				
					{/*check if the current temperature is less than 0 as this may be too cold to go out hiking */  this.state.temp <= 0 && ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false && <div className= { style.warningTitle }> LOW TEMPERATURE </div> }
					{this.state.temp <= 0 &&  ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false && <div className= { style.warningDescription }> RISK OF FROSTBITE </div> }

				</div> }
				

				<div class={ style.footer }>
					<div className={ style_leftarrow.container }>
						{/* this creates a left arrow button which can be used to go back a page */ }
						<Button  className={ style_leftarrow.button } clickFunction={ this.changePageBackward }/>
					</div>
					<div className={ style_button.container }>
						{/* redirects the user to a specific page by clicking the button */ }
						<Button  className={ style_button.button } clickFunction={() => this.changePage(0)}/> 
						<Button  className={ style_button.button } clickFunction={() => this.changePage(1)}/> 
						
						{/* if there is a warning, then there'll be a third button allowing the user to see the warning without having to use the arrow keys */ }
						{ this.state.currentWarning === true && <Button  className={ style_button.button } clickFunction={() => this.changePage(2)}/> }
					</div>
					<div className={ style_rightarrow.container }>
						{/* this creates a right arrow button which can be used to go forward a page */ }
						<Button  className={ style_rightarrow.button } clickFunction={ this.changePageForward }/>
					</div>

				</div>
			</div>
		);
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
		// if (["heavy intensity rain", "moderate rain", "heavy snow"].includes(parsed_json['weather']['0']['description'])){
		// 	this.setState({ currentWarning: true }); 
		// } else {
		// 	this.setState({ currentWarning: false });
		// }

		//temporary
		this.setState({ currentWarning: true });      

	}
}