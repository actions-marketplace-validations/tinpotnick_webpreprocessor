
const fs = require( "fs" )
const path = require( "path" )

/* Thank you */
var uglifyjs = require( "uglify-js" )
var stylus = require( "stylus" )

/**
 * Run uglify on input file and output as file.
 * @param { string | array } inputfile 
 * @param { string } dir - if present - sets the root directory
 * @param { string } outputfile - if present - write to this fileinstead - 
 * if multiple input files (inputfiles == aray) then this must be present
 * @returns 
 */
function runuglify( inputfile, dir, outputfile ) {
  
  if( "/" !== inputfile[ 0 ] ) {
    inputfile = path.format( { dir, base: inputfile } )
  }

  let code
  if( outputfile && Array.isArray( inputfile ) ) {
    code = []
    inputfile.forEach( ( e ) => code.push( fs.readFileSync( e, "utf8" ) ) )
  } else {
    code = [ fs.readFileSync( inputfile, "utf8" ) ]
    outputfile = inputfile.replace( /\.js$/, "-min.js" )
  }

  fs.writeFileSync( outputfile, uglifyjs.minify(
      code,
      { toplevel: true }
    ).code, "utf8" )
}

/**
 * Run the style to css preprocessor
 * @param { string } inputfile - filename of the inputfile
 */
function runstylus( inputfile, dir ) {

  if( "/" !== inputfile[ 0 ] ) {
    inputfile = path.format( { dir, base: inputfile } )
  }

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
    if( "/" !== inputfile[ 0 ] ) {
      inputfile = path.format( { dir, base: inputfile } )
    }
    outputstr += fs.readFileSync( inputfile, "utf8" ) 
  } )

  if( "/" !== outputfile[ 0 ] ) {
    outputfile = path.format( { dir, base: outputfile } )
  }

  fs.writeFileSync( outputfile, outputstr )
}

/**
 * replace strings in file with replaces, array based for multiple replaces.
 * @param { string } inputfile 
 * @param { array< string > } regexes 
 * @param { array< string } replaces 
 */
function replace( inputfile, regexes, replaces, dir ) {

  if( "/" !== inputfile[ 0 ] ) {
    inputfile = path.format( { dir, base: inputfile } )
  }

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
