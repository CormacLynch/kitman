'use strict';

import React from 'react';
import 'whatwg-fetch';
import Legend from '../components/Legend';
import CountryMedals from '../components/CountryMedals';
import Loading from '../components/Loading';
import Header from '../components/Header';

class App extends React.Component {
	static propTypes = {

	};

	static defaultProps = {

	};

	constructor() {
		super();

		this.state = {
			// fetch the olympic data
			originalData: this.getOlympicData() || [],
			data: [],
			filterBy: '',
			transitioning: false
		};
	}

	// Rendering the Legend and Loading or OlympicCountriesMedals depending on current data.
	render() {
		let sectionHolderClasses = this.state.transitioning ? 'section__holder section__holder--hide l-col-10' : 'section__holder l-col-10';

		return (
			<div>
				<Header onTap={this.handleFilerBy} />
				<section className="section l-col-12">
					<div className={sectionHolderClasses}>
						<Legend filter={this.state.filterBy}/>
						{this.state.data < 1 ? <Loading /> : this.renderOlympicCountriesMedals()}
					</div>
				</section>
			</div>
		);
	}

	renderOlympicCountriesMedals() {
		return this.state.data.map((country, i) => {
			return (
				<div key={i}>
					<CountryMedals key={i} data={country} index={i} />
				</div>
			);
		});
	}

	handleFilerBy = (filterBy) => {
		// call transitioning to chnage the view
		this.handleTransitioning();
		// function used to filter the data based on what filter was chosen.
		let newFilteredData = [];

		// Timeout too
		setTimeout(function() {
			// if the all filter was chosen set the data to the original data, and filterby to an empty string.
			if (filterBy.length < 1) {
				this.setState({
					data: this.state.originalData,
					filterBy: ''
				});
			// else loop through the countries and find the find countries with the filter medals greater than 1.
			} else {
				for (let i = 0; i < this.state.originalData.length; i++) {
					if (this.state.originalData[i][filterBy] > 0) {
						// if the country meets this criteria then added to a new array with only the country name and the filtered number of medals.
						newFilteredData.push({country: this.state.originalData[i].country, [filterBy]: this.state.originalData[i][filterBy]});
					}
				}

				// sort array in decending order based on filtered medal number.
				newFilteredData.sort(function(a, b) {
					return b[filterBy] - a[filterBy];
				});

				// set state of data and filterby
				this.setState({
					data: newFilteredData,
					filterBy: filterBy
				});
			}
		}.bind(this), 300);
	}

	handleTransitioning = () => {
		this.setState({
			transitioning: !this.state.transitioning
		}, function() {
			setTimeout(function() {
				this.setState({
					transitioning: !this.state.transitioning
				});
			}.bind(this), 500);
		});
	}

	getOlympicData() {
		// using fetch to get all the data from the array
		fetch('/themes/base/js/data/olympicData.json')
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				// once the data has been recieved in the responce call setConsolidatedOlympicData
				this.setConsolidatedOlympicData(data);
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	}

	setConsolidatedOlympicData(olpmpicData) {
		// initilaise consolidatedOlympicData to an empty array
		let consolidatedOlympicData = [];

		// loop through the responce data
		for (let i = 0; i < olpmpicData.length; i++) {
			// add the initial elemnt to the new consolidatedOlympicData array
			if (consolidatedOlympicData.length < 1) {
				// set the inital number of medals for gold, silver and bronze.
				let numberOfMedals = this.numberOfMedals(olpmpicData[i].medal.toLowerCase());
				// add the new object to the consolidatedOlympicData array with keys country, gold, silver and bronze.
				// gold, silver and bronze will use the values returned from numberOfMedals
				consolidatedOlympicData.push({'country': olpmpicData[i].country, 'gold': numberOfMedals.gold, 'silver': numberOfMedals.silver, 'bronze': numberOfMedals.bronze});
			} else if (this.ifCountryAlreadyExists(consolidatedOlympicData, olpmpicData[i].country)) {
				// set the inital number of medals for gold, silver and bronze.
				let numberOfMedals = this.numberOfMedals(olpmpicData[i].medal.toLowerCase());
				// add the new object to the consolidatedOlympicData array with keys country, gold, silver and bronze.
				// gold, silver and bronze will use the values returned from numberOfMedals
				consolidatedOlympicData.push({'country': olpmpicData[i].country, 'gold': numberOfMedals.gold, 'silver': numberOfMedals.silver, 'bronze': numberOfMedals.bronze});
			} else {
				// as some of the objects already exist in the new consolidatedOlympicData array, all that is needed to be done is to increase the medal count;

				// initialise the medal name
				let medal = olpmpicData[i].medal.toLowerCase();
				// find the index of the country in the consolidatedOlympicData array;
				let index = this.findIndexOfElementInArray(consolidatedOlympicData, olpmpicData[i].country);
				// use the return index and incrase the medal count
				consolidatedOlympicData[index][medal]++;
			}
		}

		this.setMedalTotalAndSort(consolidatedOlympicData);
	}

	ifCountryAlreadyExists(array, value) {
		// check the consolidatedOlympicData array to see if the country already exists.
		for (let i = 0; i < array.length; i++) {
			let country = array[i].country;

			// if the country already exists return false
			if (country === value) {
				return false;
			}
		}

		// otherwise if the country doesn't exist return true.
		return true;
	}

	numberOfMedals(medal) {
		// this function is used by the setConsolidatedOlympicData function to initalise the number of medals each country has.
		let gold = 0;
		let silver = 0;
		let bronze = 0;

		switch (true) {
			// if the medal is gold increase the gold count.
			case medal === 'gold':
				gold++;
				break;
			// if the medal is silver increase the silver count.
			case medal === 'silver':
				silver++;
				break;
			// if the medal is bronze increase the bronze count.
			case medal === 'bronze':
				bronze++;
				break;
		}

		// return an object with the results.
		return ({'gold': gold, 'silver': silver, 'bronze': bronze});
	}

	findIndexOfElementInArray(array, country) {
		// this function is used by the setConsolidatedOlympicData function to find the index of the already existing country.
		for (let i = 0; i < array.length; i++) {
			if (country === array[i].country) {
				return i;
			}
		}
	}

	setMedalTotalAndSort = (olympicData) => {
		// the function calculates the total number of medals each country has.
		// Loop through each country accessing gold, silver and bronze, adding them then putting the total into the object.
		for (let i = 0; i < olympicData.length; i++) {
			let total = olympicData[i].gold + olympicData[i].silver + olympicData[i].bronze;
			olympicData[i].total = total;
		}

		// sorting the array in decending order based on the countrys total number of medals
		olympicData.sort(function(a, b) {
			return b.total - a.total;
		});

		// setting the state of both originalData and data.
		this.setState({
			originalData: olympicData,
			data: olympicData
		});
	}
};

export default App;
