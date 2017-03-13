import Backbone from 'backbone'

var CountriesCollection = Backbone.Collection.extend({
	url: "https://restcountries.eu/rest/v2/all"
})

export default CountriesCollection