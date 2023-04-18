<h2 align="center">
  🌴 Tree Versatile
</h2>
<h3 align="center">
  A highly versatile tree structure for JavaScript.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/versatile-tree" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/versatile-tree.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/versatile-tree/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/versatile-tree/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/versatile-tree/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>&nbsp;
  <a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>

## Documentation

Read the **[official documentation](https://justinmahar.github.io/versatile-tree/)**.

## Overview

This library contains a highly versatile tree structure for JavaScript.

The `TreeNode` class is simple yet highly versatile: 

- It can store arbitrary `data` and `children` and can be constructed from an object. 
- When not at the root, it can access its siblings, children, and root, and can be searched.
- It can be converted to an object, to JSON, and from JSON easily.

See the Quick Start section below for examples.

> Note: A `Tree` alias exists for `TreeNode` -- in this library, they are interchangeable.

### Features include:

- **🌴 Tree structure in JS**
  - Construct and use tree structures in JavaScript easily.

[lock:donate]::🚫---------------------------------------

## Donate 

If this project helped you, please consider buying me a coffee. Your support is much appreciated!

<a href="https://paypal.me/thejustinmahar/5"><img src="https://justinmahar.github.io/versatile-tree/support/coffee-1.png" alt="Buy me a coffee" height="35" /></a> <a href="https://paypal.me/thejustinmahar/15"><img src="https://justinmahar.github.io/versatile-tree/support/coffee-3.png" alt="Buy me 3 coffees" height="35" /></a> <a href="https://paypal.me/thejustinmahar/25"><img src="https://justinmahar.github.io/versatile-tree/support/coffee-5.png" alt="Buy me 5 coffees" height="35" /></a>

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
npm i versatile-tree
```

## Quick Start

```js
import { TreeNode, Tree } from 'versatile-tree';

const tree = new Tree();
const node = tree.addChildData({id: 1});
node.addChildData({id: 2});
node.addSiblingData({id: 3})

// Convert entire tree to JSON
const treeJson = node.getRoot().toJSON();

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

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/versatile-tree/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/versatile-tree/stargazers): [👉⭐](https://github.com/justinmahar/versatile-tree/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/versatile-tree/?path=/story/license--page).