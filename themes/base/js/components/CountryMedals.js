'use strict';

import React from 'react';

/**
 *
 *
 * A  tag (`</>`) that
 *
 *
 * @class CountryMedals

 */
class CountryMedals extends React.Component {
	static propTypes = {
		data: React.PropTypes.object.isRequired,
		index: React.PropTypes.number.isRequired
	};

	static defaultProps = {

	};

	constructor() {
		super();
	}

	render() {
		return (
			<div key={this.props.index} className="olympic l-col-12">
				<div className="olympic__country l-col-5 nopad">
					<h2 className="olympic__name">{this.props.data.country}</h2>
				</div>
				<div className="l-col-7 nopad">
					<div className="l-col-12 nopad">
						{this.renderGoldMedals()}
						{this.renderSilverMedals()}
						{this.renderBronzeMedals()}
						{this.renderTotalMedals()}
					</div>
				</div>
			</div>
		);
	}

	renderGoldMedals() {
		if (this.props.data.gold === undefined) {
			return null;
		}

		return (
			<div className="olympic__medal l-col-3 nopad">
				<div className="graphic">
					<span className="h4 olympic__number">{this.props.data.gold}</span>
				</div>
			</div>
		);
	}

	renderSilverMedals() {
		if (this.props.data.silver === undefined) {
			return null;
		}

		return (
			<div className="olympic__medal l-col-3 nopad">
				<div className="graphic graphic--silver">
					<span className="h4 olympic__number">{this.props.data.silver}</span>
				</div>
			</div>
		);
	}

	renderBronzeMedals() {
		if (this.props.data.bronze === undefined) {
			return null;
		}

		return (
			<div className="olympic__medal l-col-3 nopad">
				<div className="graphic graphic--bronze">
					<span className="h4 olympic__number">{this.props.data.bronze}</span>
				</div>
			</div>
		);
	}

	renderTotalMedals() {
		if (this.props.data.total === undefined) {
			return null;
		}

		return (
			<div className="olympic__medal l-col-3 nopad">
				<span className="h4 olympic__number olympic__number--total">{this.props.data.total}</span>
			</div>
		);
	}
};

export default CountryMedals;
