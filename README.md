# useWindowState

Keep your url in sync with any arbitrary state thats serializable

## Table of Contents

* [Screenshot](#Screenshot)
* [Live Demo](#live-demo)
  * [CodeSandbox](#codesandbox)
* [Install](#install)
* [Usage](#usage)
* [Props](#props)
* [Maintainers](#maintainers)
* [License](#license)

## Live Demo
[![Edit useWindowState (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/usewindowstate-7fkowk)


## Install

#### NPM

```bash
npm install @jjordy/use-window-state
```

#### Yarn

```bash
yarn add @jjordy/use-window-state
```

#### Usage

```typescript
import useWindowSize from "@jjordy/use-window-size";

type MyUrlState = {
  limit: number;
  offset: number;
  query: string;
}

export default function App({ Component, pageProps }) {
  const { state, update } = useWindowSize<MyUrlState>({ initialValues: { limit: 0, offset: 0, query: ''}})
  return (
    <div>
      <Pagination limit={limit} offset={offset} />
    </div>
  );
}
```

#### Props 


| Name  | Type  | Required  | Default |
|---|---|---|---| 
| initialState | `any`  |  no |
| options | `qs options overrides` | {} |

## Maintainers

* Jordan Addison

## License

The MIT License (MIT)

Copyright (c) 2021 Jordan Addison

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.