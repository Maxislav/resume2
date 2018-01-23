import React, {Component} from 'react';
import styl from './own-project-component.styl'

export default class OwnProjectComponent extends Component{
	render(){
		return(
			<div className={styl['own-component-styl']}>
				Own projects
			</div>	
			)
	}
}