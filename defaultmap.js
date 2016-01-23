/**
 * map which returns a default value if
 * no entry is present for a key
 *
 * ```javascript
 * var arrays = new DefaultMap([], function(all, k) {
 *  // in this case we want to set the key so any mutations show up in next access
 *	return all.set(k, []);
 * })
 *
 * arrays.get("foo") != array.get("bar") // true, two different arrays
 * arrays.size() // 2
 *
 * arrays.get("foo").push("a")
 * arrays.get("foo")[0] // "a"
 *
 *
 * var counter = new DefaultMap([], function(all, k) {
 *  // here we don't both setting the default, which saves space
 *	return 0;
 * })
 *
 * counter.get("foo") // 0
 * ```
 *
 */
"use strict";

const NOT_PROVIDED = {};

class DefaultMap extends Map {
	constructor(members, defaulter) {
		super(members);
    if(typeof defaulter !== 'function') {
      throw new TypeError("DefaultMap requires a defaulter function");
    }
		this._default = defaulter;
	}

	get(k) {
		if(this.has(k)) {
      return super.get(k);
    } else {
      var setAndReturn = NOT_PROVIDED;
      const v = this._default(this, k, (set) => {
        setAndReturn = set;
      });

      if(setAndReturn === NOT_PROVIDED) {
        return v;
      } else {
        this.set(k, setAndReturn);
        return setAndReturn;
      }
    }
	}
};



module.exports = exports = DefaultMap;

