# webpreprocessor

I needed a couple of tools under the same bracket so thought I'll write a custom action for them.

* minify js - using uglify-js
* styl to css
* combining files
* replace


## Minify

```yaml
uses: actions/webpreprocessor@v1.0
with:
  action: 'uglifyjs'
  filename: [ 'in1.js', 'in2.js' ]
```

## Stylus


```yaml
uses: actions/webpreprocessor@v1.0
with:
  action: 'styl'
  filename: [ 'in1.styl', 'in2.styl' ]
```

OR

```yaml
uses: actions/webpreprocessor@v1.0
with:
  action: 'styl'
  filename: 'in1.styl'
  output: 'out.css'
```


## Combine

```yaml
uses: actions/webpreprocessor@v1.0
with:
  action: 'combine'
  filename: [ 'in1.js', 'in2.js' ]
  output: 'combined.js'
```

## Replace

Replace a string ina file with another string.


```yaml
uses: actions/webpreprocessor@v1.0
with:
  action: 'replace'
  filename: 'index.html'
  regexs: [ 'combined.js' ]
  replaces: [ 'world' ]
```