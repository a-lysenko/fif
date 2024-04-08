export function fif<T extends any>(statement: any, ifCallback: () => T): T | undefined;
export function fif<T extends any, U extends any>(statement: any, ifCallback: () => T, elseCallback: () => U): T | U;
export function fif<T extends any, U extends any>(statement: any, ifCallback: () => T, elseCallback?: () => U) {
  return statement ? ifCallback() : elseCallback?.();
}
