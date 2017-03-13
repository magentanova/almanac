import React from 'react'

import Banner from './banner'

const HomeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className='home-view' >
	 			<Banner />
	 			<h2> this is the home page </h2>
	 		</div>
	 	)
 	}
})

export default HomeView
