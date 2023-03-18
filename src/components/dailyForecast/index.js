// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class DailyForecast extends Component {
	render() {
		if(this.props.warning === true) {
			return (
				<div> 
					<p className={ style.forecast }> {this.props.day} {this.props.temperature}°
						<img className={ style.warningF } src="../assets/icons/warning-forecast.png" alt="warning" />
					</p>
				</div>
			)
		} else if(this.props.warning=== false)  {
			return (
				<div> 
					<p className={ style.forecast }>  {this.props.day} {this.props.temperature}° </p>
				</div>
			)
		}
	}
}
