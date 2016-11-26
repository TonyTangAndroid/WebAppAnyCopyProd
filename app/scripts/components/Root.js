import ParseReact from 'parse-react';
import React from 'react';
import App from './App'
import Login from './Login'

const ParseComponent = ParseReact.Component(React);

export default class Root extends ParseComponent {
	observe(props, state) {
		return {
			user: ParseReact.currentUser
		};
	}

	render() {
		if (this.data.user === undefined) {
			return (
				<Login />
			);
		} else {
			return ( <App /> );
		}
	}    
}

ParseComponent.defaultProps = { error: 0, signup:false };