// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class Button extends Component {
	// rendering a function when the button is clicked
	render() {
		let cFunction = this.props.clickFunction;
		if (typeof cFunction !== 'function'){
			cFunction = () => {};	
		}
		return (
			<div>
				<button className={ style.button }  onClick={cFunction}> </button>
			</div>
		);
	}
}
