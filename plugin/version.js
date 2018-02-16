var fs = require('fs');
const dateFormat = require('dateformat');

const readFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function(err, data) {
      if (err) {
        reject(err);
        return null
      }
      resolve(data)
    })
  })
}

const writeFile = (url, str) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(url, str, function(err) {
      if (err) {
        reject(err)
        return console.log(err);
      }
      resolve(str)
    });
  })

}

class Version {
  constructor() {

  }
  apply(compiler) {
    compiler.plugin('startup', function(source, module, hash) {
      return source;
    })
    compiler.plugin('emit', function(compilation, callback) {
      console.log('EMIT Version!');
      callback()
    });
    compiler.plugin('make', function(compilation, callback) {
      readFile('./cv-version.json')
        .then(d => {
          const j = JSON.parse(d)
          j.version = j.version.replace(/\d+$/, (match) => {
            return +match + 1
          });
          j.date = dateFormat(new Date(), 'yyyy.mm.dd HH:MM:ss')
          return j
        })
        .then(j => {
          return writeFile('./cv-version.json', JSON.stringify(j, null, 4))
        })
        .then((d) => {
          callback()
        })
    });


    compiler.plugin('done', function() {
      console.log('done Version!');
    });
  }
}

module.exports = Version


