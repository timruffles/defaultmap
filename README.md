# Default Map

A map that gives you a default value if a key is not present. Requires an ES6 runtime. Can be subclassed.

```javascript
var withArray = new DefaultMap([], (map, k) => {
  const xs = []
  map.set(k, xs);
  return xs;
})

withArray.get("someKey").push(1);
withArray.get("someKey") // [1]

// instances of 'MapWithArrays' would perform like `withArray` above
class MapWithArrays extends DefaultMap {
  constructor(members) {
    super(members, (m, k, set) => {
      set([])
    })
  }
}


class Counter extends DefaultMap {
  constructor(members) {
    super(members, () => 0)
  }
  add(k, n) {
    const now = this.get(k) + n;
    this.set(k, now)
    return now;
  }
}

var visits = new Counter;
visits.get("newUser") // 0, not mutating visits

visits.add("newUser", 10)
visits.get("newUser") // 10

```

You control the default operation by providing a function that returns the default value for a key. It's your responsibility to store it, if you'd like. If your default is a mutable value like an array storing it makes sense. If it's a primitive like a number, it's likely better to save space and simply return it.

## API

### DefaultMap(members: enumerable (as per Map), default: (m: Map, k: any, setAndReturn: (v: any) => void) => defaultValue)

Simply pass in a function to create the default value. It will be called with the map and a key that was requested but not found. You can mutate the map if you like. Whatever you return will be returned from `.get(k)`.

Since it's a pretty common pattern to want to mutate and return the value, you may call the third argument, `setAndReturn`. The value passed with be the new value of `.get(k)`, and will be returned. The return value of `default` will be ignored if `setAndReturn` is called.

```javascript
// example of using setAndReturn
var withArray = new DefaultMap([], (_m, _k, set) => set([]))

withArray.get("someKey").push(1);
withArray.get("someKey") // [1]
```

## Install & use

```sh
npm i -S defaultmap
```

```
var DefaultMap = require("defaultmap");
```
