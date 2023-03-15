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

		//Temp of 7days stored here
		this.state.ctemp = null;
		this.state.currenttemp = null;
		this.state.temp = null;
		this.state.temp2 = null;
		this.state.temp3 = null;
		this.state.temp4 = null;
		this.state.temp5 = null;
		
		//Storing states of 5 days
		this.state.current = null;
		this.state.today = null;
		this.state.second = null;
		this.state.third = null;
		this.state.fourth = null;
		this.state.fifth = null;
		this.state.sixth = null;

		//description of weather
		this.pages = ["home", "forecast", "warning"];
		this.state.temp = null;
		this.state.windSpeed = null;
		this.state.humidity = null;
		this.state.visibility = null;
		this.state.description = null;
		this.state.currentWarning = true; //change to false in reality
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

	componentDidMount() {
		this.fetchWeatherData();
		//setInterval(this.fetchWeatherData, 240000)
	}

	// the main render method for the iphone component
	render() {
		//fetch weatherdata
		//setInterval(this.fetchWeatherData, 120000);

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.ctemp ? `${style.temperature} ${style.filled}` : style.temperature;
		return (
			<div class={ style.container }>
				<div class={ style.header }>
				   {/* */  this.state.page === "home" && <img class={ style.mountain } src="../assets/backgrounds/mountain.png" alt="mountain" /> }
				   {/* */  this.state.page === "warning" && <img class={ style.hazard } src="../assets/icons/warning-forecast.png" alt="hazard" /> }
				   {/* */  this.state.page === "warning" && <img class={style.clouds } src="../assets/icons/clouds.png" alt="cloud" /> }
				   {/* */  this.state.page === "forecast" && <img class={style.cloudsForecast } src="../assets/icons/clouds2.png" alt="cloud" /> }

				</div>

				<div class={ style.details }>
					
					{/* check if the user is on the forecast page */  this.state.page === "forecast" && <div>
					<div class={ style.forecastContainer }>
							{ /* check if the temperature has a warning */}
							{ this.state.currenttemp[1] === true && <div> 
								<p  class={ style.forecast }> {this.state.current} {this.state.currenttemp[0]}° :  WARNING  </p>
							</div> }
							{ this.state.currenttemp[1] === false && <div> 
								<p class={ style.forecast }>  {this.state.current} {this.state.currenttemp[0]}° </p>
							</div> }					

							{ this.state.temp[1] === true && <div> 
								<p class={ style.forecast }> {this.state.today} {this.state.temp[0]}° :  WARNING </p>
							</div> }
							{ this.state.temp[1] === false && <div> 
								<p  class={ style.forecast }> {this.state.today} {this.state.temp[0]}° </p>
							</div> }

							{ this.state.temp2[1] === true && <div> 
								<p class={ style.forecast }> {this.state.second} {this.state.temp2[0]}° :  WARNING  </p>
							</div> }
							{ this.state.temp2[1] === false && <div> 
								<p class={ style.forecast }> {this.state.second} {this.state.temp2[0]}° </p>
							</div> }

							{ this.state.temp3[1] === true && <div> 
								<p class={ style.forecast }> {this.state.third} {this.state.temp3[0]}° :  WARNING </p>
							</div> }
							{ this.state.temp3[1] === false && <div> 
								<p class={ style.forecast }> {this.state.third} {this.state.temp3[0]}° </p>
							</div> }

							{ this.state.temp4[1] === true && <div> 
								<p class={ style.forecast }> {this.state.fourth} {this.state.temp4[0]}° : WARNING </p>
							</div> }
							{ this.state.temp4[1] === false && <div> 
								<p class={ style.forecast }> {this.state.fourth} {this.state.temp4[0]}° </p>
							</div> }

							{ this.state.temp5[1] === true && <div> 
								<p class={ style.forecast }> {this.state.fifth} {this.state.temp5[0]}° :  WARNING  </p>
							</div> }
							{ this.state.temp5[1] === false && <div> 
								<p class={ style.forecast }> {this.state.fifth} {this.state.temp5[0]}° </p>
							</div> }
							<div>
								<p class={ style.forecastRed }> {this.state.sixth} Not Applicable at this current time. </p>
							</div>
						</div> 
					</div> }
				</div>
				{/*check if the user is on the homepage so it can output the wind speed, humidity and precipitation */  this.state.page === "home" && <div class={ style.home }>
					<span class={ tempStyles }> { this.state.ctemp } </span>

					<div className={style.detailsContainer}>
						
						<div className={style.detailsType}>
							<img className={style.detailsIcon} src="../assets/icons/humidity.png" alt="humidity" />
							<p className={style.detailsText}> { this.state.humidity }% </p>
						</div>	

						<div className={style.detailsItem}>
							<img className={style.detailsIcon} src="../assets/icons/visibility.png" alt="visibility" />
							<p className={style.detailsText}> { this.state.visibility }m </p>
						</div>

						<div className={style.detailsType}>
							<img className={style.detailsIcon} src="../assets/icons/wind.png" alt="wind-speed" />
							<p className={style.detailsText}> { this.state.windSpeed }km/h </p>
						</div>

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

					{this.state.currenttemp > 0 && ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false  && <div className= { style.warningTitle }> NO WARNING AT THIS CURRENT TIME </div> }
				
					{/*check if the current temperature is less than 0 as this may be too cold to go out hiking */  this.state.currenttemp[0] <= 0 && ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false && <div className= { style.warningTitle }> LOW TEMPERATURE </div> }
					{this.state.currenttemp[0] <= 0 &&  ["heavy intensity rain", "moderate rain", "heavy snow"].includes(this.state.description) === false && <div className= { style.warningDescription }> RISK OF FROSTBITE </div> }

				</div> }

				{/* check if the user is on the forecast page   this.state.page === "settings" && <div class={ style.forecast }>
				<div> Settings  </div>
					<p > CHANGE FROM X TO Y: {this.state.currenttemp} </p>
				</div> */ }

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
		//let temp_c = parsed_json['main']['temp'];
		
		//filter the temp so that it only shows the first temp when the date (dt_txt) of that temp includes 00:00:00
		const temp_c = parsed_json.list.map(temps => temps['main']['temp']);
		this.setState({ctemp: temp_c[0]});
		const filteredTemp = parsed_json.list.filter(temp => temp.dt_txt.includes("00:00:00")).map(temp => temp.main.temp);
		const filteredDescription = parsed_json.list.filter(temp => temp.dt_txt.includes("00:00:00")).map(temp => temp.weather[0].description);
		//Get date-time info from JSON
		//filter so every 00:00:00 is displayed
		const dates = parsed_json.list.map(day => day.dt_txt );
		const filteredDates = dates.filter(date => date.includes("00:00:00"));
		
		//retrieve the filtered windspeed for the current day/time
		this.setState({windSpeed: parsed_json.list.map(wind => wind['wind']['speed'])[0] });

		//retrieve the filtered visibility for the current day/time
		this.setState({visibility: parsed_json.list.map(visibility => visibility['visibility'])[0]});

		//retrieve the filtered humidity for the current day/time
		this.setState({humidity: parsed_json.list.map(humidity => humidity['main']['humidity'])[0]}); 

		//Setting states for temp
		//change state to true if the temp is below 0 or has a warning
		let warnings = ["heavy intensity rain", "moderate rain", "heavy snow"]
		if (temp_c[0] <= 0 || warnings.includes(filteredDescription[0])) {
			this.setState({ currenttemp: [temp_c[0], true] });
		} else {
			this.setState({ currenttemp: [temp_c[0], false] });    
		} 

		if (filteredTemp[0] <= 0 || warnings.includes(filteredDescription[0])) {
			this.setState({ temp: [filteredTemp[0], true] });
		} else {
			this.setState({ temp: [filteredTemp[0], false] });    
		} 

		if (filteredTemp[1] <= 0 ||warnings.includes(filteredDescription[1])) {
			this.setState({ temp2: [filteredTemp[1], true] });
		} else {
			this.setState({ temp2: [filteredTemp[1], false] });    
		} 

		if (filteredTemp[2] <= 0 || warnings.includes(filteredDescription[2])) {
			this.setState({ temp3: [filteredTemp[2], true] });
		} else {
			this.setState({ temp3: [filteredTemp[2], false] });    
		} 

		if (filteredTemp[3] <= 0 || warnings.includes(filteredDescription[3])) {
			this.setState({ temp4: [filteredTemp[3], true] });
		} else {
			this.setState({ temp4: [filteredTemp[3], false] });    
		} 

		if (filteredTemp[4] <= 0 || warnings.includes(filteredDescription[4])) {
			this.setState({ temp5: [filteredTemp[4], true] });
		} else {
			this.setState({ temp5: [filteredTemp[4], false] });    
		} 

		//get the date whos weather cannot be retrieved due to API restrictions
		
		let last = new Date(filteredDates[4]);
		let lastDate = last.setDate(last.getDate() + 1);
		let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		//set states for days
		this.setState({
			current: days[new Date().getDay()],
			today: this.changeDateToDay(filteredDates[0]),
			second: this.changeDateToDay(filteredDates[1]),
			third: this.changeDateToDay(filteredDates[2]),
			fourth: this.changeDateToDay(filteredDates[3]),
			fifth: this.changeDateToDay(filteredDates[4]),
			sixth: this.changeDateToDay(lastDate)
		});

		// set states for fields so they could be rendered later on
		////this.setState({ description: currentCondition });      

		//check if weather condition is a dangerous warning -> throw hazard 
		// if (["heavy intensity rain", "moderate rain", "heavy snow"].includes(parsed_json['weather']['0']['description'])){
		// 	this.setState({ currentWarning: true }); 
		// }

		//temporary
		this.setState({ currentWarning: true });      
	}
}