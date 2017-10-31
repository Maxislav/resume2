
/**
 * @param {number} min
 * @param {number}max
 * @param {boolean} [int=false]
 * @returns {number}
 */
const getRandom =  function(min, max, int=false) {
  let rand = min + Math.random() * (max - min);
  if(int){
    rand = Math.round(rand)
  }
  return rand;
};


export class Drip {
  constructor(width, height){
    this.width = width
    this.height = height
    const scaleX = this.scaleX =  2/width;
    const scaleY = this.scaleY =  2/height;
    this.x = getRandom(0, width);
    this.y = getRandom(0, height);

    const size = this.size = 3
    this.xMin = (this.x-size)*scaleX-1;
    this.yMin = (this.y-size)*scaleY-1;
    this.xMax = (this.x+size)*scaleX-1;
    this.yMax = (this.y+size)*scaleY-1;
  }

  slip(dy = 1){
    this.y = this.y - dy;
    if(this.y<0){
      this.y = this.height;
      this.x = getRandom(0, this.width);
    }
    const scaleX = this.scaleX
    const scaleY = this.scaleY
    const size = this.size
    this.xMin = (this.x-size)*scaleX-1;
    this.yMin = (this.y-size)*scaleY-1;
    this.xMax = (this.x+size)*scaleX-1;
    this.yMax = (this.y+size)*scaleY-1;
  }
}



export class Matrix {
  constructor(width, height){

    this.m = new Float32Array(width*height*4*4);
    const scaleX =  2/width;
    const scaleY =  2/height;

    this.drip = new Drip(width, height);
    this.dripList = ((i) => {
      const list = []
      while (list.length<i){
        list.push(new Drip(width, height))
      }
      return list
    })(10)

    let i = 0;
    console.time('for')
    for(let y = 0; y < height; y++){
      for(let x = 0; x < width; x++){
        const xm = x*scaleX-1;
        const ym = y*scaleY-1;
        this.m[i++] = xm; //координата x
        this.m[i++] = ym; //координата y
        this.m[i++] = 0.0;
        this.m[i++] = 1.0;
        this.m[i++] = 0.0;
        this.m[i++] = 1.0;
      }
    }
    console.timeEnd('for')

    console.log(this.m.length)
  }
  getMatrixPosition(){
    return this.m
  }
  fade(){
      for(let i = 0 ; i< this.m.length; i+=6){
        const x = this.m[i];
        const y = this.m[i+1];

        if(Matrix.isCath(x, y , this.dripList) ){
          this.m[i+5] = 1.0
        }else{
          this.m[i+5] = this.m[i+5]-0.01;
          if(this.m[i+5]<0){
            this.m[i+5] = 0.0;
          }
        }

      }
      this.drip.slip(4)
    this.dripList.forEach(it=>{
      it.slip(4)
    })
  }

  static isCath(x, y, dripList){
    let a = false;
    let i =0
    while (i<dripList.length){
      const drip = dripList[i];
      if(drip.xMin<x && x<drip.xMax && drip.yMin<y && y<drip.yMax ){
        return true
      }

      i++
    }
  }
};




