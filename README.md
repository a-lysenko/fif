# fifel
_Stands for "**F**unctional **If**..**El**se"._

# Feature

A helper function gives a functional "if" statement. Gives a unified output for both truthy/falsy branches.
**"const over let"** fans, you are welcome! 😎

# Install

```sh
npm install fifel
```

# Usage

## Basic

### `if..else` example

```js
import { fif } from 'fifel';

const result = fif(
  Math.random() > 0.5,
  () => 'truthy',
  () => 'falsy'
);
```

### `if` only example

`else` branch is optional. If you don't need it, you can skip it:

```js
import { fif } from 'fifel';
const result = fif(
  Math.random() > 0.5,
  () => {
    // some logic
    return 'truthy';
  }
);
```

## Advanced

This way, we use `const` instead of `let` for the result variable you expect to get. 
It is more helpful when statements in `if` and `else` branches include multiple steps before the result is assigned or even some after that. With `fif` it is better structured:

```js
import { fif } from 'fifel';
function getSomeFuits(amount = 5) {
  const fruits = fif(
    isEnoughInStock(amount),
    () => {
      const result = getFruitsFromStock(amount);
      if (needToRefillStock()) {
        const amountToRefill = getAmountToRefill();
        stickANoteOnTheStock(`Please refill the stock (${amountToRefill} pcs)!`);
      }
      return {
        fromStock: amount,
        fromSupplier: 0,
        full: true
      };
    },
    () => {
      const amountOnStock = getAmountOnStock();
      const fromStock = getFruitsFromStock(amountOnStock);
      stickANoteOnTheStock(`Stock is empty! Please refill!`);
      const fromSupplier = getFruitsFromSupplier(amount - fromStock);
      
      return { 
        fromStock,
        fromSupplier,
        full: fromStock + fromSupplier === amount
      };
    }
  )
}
```
Within the same logic, using `if..else` and `let result` would be less readable and assignment to `result` could be lost in lines of code.

## TypeScript
`fif` function is typed. You can use it with TypeScript as well.
In previous examples, `result` types are inferred are perfectly inferred.

### `if..else`

```ts
import { fif } from 'fifel';
// transport type is inferred as Car | Bike ✅
const transport = fif(
  readyToGo(),
  () => {
    // some logic
    return getCarFromGarage(); // returns Car
  },
  () => {
    return buyBike(); // returns Bike
  }
);
```

### `if` only

 ```ts
import { fif } from 'fifel';
// transport type is inferred as Car | undefined ✅
const transport = fif(
  readyToGo(),
  () => {
    // some logic
    return getCarFromGarage(); // returns Car
  }
);
 ```

# License

[MIT](LICENSE)
