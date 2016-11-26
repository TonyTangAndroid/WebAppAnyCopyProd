import React from 'react';
import DeleteCopyListView from './DeleteCopyListView'
import { connect } from 'react-redux';

export default class Bin extends React.Component {	
	render() {
		return (
			<div className="copyList">
				{this.props.deletedCopys.map(function(c,index) {
					return (
						<DeleteCopyListView key={c.id} content={c.content} tilte={c.title} obj={c} objIndex={index} />
					);
		        }, this)}
		        { this.props.noMoreCopysFromParse ? <div className="cell"> There is no more content </div> : this.props.isFetchingMoreCopysFromParse ? <div className="cell"> loading more... </div> : null }
			</div>
		);
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    searchText: state.searchText,
    deletedCopys: state.deletedCopys,
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
)(Bin);