import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import TitleComponent from './component/title-component/title-component';
import SkillHistoryComponent from './component/slill-history-component/slill-history-component'

const RootComponent = createReactClass({
	render: function() {
		return (
			<h1> My name is {this.props.name} </h1>
		);
	}
});



ReactDOM.render(
	<div>
		<TitleComponent/>
		<SkillHistoryComponent/>
	</div>
	,
	document.getElementById('rootEl')
);