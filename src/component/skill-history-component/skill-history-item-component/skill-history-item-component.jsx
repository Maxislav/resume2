import React from 'react';


export default class SkillHistoryItemComponent extends React.Component {
	render() {
		return (
			<li>
				<div>
					{this.props.name}
				</div>
				<ul className="flex">
					{
						this.props.date.map((item, index) => {
							return (
								<li key={index}  >
									<div className="flex">
										{
											item.map((date, i) => {
												const d = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();
												return (
													<div key={i} className="margin-0-8">
														{d}
													</div>
												)
											})
										}
									</div>
								</li>
							)
						})
					}
				</ul>
			</li>
		)
	}
}