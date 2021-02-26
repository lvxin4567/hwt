namespace kaayou {
  export class filter {

    static UniqueObjectListByKey(list: Array<Object>, attr , cache? , delOld?) {

      list = lodash.clone(list);

      if(typeof cache==="boolean"){
        delOld = cache;
        cache = null;
      }

      let map = RoadMap(list, attr , cache);
      let morethan1 = [];

      for (let key in map) {
        if (map[key].length > 1) morethan1.push(key);
      }

      morethan1.forEach((v) => {
        let arr = map[v]  
        if(delOld)
            arr = arr.reverse();
        arr = arr.slice(1);
        arr.forEach((v) => {
          remove(list, v);
        });
      });

      return list;

      function remove(list, i) {
        list.splice(i, 1);
      }

      function RoadMap(l, attr , cache) {
        let map = cache || {};
        l.forEach((v, i) => {
          let ir = v[attr];
          let code = hashcode(ir);
          map[code] = map[code] || [];
          map[code].push(i);
        });
        return map;
      }

      function hashcode(key) {
        let chars = key.split("");
        let hash = [];
        let start = 0;
        chars.reduce((v, s) => {
          let n = v + s.charCodeAt();
          hash.push(n);
          return n;
        }, start);
        return hash.map((v) => v.toString(16)).join("");
      }
    }
  }
}
