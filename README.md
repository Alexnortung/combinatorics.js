# unique-combinatorics
# introduction
generates combinations of an array-like type (such as String or Arrays that has a .length). Can generate the combinations so that all return values are unique.

example: you have the string "AAB" and you want all the combinations that are
not the same. So what you will get is
```javascript
[
  [ 'A', 'A', 'B' ],
  [ 'A', 'B', 'A' ],
  [ 'B', 'A', 'A' ]
]
```

# Basic usage
## Installation
`npm install --save unique-combinatorics`

## Getting started
```javascript
const uniques = require('unique-combinatorics');

const u = uniques.permutation("AAB");

for (let cmb of u) {
  console.log(cmb);
}

//logs:
/*
** [ 'A', 'A', 'B' ],
** [ 'A', 'B', 'A' ],
** [ 'B', 'A', 'A' ]
*/

```

# Documentation

## `uniques.permutation(items: array-like)`
Example shown above



<!-- ## `uniques.permutationUnfiltered` -->
<!-- not ready for documentations -->
