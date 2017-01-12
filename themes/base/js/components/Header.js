'use strict';

import React from 'react';
import Tappable from 'react-tappable';

class Header extends React.Component {
	static propTypes = {
		onTap: React.PropTypes.func.isRequired
	};

	static defaultProps = {

	};

	constructor() {
		super();
	}

	render() {
		return (
			<header className="header l-col-12">
				<div className="l-col-6">
					<a className="logo" href="/"></a>
				</div>
				<nav className="l-col-6 navigation">
					<ul className="navigation__holder">
						<li className="navigation__item">
							<Tappable
								component="span"
								className="navigation__link"
								onTap={() => this.props.onTap('')}>
								All
							</Tappable>
						</li>
						<li className="navigation__item">
							<Tappable
								component="span"
								className="navigation__link"
								onTap={() => this.props.onTap('gold')}>
								Gold
							</Tappable>
						</li>
						<li className="navigation__item">
							<Tappable
								component="span"
								className="navigation__link"
								onTap={() => this.props.onTap('silver')}>
								Silver
							</Tappable>
						</li>
						<li className="navigation__item">
							<Tappable
								component="span"
								className="navigation__link"
								onTap={() => this.props.onTap('bronze')}>
								Bronze
							</Tappable>
						</li>
					</ul>
				</nav>
			</header>
		);
	}

	handleFilter(filterBy) {
		console.log(filterBy);
	}
};

export default Header;
