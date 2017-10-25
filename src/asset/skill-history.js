/**
 * @typedef {Object} SkillItem
 * @property {string} name
 * @property {Array.<Array.<string|null>>} date
 */


/**
 * @type {Array.<SkillItem>}
 */
const list = [
    {
        name: 'Angular',
        date: [
            ['01.01.2014', "01.01.2015"],
            ['01.04.2015', null]
        ]
    },{
        name: 'Angular2+',
        date: [
            ['2016', null]
        ]
    },
    {
        name: 'React',
        date: [
            ['2017', null]
        ]
    },

];

export default list;