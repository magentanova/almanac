import React from 'react'
import Backbone from 'backbone'

import Banner from './banner'
import CountriesCollection from '../models/countries'

const ListView = React.createClass({

	componentWillMount: function() {
		// fetch data
		var coll = new CountriesCollection
		var p = coll.fetch()

		// two ways to react to this data fetch

		// 1. with a promise

		// p.then(()=> { // fat arrow functions preserve the context
		// 	// from their birthplace
		// 	this.setState({
		// 		countries: coll
		// 	})
		// })
		// same as...
			// p.then(function() {
			// 	this.setState({
			// 		countries: coll
			// 	})
			// }.bind(this))

		// 2. subscribe to the collection, so that when it syncs, we
		// set state

		coll.on('sync', () => {
			this.setState({
				countries: coll
			})
		})
		// .on() is a method on pretty much all backbone objects. 
			// backbone is very bullish on events
	},

	componentDidMount: function() {
		this.setState({
				blackoutClass: ''
			})
	},

	componentWillUnmount: function() {
		console.log('list view is unmounting')
	},

	getInitialState: function() {
		return {
			blackoutClass: 'blackout',
			countries: [] // if the starting value is of the same type 
			// as the eventual value, we prevent errors by calling methods
			// like .map() when we intitially render without data.
		}
	},

	// ListView is a "smart" component. It does things. It has state. 
	 render: function() {
	 	return (
	 		<div className={this.state.blackoutClass + ' list-view'} >
	 			<Banner />
	 			<ListBox countries={this.state.countries} />
	 		</div>
	 	)
 	}
})
// preacher ^^^

// sends gospel vvv

const ListBox = React.createClass({
	// ListBox and its children will be "dumb" components. 
		// They simply receive props and render based on those props.

	// this._renderCountry is the callback function for a call to .map(). 
		// the .map() callback takes in a model and returns a new array element
			// based on that model.
		// .map() itself returns an array where every element of the original was 
			// transformed based on the callback. 
	_boringForLoopWay: function() {
		var countryChildren = []
		for (var i = 0; i < this.props.countries.models.length; i ++) {
			countryChildren.push(
				<Country country={this.props.countries.models[i]} />
			)
		}
		return countryChildren
	},

	 _renderCountry: function(countryModel) {
	 	// countryModel is an element from our Backbone collection holding
	 		// country records

	 	// we assign this Backbone model to be on props of a react component
	 		// called Country. it will live at props.country
	 	return <Country key={countryModel.cid} country={countryModel} />
	 },



	 render: function() {
	 	console.log('props in list box component', this.props )

	 	return (
	 		<div className='list-box' >
	 			<h2>Countries List</h2>
	 			<div className='countries-list'>
	 				{this.props.countries.map(this._renderCountry)}
	 			{/* we had this.props.countries: [BackboneModel, BackboneModel, BackboneModel ...] */}
	 			{/* we get: [<Country />, <Country />, <Country/> ...],
	 				where each Country component has a different Backbone model 
	 				on props.country */}
	 			{/* we could have done the same thing with a for loop. 
	 				in fact....
					this._boringForLoopWay()
	 			*/}
	 			</div>
	 		</div>
	 	)
 	}
})


const Country = React.createClass({
	 render: function() {
	 	return (
	 		<div className='country' >
	 			<h3>{this.props.country.get('name')}</h3>
	 		</div>
	 	)
 	}
})



export default ListView
