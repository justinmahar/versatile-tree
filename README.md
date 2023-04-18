<h2 align="center">
  🌴 Tree Lib
</h2>
<h3 align="center">
  A library for manipulating tree structures in JavaScript.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/tree-lib" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/tree-lib.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/tree-lib/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/tree-lib/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/tree-lib/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>&nbsp;
  <a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>

## Documentation

Read the **[official documentation](https://justinmahar.github.io/tree-lib/)**.

## Overview

This section will contain an overview so people can have a high-level understanding of the project.

### Features include:

- **🌴 Tree structure in JS**
  - Construct and use tree structures in JavaScript easily.

[lock:donate]::🚫---------------------------------------

## Donate 

If this project helped you, please consider buying me a coffee. Your support is much appreciated!

<a href="https://paypal.me/thejustinmahar/5"><img src="https://justinmahar.github.io/tree-lib/support/coffee-1.png" alt="Buy me a coffee" height="35" /></a> <a href="https://paypal.me/thejustinmahar/15"><img src="https://justinmahar.github.io/tree-lib/support/coffee-3.png" alt="Buy me 3 coffees" height="35" /></a> <a href="https://paypal.me/thejustinmahar/25"><img src="https://justinmahar.github.io/tree-lib/support/coffee-5.png" alt="Buy me 5 coffees" height="35" /></a>

[/lock:donate]::---------------------------------------🚫

## Table of Contents 

- [Documentation](#documentation)
- [Overview](#overview)
  - [Features include:](#features-include)
- [Donate](#donate)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [TypeScript](#typescript)
- [Icon Attribution](#icon-attribution)
- [Contributing](#contributing)
- [⭐ Found It Helpful? Star It!](#-found-it-helpful-star-it)
- [License](#license)

## Installation

```
npm i tree-lib
```

## Quick Start

```js
import { TreeNode, Tree } from 'tree-lib';

const tree = new Tree();
const node = tree.addChildData({id: 1});
node.addChildData({id: 2});

// Convert to JSON
const treeJson = node.toJSON();

// Build tree from JSON
const builtTree = TreeNode.fromJSON(treeJson);
```

[lock:typescript]::🚫---------------------------------------

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

[/lock:typescript]::---------------------------------------🚫

[lock:icon]::🚫---------------------------------------

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

[/lock:icon]::---------------------------------------🚫

[lock:contributing]::🚫---------------------------------------

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

[/lock:contributing]::---------------------------------------🚫

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/tree-lib/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/tree-lib/stargazers): [👉⭐](https://github.com/justinmahar/tree-lib/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/tree-lib/?path=/story/license--page).