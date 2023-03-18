import React, { Component } from "react";

class Modal extends Component {
	render() {
		const { onClose, personId, handleDelete } = this.props;
		return (
			<div className="modal">
				<div className="modal-container">
					<div>Are you sure you want to Delete?</div>
					<div className="modal-btn">
						<button className="btn-secondary" onClick={onClose}>
							Close
						</button>
						<button
							className="btn-primary"
							onClick={() => handleDelete(personId)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
