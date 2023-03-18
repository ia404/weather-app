// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class hourlyForecast extends Component {

	render() {
		if(this.props.details[0] === true) {
			return (
				<div> 
					<p  className={ style.forecast }> {this.props.details[1]} {this.props.details[2]}°
						<img className={ style.warningF } src="../assets/icons/warning-forecast.png" alt="warning" />
					</p>
				</div>
			)
		} else if(this.props.details[0] === false)  {
			return (
				<div> 
					<p className={ style.forecast }>  {this.props.details[1]} {this.props.details[2]}° </p>
				</div>
			)
		}
	}
}
