
const expect = require( "chai" ).expect
const utils = require( "../../lib/utils" )

const fs = require( "fs" )
const os = require( "os" )

describe( "preprocessor", function() {

  describe( "uglify-js", function() {
    it( "runuglify", async function() {
      
      utils.runuglify( "test/interface/uglifyme.js" )
      expect( fs.readFileSync( "test/interface/uglifyme-min.js", { encoding: "utf8", flag: "r" } ) ).to.equal( `console.log("Hello World!");` )
    } )

    it( "runuglify with comined combine", async function() {
      const tmpfile = os.tmpdir() + "/ug-min.js"

      utils.runuglify( [ "test/interface/uglifyme.js", "test/interface/small.js" ], undefined, tmpfile )
      expect( fs.readFileSync( tmpfile, { encoding: "utf8", flag: "r" } ) ).to.equal( `console.log("Hello World!"),console.error("Hello World");` )
    } )

    it( "runuglify with comined combine no output", async function() {
      utils.runuglify( [ "test/interface/uglifyme.js", "test/interface/small.js" ] )
      expect( fs.readFileSync( "test/interface/uglifyme-min.js", { encoding: "utf8", flag: "r" } ) ).to.equal( `console.log("Hello World!"),console.error("Hello World");` )
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

    it( "combine to tmp", async function() {
      const tmp = os.tmpdir()

      fs.copyFileSync( "test/interface/uglifyme.js", tmp + "/uglifyme.js" )
      fs.copyFileSync( "test/interface/small.js", tmp + "/small.js" )
      try{ 
        fs.mkdirSync( tmp + "/tst" )
      } catch( e ) {}

      utils.combinefiles( [ "uglifyme.js", "small.js" ], tmp + "/tst/combined.js", os.tmpdir() )

      expect( fs.readFileSync( os.tmpdir() + "/combined.js", { encoding: "utf8", flag: "r" } ) ).to.equal( `\n\nconsole.log( "Hello World!" )console.error("Hello World");` )
    } )
  } )

  describe( "replace", function() {
    it( "replace", async function() {
      fs.writeFileSync( "test/interface/test.html", "<head></head><body>REPLACEME<p>REPLACETHISALSO<p/></body>" )
      utils.replace( "test/interface/test.html", [ "REPLACEME", "REPLACETHISALSO" ], [ "Hello", "World" ] )
      expect( fs.readFileSync( "test/interface/test.html", { encoding: "utf8", flag: "r" } ) ).to.equal( `<head></head><body>Hello<p>World<p/></body>` )
    } )

    it( "replace", async function() {
      const filename = os.tmpdir() + "/tmp.html"
      fs.copyFileSync( "test/interface/test2.html", filename )
      utils.replace( filename, [ `\\*\\*EMAIL_REPLACE\\*\\*`, `\\*\\*TEL_REPLACE\\*\\*` ], [ "kermit@themuppetshow.com", "01234567890" ] )
      //expect( fs.readFileSync( "test/interface/test.html", { encoding: "utf8", flag: "r" } ) ).to.equal( `<head></head><body>Hello<p>World<p/></body>` )
    } )
  } )
} )