import React from 'react';
import store from '../store/configureStore'
import { editCopy } from '../actions/copy'

export default class DeleteCopyListView extends React.Component {
	select(index) {
		store.dispatch(editCopy(this,index));
	}

	render() {
		// format date into usable string
		var createAt = this.props.obj.createdAt
		var createAtString = createAt.getDate() + "/" + createAt.getMonth() + "/" + createAt.getFullYear() + " " + createAt.getHours() + ":" + createAt.getMinutes() + ":" + createAt.getSeconds();
		var updatedAt = this.props.obj.updatedAt
		var updatedAtString = updatedAt.getDate() + "/" + updatedAt.getMonth() + "/" + updatedAt.getFullYear() + " " + updatedAt.getHours() + ":" + updatedAt.getMinutes() + ":" + updatedAt.getSeconds();
		
		var subContent = this.props.content.length > 40 ? this.props.content.substring(0,40) + "...." : this.props.content
		return (
			<div className="cell" onClick={this.select.bind(this.props.obj, this.props.objIndex)} >
		    	{(() => {
		            if (this.props.obj.title) {
		              return (
		              	<div  >
		              		<h4>{this.props.obj.title}</h4>
		              		<h6>
		              			<span className="small">Created At: {createAtString}</span> <br/>
		              			<span className="small">Updated At: {updatedAtString}</span>
		              		</h6>
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

DeleteCopyListView.propTypes = { content: React.PropTypes.string };
DeleteCopyListView.defaultProps = { content: "Loading...", level:0 };