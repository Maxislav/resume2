class $Promise extends Promise {
	constructor(f) {
		let res = null;
		let rej = null;
		let r, j;
		let _f = f;
		if(!_f){
			_f = function (_res, _rej) {
				res = _res;
				rej = _rej;
				if(r!==undefined) res(r);
				if(j!==undefined) rej(j);
			}
		}
		super(_f);
		this.resolve = (_r)=>{
			r = _r;
			if(res) res(_r);
			return this;
		};

		this.reject = (_j)=>{
			j = _j;
			if(rej) rej(_j);
			return this
		};
	}
}




export default $Promise
