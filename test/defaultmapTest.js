"use strict";

const assert = require("chai").assert;

const DefaultMap = require("../defaultmap");

describe('DefaultMap', function() {

  it("can't be used without defaulter", function() {
    assert.throws(function() {
      new DefaultMap; 
    });
  })

  it("calls defaulter if key is not present", function() {
    var m = new DefaultMap(null, () => 42);
    assert.equal(m.get("k"), 42);
  })

  it("calls default with map, to allow setting", function() {
    var m = new DefaultMap(null, (m, k) => { m.set(k, 42); return 42 });
    m.get("k");
    assert.equal(m.get("k"), 42);
  })

  it(".get with default value returns whatever defaulter returned", function() {
    var m = new DefaultMap(null, (m, k) => "defaulter");
    assert.equal(m.get("k"), "defaulter");
  })

  describe('README examples', function() {
      
    describe('one', function() {
      var withArray;
      beforeEach(function() {
        withArray = new DefaultMap([], (map, k) => {
          const xs = []
          map.set(k, xs);
          return xs;
        })
      })

      it('allows immediate push', function() {
        withArray.get("someKey").push(1);
      })

      it('has stored value', function() {
        withArray.get("someKey").push(1);
        assert.sameMembers(withArray.get("someKey"), [1]);
      })
        
    })

    describe('two', function() {
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


      var visits;

      beforeEach(function() {
        visits = new Counter;
      })

      it("works re default", function() {
        assert.equal(visits.get("any"), 0);
      })

      it("doesn't mutate implicitly", function() {
        visits.get("newUser") // 0, not mutating visits
        assert.equal(visits.size, 0);
      })

      it("works re adding", function() {
        visits.add("newUser", 10)
        assert.equal(visits.get("newUser"), 10);
      })
    })



  })
    
  describe('setAndReturn', function() {
    var withArray;
    beforeEach(function() {
      withArray = new DefaultMap([], (map, k, setAndReturn) => setAndReturn([]))
    })

    it('allows immediate push', function() {
      withArray.get("someKey").push(1);
    })

    it('has stored value', function() {
      withArray.get("someKey").push(1);
      assert.sameMembers(withArray.get("someKey"), [1]);
    })
      
  })
})
