
const fs = require( "fs" )
const path = require( "path" )

/* Thank you */
var uglifyjs = require( "uglify-js" )
var stylus = require( "stylus" )

/**
 * Run uglify on input file and output as file.
 * @param { string } inputfile 
 * @returns 
 */
function runuglify( inputfile, dir ) {
  
  inputfile = path.format( { dir, base: inputfile } )
  const outputfile = inputfile.replace( /\.js$/, "-min.js" )
  if( inputfile === outputfile ) {
    core.setFailed( "filename needs to end with .js" )
    return
  }

  fs.writeFileSync( outputfile, uglifyjs.minify( {
      inputfile: fs.readFileSync( inputfile, "utf8" )
    } ).code, "utf8" )
}

/**
 * Run the style to css preprocessor
 * @param { string } inputfile - filename of the inputfile
 */
function runstylus( inputfile, dir ) {

  inputfile = path.format( { dir, base: inputfile } )
  let outputfile = inputfile.replace( /\.styl$/, ".css" )

  stylus( fs.readFileSync( inputfile, "utf8" ) )
    .set( "filename", outputfile )
    .render( ( err, css ) => {
      fs.writeFileSync( outputfile, css )
    } )
}



/**
 * Combine all the list of files in inputfiles into one file named by outputfile.
 * @param { array< string > } inputfiles 
 * @param { string } outputfile 
 */
 function combinefiles( inputfiles, outputfile, dir ) {

  let outputstr = ""
  inputfiles.forEach( inputfile => {
    inputfile = path.format( { dir, base: inputfile } )
    outputstr += fs.readFileSync( inputfile, "utf8" ) 
  } )

  fs.writeFileSync( path.format( { dir, base: outputfile } ), outputstr )
}

/**
 * replace strings in file with replaces, array based for multiple replaces.
 * @param { string } inputfile 
 * @param { array< string > } regexes 
 * @param { array< string } replaces 
 */
function replace( inputfile, regexes, replaces, dir ) {

  inputfile = path.format( { dir, base: inputfile } )

  let instr = fs.readFileSync( inputfile, "utf8" ) 

  for( let i = 0; i < regexes.length; i++ ) {
    instr = instr.replace( new RegExp( regexes[ i ] ), replaces[ i ] )
  }

  fs.writeFileSync( inputfile, instr )
}


module.exports.runuglify = runuglify
module.exports.runstylus = runstylus
module.exports.combinefiles = combinefiles
module.exports.replace = replace
