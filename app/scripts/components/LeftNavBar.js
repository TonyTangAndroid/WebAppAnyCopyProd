import React from 'react';
import navTo from '../actions/nav' 
import { connect } from 'react-redux'
import store from '../store/configureStore'
import Parse from 'parse';
import { enterAddCopyMode } from '../actions/copy'

class LeftNavBar extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {navState: props.currentTab};
	}
	
	selectTab(tab) {
	    this.setState({ navState: tab });
	    store.dispatch(navTo(tab));
	}

	logout() {
		Parse.User.logOut();
		location.reload();
	}

	createNewCopy() {
		store.dispatch(enterAddCopyMode())
	}

	render() {
		const username = Parse.User.current().getUsername();
		return (
			<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 left-bar">
				<div className="logo">
					ANYCOPY
					<a href="https://play.google.com/store/apps/details?id=any.copy.io" target="_blank"> 
						<img id="googlePlayImage" src="images/google_play.png" alt="Google Play"/> 
					</a>
				</div>
				<div className="line"></div>
				<div className="section">
					<ul className="nav nav-pills nav-stacked">
						<li role="presentation" className={this.state.navState === "copys" ? 'active' : ''} 
							onClick={this.selectTab.bind(this, "copys")} >
							<a href="#">Copys</a>
						</li>
						<li role="presentation" className={this.state.navState === "bin" ? 'active' : ''} 
							onClick={this.selectTab.bind(this, "bin")} >
							<a href="#" >Bin</a>
						</li>
					</ul>
				</div>
				<div className="line"></div>
				<div>
					<button type="button" className="btn btn-primary btn-newCopy"
						onClick={this.createNewCopy.bind(this)}>
					 	New Copy
					 </button>
				</div>
				<div className="section section-bottom">
					<div>
						<button type="button" className="btn btn-default"
							onClick={this.logout}>Log Out</button>
						<span> &nbsp; {username}</span>
					</div>
				</div>
			</div>
        );
	}
}

LeftNavBar.defaultProps = {
	currentTab: "copys"
}

function mapStateToProps(state) {
  return {
    navState: state.navState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // selectTab: () => dispatch(navTo("bin"))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNavBar);