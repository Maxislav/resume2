/**
 * @param {Array.<SkillItem>}list
 * @return {Date}
 */
export const getMinDate = (list) =>{
	let minDate = Infinity;
	list.forEach(skillItem=>{
		skillItem.date.forEach(d=>{
			d.forEach(d=>{
				if(d!==null){
					const dateLong = new Date(d).getTime()
					if(dateLong<minDate){
						minDate = dateLong
					}
				}
			})
		})
	});
	return new Date(minDate)
}