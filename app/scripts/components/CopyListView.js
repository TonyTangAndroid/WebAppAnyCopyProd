import React from 'react';
import store from '../store/configureStore'
import { editCopy } from '../actions/copy'

export default class CopyListView extends React.Component {
	edit(index) {
		store.dispatch(editCopy(this,index));
	}
	
	render() {
		var subContent = this.props.content.length > 40 ? this.props.content.substring(0,40) + "...." : this.props.content
		return (
			<div className="cell" onClick={this.edit.bind(this.props.obj, this.props.objIndex)}>
		    	{(() => {
		            if (this.props.obj.title) {
		              return (
		              	<div  >
		              		<h4>{this.props.obj.title}
		              		</h4>
		    			</div>);
		            }
		        })()}
	        	<div>
	        	    {subContent}
	        	</div>
			</div>
		);
	}
}

CopyListView.propTypes = { content: React.PropTypes.string };
CopyListView.defaultProps = { content: "Loading...", level:0 };