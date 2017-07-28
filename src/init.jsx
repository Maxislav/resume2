import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
const HelloWorld = createReactClass({
	render: function() {
		return (
			<h1> Hello resume by react! </h1>
		);
	}
});
ReactDOM.render(
	<HelloWorld />,
	document.getElementById('content')
);