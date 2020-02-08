# persist-state

> Persist react state after page refresh

[![NPM](https://img.shields.io/npm/v/persist-state.svg)](https://www.npmjs.com/package/persist-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intruduction
This is a library to provide a persistable state with React Hooks.
It has following characteristics.

-   Persist state after page refresh.
    -   The library cares the state object is persisted after the page has refresh.
-   State persist criteria can be configured
    -   By default state will be persisted only when page is refreshed for the browser session (like sessionStorage).
    -   It can be configure so that the state will be persisted after the component is unmounted.
    -   It can be configured so that the state will be persisted across the browser sessions (like localStorage).
-  The hook is basically a wrapper for useState hook.
   -  It has similar api like useState hook expects it accepts extra parameter that is config object. 


## Install

```bash
npm install --save persist-state
```

## Usage
 ### without configuration using only key

```jsx
import React, { Component } from 'react'

import { usePersistState } from 'persist-state'

const Example = () => {
  const [count, setCount] = usePersistState(0, 'count')
  return (
    <div>
      Counter: {count}

      <button onClick={() => setCount((count) =>(count+1))}> Increment</button>

      <button onClick={() => setCount((count) =>(count-1))}> Decrement</button>
    </div>
  )
}
```

### with configuration

```jsx
import React, { Component } from 'react'

import { usePersistState } from 'persist-state'

const Example = () => {
  const [count, setCount] = usePersistState(0, {
    key: "count",
    persistOnUnmount: false,
    persistAcrosSession: true
  })

  return (
    <div>
      Counter: {count}

      <button onClick={() => setCount((count) =>(count+1))}> Increment</button>

      <button onClick={() => setCount((count) =>(count-1))}> Decrement</button>
    </div>
  )
}
```

## API

### usePersistState:
   It has almost similar api like useState hook, except it accepts extra parameter. 

#### Return:
  It returns a pair of values: the current state and a function that updates it.

-   `state`: a custom hook works like React.useState
-   `setState`: a function to set a state like React.useState

#### Parameters:

-   `initialState`: **State** like React.useState. It also supports lazy initialization.
-   `config`: This is a config, it can be either object or a string.
    - `string`:  To use default configuration only pass the key as string which should be unique in the project. It is mandatory to pass the key. One possible approach to create a unique key is `componentName-variableName`.
    -  `object`: To configure the default behavior use following configuration fields.
       - `key`: This is unique string and **mandatory field**.
       - `persistAcrosSession`: This is optional and it's default value is `false`. Use this configuration key when you want persist the state across the session. The state will be stored permantly on user browser. One possible use case may to store the theme choose by user.
         - There are two possible values `true` and `false`
           - `true`: persist state across the sessions
           - `false`: persist state during the browser session.
       - `persistOnUnmount`: This is optional and it's default value is `false`. Use this configuration key when you want to presist the state when component is unmounted.
         - There are two possible values `true` and `false`
           - `true`: persist state even after component is unmounted.
           - `false`: doesn't persist state after component is unmounted.


## License

MIT © [Deepak Bansode](https://github.com/deepakvbansode/react-persist-state.git)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
