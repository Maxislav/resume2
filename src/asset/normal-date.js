

export class NormalDate extends Date{
  constructor(...args){
    if(args.length == 1 && typeof args[0] == "string"){
      const arr = args[0].split('.')
      arr.reverse()
      super(...arr)
    }else{
      super(...args)
    }

  }

}


export function toYearMonthDay (ms)  {
  const y = 365 * 24 * 3600 *1000
  const m = 30 * 24 * 3600 *1000
  const d = 24 * 3600 * 1000

  const YY = Math.floor(ms/y);
  const MM = Math.floor((ms - (YY*y))/m)
  const DD = Math.floor((ms - (YY*y) - (MM*m))/d)
  return {
    YY,
    MM,
    DD
  }
}