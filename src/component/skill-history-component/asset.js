/**
 * @param {Array.<SkillItem>}list
 * @return {Date}
 */
import {NormalDate} from "../../asset/normal-date";

export const getMinDate = (list) =>{
	let minDate = Infinity;
	list.forEach(skillItem=>{
		skillItem.date.forEach(d=>{
			d.forEach(d=>{
				if(d!==null){
					const dateLong = new NormalDate(d).getTime()
					if(dateLong<minDate){
						minDate = dateLong
					}
				}
			})
		})
	});
	return new Date(minDate)
}