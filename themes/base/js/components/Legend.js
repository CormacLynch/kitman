'use strict';

import React from 'react';

class Legend extends React.Component {
	static propTypes = {
		filter: React.PropTypes.string.isRequired
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className="legend l-col-12">
				<div className="legend__country l-col-5 nopad">
					<h4>Country</h4>
				</div>
				<div className="l-col-7 nopad">
					{this.renderGoldTitle()}
					{this.renderSilverTitle()}
					{this.renderBronzeTitle()}
					{this.renderTotalTitle()}
				</div>
			</div>
		);
	}

	renderGoldTitle() {
		if (this.props.filter === 'gold' || this.props.filter === '') {
			return (
				<div className="legend__items l-col-3 nopad">
					<h4>Gold</h4>
				</div>
			);
		} else {
			return null;
		}
	}

	renderSilverTitle() {
		if (this.props.filter === 'silver' || this.props.filter === '') {
			return (
				<div className="legend__items l-col-3 nopad">
					<h4>Silver</h4>
				</div>
			);
		} else {
			return null;
		}
	}

	renderBronzeTitle() {
		if (this.props.filter === 'bronze' || this.props.filter === '') {
			return (
				<div className="legend__items l-col-3 nopad">
					<h4>Bronze</h4>
				</div>
			);
		} else {
			return null;
		}
	}

	renderTotalTitle() {
		if (this.props.filter === '') {
			return (
				<div className="legend__items l-col-3 nopad">
					<h4>Total</h4>
				</div>
			);
		} else {
			return null;
		}
	}
};

export default Legend;
