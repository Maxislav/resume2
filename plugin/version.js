var fs = require('fs');
const dateFormat = require('dateformat');

const readFile = (url) => {
	return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function(err, data){
    	if(err) {
    		reject(err);
    		return null
      }
      resolve(data)
    })
	})
}

const writeFile = (url, str) => {
	return new Promise((resolve, reject) => {
    fs.writeFile(url, str, function (err) {
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

		compiler.plugin('startup', function (source, module, hash) {

			return source;
		})
		compiler.plugin('emit', function (compilation, callback) {
			console.log('EMIT Version!');

      callback()
		/*	setTimeout(()=>{
				callback()
			}, 2000)*/


		});

		compiler.plugin('make', function (compilation, callback) {

      	readFile('./cv-version.json')
					.then(d=>{
						const j = JSON.parse(d)
            j.version = j.version.replace(/\d+$/, (match) =>{
            	return +match+1
						} );
						j.date = dateFormat(new Date(), 'yyyy.mm.dd HH:MM:ss' )
						return j
					})
					.then(j=>{
						return writeFile('./cv-version.json', JSON.stringify(j, null, 4))
					})
					.then((d) => {
            callback()
					})




				/*fs.readFile('index.pug', 'utf8', function(err, data) {
					if (err) throw err;

					const repl = data.replace(/(Release\sdate:.+\d)/,'Release date: '  + dateFormat(new Date(), 'yyyy.mm.dd HH:MM:ss' ));

					fs.writeFile('index.pug', repl, function (err) {
						if (err) return console.log(err);

						setTimeout(()=>{
							callback()
						}, 2000)
					});


				});*/



			// Compile the template (queued)
			/*compilationPromise = childCompiler.compileTemplate(self.options.template, compiler.context, self.options.filename, compilation)
				.catch(function (err) {
					compilation.errors.push(prettyError(err, compiler.context).toString());
					return {
						content: self.options.showErrors ? prettyError(err, compiler.context).toJsonHtml() : 'ERROR',
						outputName: self.options.filename
					};
				})
				.then(function (compilationResult) {
					// If the compilation change didnt change the cache is valid
					isCompilationCached = compilationResult.hash && self.childCompilerHash === compilationResult.hash;
					self.childCompilerHash = compilationResult.hash;
					self.childCompilationOutputName = compilationResult.outputName;
					callback();
					return compilationResult.content;
				});*/
		});


		compiler.plugin('done', function () {
			console.log('done Version!');
		});
	}
}
module.exports = Version


