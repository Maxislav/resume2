

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