

const core = require( "@actions/core" )
//const github = require( "@actions/github" )

const utils = require( "./lib/utils" )


try {

  const action = core.getInput( "action" )
  const dir = core.getInput( "dir" )

  switch( action ) {
    case "uglifyjs": {
      const inputfile = core.getInput( "filename" ).split( "," )
      const outputfile = core.getInput( "output" )

      if( outputfile ) {
        utils.runuglify( inputfile, dir, outputfile )
      } else {
        inputfile.forEach( ( f ) =>  utils.runuglify( f, dir ) )
      }
      return
    }

    case "styl": {
      const inputfile = core.getInput( "filename" ).split( "," )
      inputfile.forEach( ( f ) =>  utils.runstylus( f, dir ) )
      return
    }

    case "combine": {
      const inputfile = core.getInput( "filename" ).split( "," )
      const outputfile = core.getInput( "output" )
      utils.combinefiles( inputfile, outputfile, dir )
      return
    }

    case "replace": {
      const inputfile = core.getInput( "filename" )
      const regexs = core.getInput( "regexes" ).split( "," )
      const replaces = core.getInput( "replaces" ).split( "," )
      
      utils.replace( inputfile, regexs, replaces, dir )
      return
    }

  }

} catch ( error ) {
  core.setFailed( error.message )
}