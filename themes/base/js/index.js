'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Flatten from './exercises/flatten';
require('../font/fonts.less');
require('../css/less/style.less');

window._touch = window.innerWidth < 769;

window.addEventListener('DOMContentLoaded', function() {
	let appElement = document.querySelector('[data-app]');
	console.log(Flatten([[1, 2, [3]], 4]));

	if (appElement) {
		ReactDOM.render(< App / >, appElement);
	}
});
