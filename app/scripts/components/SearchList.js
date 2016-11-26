import React from 'react';
import { connect } from 'react-redux';
import CopyListView from './CopyListView';
import DeleteCopyListView from './DeleteCopyListView'

class SearchList extends React.Component {
	render() {
		return (
			<div className="copyList" >
				{(() => {
			        if (this.props.isLoading) {
			            return (<div className="cell"> Working hard on searching.... </div>);
			        } else {
			        	if (this.props.searchResults.length == 0) {
			        		return (<div className="cell"> No match results</div>);
			        	}
			        }
			    })()}
			    
	    		{this.props.searchResults.map(function(c,index) {
	    			if (this.props.navState === "copys") {
	    				return (<CopyListView key={c.id} content = {c.content} obj={c} objIndex={index}/>);
	    			} else {
	    				return (<DeleteCopyListView key={c.id} content={c.content} tilte={c.title} obj={c} objIndex={index} />);
	    			}
	            }, this)}
	            

	            { this.props.isFetchingMoreCopysFromParse ? <div className="cell"> loading more... </div> : this.props.noMoreCopysFromParse ? <div className="cell"> There is no more content </div> : null }
			</div>
		);
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
  	navState: state.navState,
    searchResults: state.searchResults,
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
)(SearchList);