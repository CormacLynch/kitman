'use strict';

import React from 'react';

/**
 *
 *
 * A  tag (`</>`) that
 *
 *
 * @class Loading
 */
class Loading extends React.Component {
	static propTypes = {

	};

	static defaultProps = {

	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className="loader">
				<div className="loader__rotate" />
			</div>
		);
	}
};

export default Loading;
