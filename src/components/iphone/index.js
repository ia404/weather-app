// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone
import style from './style';
import style_button from '../button/style';
import style_leftarrow from '../leftArrow/style';
import style_rightarrow from '../rightArrow/style';

// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import LeftArrow from '../leftArrow';
import RightArrow from '../rightArrow';
import HourlyForecast from '../hourlyForecast';
import CurrentClimate from '../currentClimate';
import DailyForecast from '../dailyForecast';

// API KEY: c136ee287fd54b2489b78c2b03ce8899
export default class Iphone extends Component {
	
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		//current temperature state
		this.state.ctemp = null;
		//storing states of all times, temperatures and conditions
		this.state.times, this.state.temps, this.state.conditions = null;

		//storing the actual dates of the present day and the future week.
		this.dates = [];

		//storing all temperatures fetched by API
		this.temps = [];

		//description of weather
		this.state.temp, this.state.windSpeed, this.state.humidity, this.state.visibility, this.state.description = null;
		this.state.currentWarning = false;
		
		this.pages = ["home", "forecast", "warning"];
		//set the state of the page to the home page 
		this.state.page = this.pages[0];
	}

	//create pages for the iphone
	// fetch weather data from openweathermap.org
	fetchWeatherData = () => {
		// API call to openweathermap.org
		const url = "https://api.openweathermap.org/data/2.5/forecast?lat=54.46087&lon=-3.088625&cnt=66&units=metric&appid=76e5bd7bbfc1b3d0f82d533b3b231151";
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

	//function to parse the convert a given date to a day of the week
	changeDateToDay = (date) => {
		const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		//creates date object from the given date and converts it to a day of the week
		return days[new Date(date).getDay()];
	}

	//function which creates a dynamic background depending on the current temperature
	findBackground = () => {
		let temp = this.state.ctemp;
		if(temp >= 15 ){
			//sunny background
			return style.container;
		} else if ((temp < 15 && temp >= 0) || temp < 0) {
			//clear background
			return style.containerClear;
		}
	}

	//function return temperature
	getTemperature = (i) => {
		return this.state.temps[i];
	}

	//function to get the condition
	getCondition = (i) => {
		return this.state.conditions[i];
	}
	
	//function to get time
	getTime= (i) => {
		return this.state.times[i];
	}

	//add the temperature and warning to the array
	pushTempToArr 	= (temperature, description) => {
		let warnings = ["heavy intensity rain", "moderate rain", "heavy snow"]
		if (temperature <= 0 || warnings.includes(description)) {
			return  this.temps.push([temperature, true]);
		} else {
			return  this.temps.push([temperature, false]);
		} 
	}	
	componentDidMount() {
		this.fetchWeatherData();
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.ctemp ? `${style.temperature} ${style.filled}` : style.temperature;

		return (
			 // add the background depending on the temperature
			<div className={ this.findBackground() }>
 				<div className={ style.header }>
					{/* add image to the background depending on what page it is on. */}
					{ this.state.page === "home" && <img className={ style.mountain } src="../assets/backgrounds/mountain.png" alt="mountain" /> }
				   	{ this.state.page === "warning" && <img className={ style.hazard } src="../assets/icons/warning-forecast.png" alt="hazard" /> }
				   	{ this.state.page === "warning" && <img className={style.clouds } src="../assets/icons/clouds.png" alt="cloud" /> }
				   	{ this.state.page === "forecast" && <img className={style.cloudsForecast } src="../assets/icons/clouds2.png" alt="cloud" /> }
				</div>

				<div className={ style.details }>
				{/* check if the user is on the forecast page */  this.state.page === "forecast" && <div>
					<div className={ style.forecastContainer }>
						    {/* daily temperature for the forecast page */}
							<DailyForecast details={[this.temps[0][1], this.dates[0], this.temps[0][0]]}/>
							<DailyForecast details={[this.temps[1][1], this.dates[1], this.temps[1][0]]}/>
							<DailyForecast details={[this.temps[2][1], this.dates[2], this.temps[2][0]]}/>
							<DailyForecast details={[this.temps[3][1], this.dates[3], this.temps[3][0]]}/>
							<DailyForecast details={[this.temps[4][1], this.dates[4], this.temps[4][0]]}/>
							<DailyForecast details={[this.temps[4][1], this.dates[5], this.temps[5][0]]}/>

							<div>
								<p className={ style.forecastRed }> {this.dates[6]}: Not applicable at this current time. </p>
							</div>
						</div> 
					</div> }
				</div>

				{/*check if the user is on the homepage so it can output the wind speed, humidity and precipitation */  this.state.page === "home" && <div className={ style.home }>
					<span className={ tempStyles }> { Math.round(this.state.ctemp) } </span>

					<div className={style.detailsContainer}>
						{/* create climate objects for the home page */}
						<CurrentClimate details={["../assets/icons/humidity.png", this.state.humidity, '%']} />
						<CurrentClimate details={["../assets/icons/visibility.png", this.state.visibility, 'm']} />
						<CurrentClimate details={["../assets/icons/wind.png", this.state.windSpeed, 'm/h']} />
					</div>

					<div className={style.detailsContainer}>
						{/* create climate objects for the home page */}
						{ this.state.times && <HourlyForecast details={[this.getTime(0), this.getCondition(0), this.getTemperature(0)]}/>} 
						{ this.state.times && <HourlyForecast details={[this.getTime(1), this.getCondition(1), this.getTemperature(1)]}/>} 
						{ this.state.times && <HourlyForecast details={[this.getTime(2), this.getCondition(2), this.getTemperature(2)]}/>} 
						{ this.state.times && <HourlyForecast details={[this.getTime(3), this.getCondition(3), this.getTemperature(3)]}/>}
					</div>
				</div> }

				{/*If the user is on the warning page, they are able to see the exact warning */  this.state.page === "warning" && <div class={ style.warning }>
					<div> Ensure to dress up correctly for: </div>

					{/* Give a warning if there is heavy intesnity rain */  this.state.description === "heavy intensity rain" && <div className= { style.warningTitle }> HEAVY INTENSITY RAIN </div> }
					{ this.state.description === "heavy intensity rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{/* Give a warning if there is moderate rain */ this.state.description === "moderate rain" && <div className= { style.warningTitle }> MODERATE RAIN </div> }
					{ this.state.description === "moderate rain" && <div className= { style.warningDescription }> POTENTIAL FLOODING AND LOW VISIBILITY </div> }

					{/* Give a warning if there is hevay snow */ this.state.description === "heavy snow" && <div className= { style.warningTitle }> HEAVY SNOW </div> }
					{ this.state.description === "heavy snow" && <div className= { style.warningDescription }> POTENTIAL SLIPPING </div> }

					{/*check if the current temperature is less than 0 as this may be too cold to go out hiking (ensure there isnt any other warning) */  this.state.ctemp <= 0 && ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description[0]) === false && <div className= { style.warningTitle }> LOW TEMPERATURE </div> }
					{this.state.ctemp <= 0 &&  ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description[0]) === false && <div className= { style.warningDescription }> RISK OF FROSTBITE </div> }

				</div> }

				<div className={ style.footer }>
					<div className={ style_leftarrow.container }>
						{/* this creates a left arrow button which can be used to go back a page */ }
						<LeftArrow  clickFunction={ this.changePageBackward }/>
					</div>
					<div className={ style_button.container }>
						{/* redirects the user to a specific page by clicking the button */ }
						<Button  clickFunction={() => this.changePage(0)}/> 
						<Button  clickFunction={() => this.changePage(1)}/> 
						{/* if there is a warning, then there'll be a third button allowing the user to see the warning without having to use the arrow keys */ }
						{ this.state.currentWarning === true && <Button clickFunction={() => this.changePage(2)}/> }
					</div>
					<div className={ style_rightarrow.container }>
						{/* this creates a right arrow button which can be used to go forward a page */ }
						<RightArrow clickFunction={ this.changePageForward }/>
					</div>
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		//filter the temp so that it only shows the first temp when the date (dt_txt) of that temp includes 00:00:00
		const temp_c = parsed_json.list.map(temps => Math.round(temps['main']['temp']));
		//get time of day
		let time = parsed_json.list.map(time => time['dt_txt']);
		//split the time so that it only shows the time in the format HH
		//using ternary operator to check if the time is AM or PM
		// time % 12 would convert the time to 12-hour format since API gives it in 24-hour format

		time = time.map(time => time.split(" ")[1].split(":")[0] > 12 ? (time.split(" ")[1].split(":")[0] % 12) + "PM" : (time.split(" ")[1].split(":")[0] % 12) + "AM");
		
		//if the time is 00:00:00 convert it to 12AM as the previous filter would only show 0.
		for (let i = 0; i < time.length; i++) {
			if (time[i] === "0AM") {
				time[i] = "12AM";
			}
		}

		//get descriptions
		const description = parsed_json.list.map(description => description['weather'][0]['description']);
		
		this.setState({ times: time });
		this.setState({ temps: temp_c });
		this.setState({ conditions: description });

		//retrieve the filtered temperature and description for the week
		//description will be used to check if there is a warning

		this.setState({ctemp: temp_c[0]});
		const filteredTemp = parsed_json.list.filter(temp => temp['dt_txt'].includes("00:00:00")).map(temp => Math.round(temp['main']['temp']));
		const filteredDescription = parsed_json.list.filter(temp => temp['dt_txt'].includes("00:00:00")).map(temp => temp['weather'][0]['description']);
		//Get date-time info from JSON
		//filter so every 00:00:00 is displayed
		const dates = parsed_json.list.map(day => day['dt_txt'] );
		const filteredDates = dates.filter(date => date.includes("00:00:00"));
		
		//retrieve the filtered windspeed for the current day/time
		this.setState({windSpeed: parsed_json.list.map(wind => Math.round(wind['wind']['speed']))[0] });

		//retrieve the filtered visibility for the current day/time
		this.setState({visibility: parsed_json.list.map(visibility => visibility['visibility'])[0]});

		//retrieve the filtered humidity for the current day/time
		this.setState({humidity: parsed_json.list.map(humidity => humidity['main']['humidity'])[0]}); 
		
		this.setState({description: parsed_json.list.map(temp => temp['weather'][0]['description'])});

		//Setting states for temp
		//change state to true if the temp is below 0 or has a warning
		let warnings = ["heavy intensity rain", "moderate rain", "heavy snow"]
		this.pushTempToArr(temp_c[0], this.state.description[0]); //current temp: index 0
		this.pushTempToArr(filteredTemp[0], filteredDescription[0]);
		this.pushTempToArr(filteredTemp[1], filteredDescription[1]);
		this.pushTempToArr(filteredTemp[2], filteredDescription[2]);
		this.pushTempToArr(filteredTemp[3], filteredDescription[3]);
		this.pushTempToArr(filteredTemp[4], filteredDescription[4]);

		//get the date whos weather cannot be retrieved due to API restrictions
		let last = new Date(filteredDates[4]);
		let lastDate = last.setDate(last.getDate() + 1);
		let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		
		//set days
		//current day
		this.dates.push(days[new Date().getDay()]);
		//all days of the week inbetween current day and last day
		this.dates.push(this.changeDateToDay(filteredDates[0]));	
		this.dates.push(this.changeDateToDay(filteredDates[1]));
		this.dates.push(this.changeDateToDay(filteredDates[2]));
		this.dates.push(this.changeDateToDay(filteredDates[3]));
		this.dates.push(this.changeDateToDay(filteredDates[4]));
		//date in which weather cannot be received
		this.dates.push(this.changeDateToDay(lastDate));

		//check if weather condition is a dangerous warning -> throw hazard 
		if (["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description[0]) || this.state.ctemp <= 0){
			this.setState({ currentWarning: true }); 
		} else {
			this.setState({ currentWarning: false });
		}
	}
}