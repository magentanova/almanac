import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import HomeView from './views/homeView.js'
import ListView from './views/listView.js'


const app = function() {
  var AlmanacRouter = Backbone.Router.extend({
  	routes: {
  		'home': 'showHomePage',
  		'countries/list': 'showListPage'
  	},

  	showHomePage: function() {
  		// this is where we mount our VDOM tree
  		ReactDOM.render(<HomeView />, document.querySelector('.container '))
  	},
s
  	showListPage: function() {
  		ReactDOM.render(<ListView />, document.querySelector('.container '))
  	}
  })

  new AlmanacRouter
  Backbone.history.start()
}
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..