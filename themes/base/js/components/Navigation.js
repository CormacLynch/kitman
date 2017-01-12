'use strict';

import React from 'react';
import Tappable from 'react-tappable';

/**
 *
 *
 * A  tag (`</>`) that
 *
 *
 * @class Navigation
 */
class Navigation extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<header className="header">
				<div className="l-col-12 navigation">
					<ul className="navigation__holder">
						<li className="navigation__item">
							<span className="navigation__link">About</span>
						</li>
						<li className="navigation__item">
							<span className="navigation__link">Work</span>
						</li>
						<li className="navigation__item">
							<span className="navigation__link">Contact</span>
						</li>
					</ul>
				</div>
			</header>
		);
	}

	renderNavigationItems() {
		return this.props.data.map((navitem, i) => {
			if (i === 0) {
				return null;
			}

			return (
				<li key={'nav_item-' + i} className="navigation__item">
					<Tappable
						component="span"
						className="navigation__link"
						onTap={() => this.props.onTap(navitem.name)}>
						{navitem.title}
					</Tappable>
				</li>
			);
		});
	}
};

export default Navigation;
