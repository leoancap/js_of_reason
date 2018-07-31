# Basic Reason Template

This module converts a snippet of reasonML to javascript.

# Example

```
const jsOfReason = require("js-of-reason")
const reasonCode = `let add = (a,b) => {
  a + b;
}`

jsOfReason(reasonCode, (error, jsCode) => {
  if(error){
    console.log(error)
  } else {
    console.log(jsCode)         // function add(a, b) {
                                //   return a + b | 0;
                                // }
  }
})

const codeWithError = `let add = (a,b) => {
  a + b + "2";
}`

jsOfReason(codeWithError, (error, jsCode) => {
  if(error){
    console.log(error)          // <type error>
                                //   1 │ let add = (a,b) => {
                                //   2 │   a + b + "2";
                                //   3 │ }
                                //   This has type:
                                //     string
                                //   But somewhere wanted:
                                //     int
  } else {
    console.log(jsCode)
  }
})
```
