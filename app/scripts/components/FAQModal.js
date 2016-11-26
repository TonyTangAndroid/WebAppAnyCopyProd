import React from 'react';

export default class FAQModal extends React.Component {
	render() {
		return (
			<div className="modal fade" id="FAQModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">FAQ</h4>
			      </div>
			      <div className="modal-body">
			      	you will be more amazed with Android Client!
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
