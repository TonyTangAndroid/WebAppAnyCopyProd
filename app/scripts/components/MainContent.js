import React from 'react';
import CopyList from './CopyList';
import Bin from './Bin'
import CopyDetail from './CopyDetail.js'
import { connect } from 'react-redux';
import searchAction from '../actions/search'
import { loadMoreCopysFromParse, startFetchingMoreCopysFromParse } from '../actions/copy'
import store from '../store/configureStore'
import { Provider } from 'react-redux';
import SearchList from  './SearchList'
import { searchFromParse, loadMoreSearchFromParse } from '../actions/search'

const contents = {
	"copys" : <Provider store={store}>
			    {() => <CopyList />}
			  </Provider>, 
	"bin": <Provider store={store}>
			    {() => <Bin />}
			</Provider>
}

function domNodeIsReachingEnd(scrollingNode) {
	// if less than 300 pixels, return reaching end
	return scrollingNode.scrollHeight - scrollingNode.scrollTop - scrollingNode.clientHeight < 300 ? true : false
}


class MainContent extends React.Component {
	constructor() {
		super();
		this.state = { isSearchingState: false, isLoading: false };
	}

	searchInputBoxOnKeyDown(event) {
		if (event.key == "Enter") {
			event.preventDefault()
			this.search()
		}
	}

	search() {
		// if not searching, start the action
		var text = React.findDOMNode(this.refs.search).value.trim();
		if (text == ""){
			alert("Please input key words");
			return;
		} else {
			// sequence may be changed later
			this.setState({
				isSearchingState: true,
				isLoading: true
			});
			var p = store.dispatch(searchFromParse(text));
			var self = this
			p.then(() => this.setState({
				isLoading: false
			}));
		}
	}

	searchTextChanged(event) {
		if (React.findDOMNode(this.refs.search).value === ""){
			// clear searching state
			this.setState({
				isSearchingState: false
			})
		}
	}
 
	// handle scrolling event and automatically load more
	handleScroll(event) {
		var node = React.findDOMNode(this.refs.copyList);
		if (domNodeIsReachingEnd(node) && !this.props.isFetchingMoreCopysFromParse) {
			// trigger load more event
			if (this.props.noMoreCopysFromParse){
				return;
			}
			if (this.state.isSearchingState) {
				store.dispatch(startFetchingMoreCopysFromParse());
				store.dispatch(loadMoreSearchFromParse(React.findDOMNode(this.refs.search).value));
			} else {
				store.dispatch(startFetchingMoreCopysFromParse());
				store.dispatch(loadMoreCopysFromParse());	
			}
			
		}
	}

	handleSubmit(event) {
	    event.preventDefault();
	}

	render() {
		return ( 
			<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 main">
	            <div ref='copyList' className="col-xs-3 col-sm-3 col-md-3 col-lg-3 CopyList" onScroll={this.handleScroll.bind(this)}>
	            	<div className="form-inline search col-xs-2 col-sm-2 col-md-2 col-lg-2" onSubmit={this.handleSubmit.bind(this)}>
		            	<input type="text" className="form-control" placeholder="Search" onChange={this.searchTextChanged.bind(this)} onKeyDown={this.searchInputBoxOnKeyDown.bind(this)}
		            		ref="search" id="searchBar"/>
		            	<button type="button" className="btn btn-default btn-sm" id="searchButton" onClick={this.search.bind(this)}>Search</button>
	            	</div>
	            	{ this.state.isSearchingState ? <SearchList isLoading={this.state.isLoading} /> : contents[this.props.navState] }
	            </div>
	            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 rightCopyDetail">
	            	<CopyDetail />
	            </div>
		     </div> 
        );
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    navState: state.navState,
    isFetchingMoreCopysFromParse: state.isFetchingMoreCopysFromParse,
    noMoreCopysFromParse: state.noMoreCopysFromParse
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);