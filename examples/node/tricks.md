# Tricks Example

## Trick 1

```js
// example.js
module.exports = function(param) {
    console.log("Param 1", param); 
    return function(nesParam) {
        console.log("Param 2", nesParam)
    }
}

module.exports({
    a: 10
})({
    b: 20
});

// index.js
require('import')({
    c: 30
})

// output
Param 1 { a: 10 }
Param 2 { b: 20 }
Param 1 { c: 30 }
```