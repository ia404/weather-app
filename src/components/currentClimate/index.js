// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class CurrentClimate extends Component {
	render() {
		return (
			<div>
				<img className={style.detailsIcon} src={this.props.src} />
				<p className={style.detailsText}> { this.props.value }{this.props.metric}</p>
			</div>			
		);
	}
}