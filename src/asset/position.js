
export function windowSize() {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return {
    x, y,
    width: x,
    height: y
  }

}


function getWeight() {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
}

function findPosX(obj) {
  var curleft = 0;
  if (obj.offsetParent)
    while (1) {
      curleft += obj.offsetLeft;
      if (!obj.offsetParent)
        break;
      obj = obj.offsetParent;
    }
  else if (obj.x)
    curleft += obj.x;
  return curleft;
}

function findPosY(el) {
  var el2 = el;
  var curtop = 0;
  var curleft = 0;
  if (document.getElementById || document.all) {
    do {
      curleft += el.offsetLeft - el.scrollLeft;
      curtop += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
      el2 = el2.parentNode;
      while (el2 != el) {
        curleft -= el2.scrollLeft;
        curtop -= el2.scrollTop;
        el2 = el2.parentNode;
      }
    } while (el && el.offsetParent);

  } else if (document.layers) {
    curtop += el.y;
    curleft += el.x;
  }
  return curtop;
}


export function posXY(obj) {
  return {
    x: findPosX(obj),
    y: findPosY(obj)
  }
}
