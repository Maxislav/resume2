
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}


function loadPromise(url) {
  return new Promise((resolve, reject)=>{
    var xhr = createCORSRequest("GET", url);
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.send();
  });
}

/**
 *
 * @param {String} url
 * @param {string | undefined} type
 * @return {*|PromiseLike<T>|Promise<T>}
 */
export const xhrGet = (url, type) => {
  return loadPromise(url)
    .then(arrayBuf => {
      return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = () =>{
          switch (type){
            case 'json':
              try {
                resolve(JSON.parse(reader.result));
              }catch(err) {
                reject(err)
              }

              break;
            default:
              resolve(reader.result);
          }

        }
        reader.readAsText(new Blob([new Uint8Array(arrayBuf)]));
      })
    })
}

export default loadPromise