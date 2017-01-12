'use strict';

import React from 'react';

class Next extends React.Component {
	// static propTypes = {
	// 	nextSlice: React.PropTypes.string.isRequired,
	// 	onTap: React.PropTypes.func.isRequired
	// };

	render() {
		return (
			<div className="next">
				<div className="next__button">
					<span className="next__arrow"/>
				</div>
			</div>
		);
	}
}

export default Next;
