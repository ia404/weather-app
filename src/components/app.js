// import preact
import { h, Component } from 'preact';

// import required Components from 'components/'
import Iphone from './iphone';

export default class App extends Component {
//var App = React.createClass({
	render(){
		return ( <div id="app"> <Iphone/ > </div> );
	}
}