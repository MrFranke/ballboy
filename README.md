# Ballboy
Simple file loader. 

You don't need define protocol of loadable file – just say where 
file located and Ballboy give it to you. 

Supported protocols: `HTTP`, `HTTPS`, `File path`, `file://`.

### Example:
```js
const ballboy = require('ballboy');
const executeConfig = config => console.log(JSON.parse(config));

ballboy('./path/to/config.json').then(executeConfig);
ballboy('http://config.io/config.json').then(executeConfig);
ballboy('https://config.io/config.json').then(executeConfig);
``` 

You can pass http config for authentication, headers e.t.c.

```js
ballboy.HTTPConfig = {
  headers: {
    'Authentication': 'Bearer token',
    'X-Custom-Header': 'foo'
  }
}
```
