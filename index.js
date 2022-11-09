

const core = require( "@actions/core" )
//const github = require( "@actions/github" )

const utils = require( "lib/utils" )


try {

  const action = core.getInput( "action" )
  switch( action ) {
    case "uglifyjs": {
      const inputfile = core.getInput( "filename" )
      if( Array.isArray( inputfile ) ) {
        inputfile.forEach( ( f ) =>  utils.runuglify( f ) )
        return
      }

      utils.runuglify( inputfile )
      return
    }

    case "styl": {
      const inputfile = core.getInput( "filename" )
      const outputfile = core.getInput( "output" )
      if( Array.isArray( inputfile ) ) {
        inputfile.forEach( ( f ) =>  utils.runstylus( f ) )
        return
      }

      utils.runstylus( inputfile, outputfile )
      return
    }

    case "combine": {
      const inputfile = core.getInput( "filename" )
      const outputfile = core.getInput( "output" )
      if( !Array.isArray( inputfile ) ) {
        core.setFailed( "Combining files filenames must be an array" )
        return
      }

      utils.combinefiles( inputfile, outputfile )
      return
    }

    case "replace": {
      const inputfile = core.getInput( "filename" )
      const regexs = core.getInput( "regexes" )
      const replaces = core.getInput( "replaces" )

      if( typeof inputfile !== "string" ) {
        core.setFailed( "input filename must be a string" )
        return
      }

      if( !Array.isArray( regexs ) ) {
        core.setFailed( "input regex must be an array of strings" )
        return
      }

      if( !Array.isArray( replaces ) ) {
        core.setFailed( "input replaces must be an array of strings" )
        return
      }
      
      utils.replace( inputfile, regexs, replaces )
      return
    }

  }

} catch ( error ) {
  core.setFailed( error.message )
}