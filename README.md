
# Unique-combinatorics

# Introduction

With unique Combinatorics you will be able to generate combinations ny elements. Can generate the combinations so that all return values are unique.

example: you have the string "AAB" that you want all the combinations different combinations for, but you don't want "AAB" twice. Then it should look like the following.

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

## `uniques.permutation()`

### `uniques.permutation(items: any[] | String)`

#### Parameters

`items: any[] | String`

##### items: Array

items should be an array of items that can have any value. These are the items which will be placed differently in every iteration.

##### items: String

if you put a string as the item argurment it will split the string essentially if you give it the string `"AAB"` it will convert i to `["A", "A", "B"]` and do exactly the same as if it was an array.

#### Returns

an iterable (Object)

<!-- ## `uniques.permutationUnfiltered` -->
<!-- not ready for documentations -->
