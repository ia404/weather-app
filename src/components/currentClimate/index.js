// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class hourlyForecast extends Component {

	render() {
		return (
			<div>
				<img className={style.detailsIcon} src={this.props.details[0]} />
				<p className={style.detailsText}> { this.props.details[1] }{this.props.details[2]}</p>
			</div>			
		);
	}
}
