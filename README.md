
# Unique-combinatorics

# Introduction

With unique Combinatorics you will be able to generate combinations of any elements. Can generate the combinations so that all return values are unique.

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

### Example 1

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

### Example 2

```javascript
const uniques = require('unique-combinatorics');

const u = uniques.permutation([0, "A", 2, 3]);

console.log(u.next().value); // [0, "A", 2, 3]
console.log(u.next().value); // [0, "A", 3, 2]
```

### Example 3

In this example it looks like you get the same combination twice, but because both arrays have different references they act like they are different. But if you use the same reference again, the second won't be unique and as you see in the example there is only one combination.

```javascript
const uniques = require('unique-combinatorics');

//both arrays have unique references
const arr1 = ["A", "B"];
const arr2 = ["A", "B"];
const u = uniques.permutation([arr1, arr2]);
const u2 = uniques.permutation([arr1, arr1]);

for (let cmb of u) {
  console.log(cmb);
}

//logs:
/*
** ["A", "B"], ["A", "B"]
** ["A", "B"], ["A", "B"]
*/

for (let cmb of u2) {
  console.log(cmb);
}
// Both arrays have the same reference
//logs:
/*
** ["A", "B"], ["A", "B"]
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
