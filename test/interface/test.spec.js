
const expect = require( "chai" ).expect
const utils = require( "../../lib/utils" )

const fs = require( "fs" )

describe( "preprocessor", function() {

  describe( "uglify-js", function() {
    it( "runuglify", async function() {
      
      utils.runuglify( "test/interface/uglifyme.js" )
      expect( fs.readFileSync( "test/interface/uglifyme-min.js", { encoding: "utf8", flag: "r" } ) ).to.equal( `console.log("Hello World!");` )
    } )
  } )

  describe( "style", function() {
    it( "runstylus", async function() {
      utils.runstylus( "test/interface/test.styl" )
      expect( fs.readFileSync( "test/interface/test.css", { encoding: "utf8", flag: "r" } ) ).to.equal( `body {\n  color: #fff;\n}\n` )
    } )
  } )

  describe( "combine", function() {
    it( "combinefiles", async function() {
      utils.combinefiles( [ "test/interface/uglifyme.js", "test/interface/small.js" ], "test/interface/combined.js" )
      expect( fs.readFileSync( "test/interface/combined.js", { encoding: "utf8", flag: "r" } ) ).to.equal( `\n\nconsole.log( "Hello World!" )console.error("Hello World");` )

    } )
  } )

  describe( "replace", function() {
    it( "replace", async function() {
      fs.writeFileSync( "test/interface/test.html", "<head></head><body>REPLACEME<p>REPLACETHISALSO<p/></body>" )
      utils.replace( "test/interface/test.html", [ "REPLACEME", "REPLACETHISALSO" ], [ "Hello", "World" ] )
      expect( fs.readFileSync( "test/interface/test.html", { encoding: "utf8", flag: "r" } ) ).to.equal( `<head></head><body>Hello<p>World<p/></body>` )
    } )
  } )
} )