# Malicious example

- Zip app.js file

> Description:

Execute this malicious > Open the page on browser, with file_path as parameter

```js
cp.exec(
    'gzip ' + req.query.file_path,
    function (err, data) {
        console.log('err: ', err)
        console.log('data: ', data);
        // res.send('Hello World!')
    }
);
```

> Preventing Command Injection

Use EXECFILE or SPAWN instead of EXEC
spawn and execFile method signatures force developers to separate the command and its arguments
Input validation
Limit user privileges
