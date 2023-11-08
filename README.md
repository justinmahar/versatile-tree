<h2 align="center">
  🌴 Versatile Tree
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
- **🔁 Easy conversion to/from JSON**
  - Easily convert the entire tree, or a subsection, to and from JSON.
- **🎯 Node paths and selection paths**
  - Get a path array to any node, and get selection paths for selecting nodes in trees without node IDs.
- **🆔 IDs are optional**
  - Versatility is the name of the game. This tree library supports nodes without IDs!
- **👨‍👩‍👧‍👦 Sibling support**
  - Get left/right siblings, or add a sibling at any index. Full sibling support!
- **🔍 Find and walk**
  - Find nodes by ID or custom logic, and walk the tree, visiting every node.
- **📄 Deep cloning**
  - Easily deep clone the entire tree, or any tree node.
- **✨ Much more!**
  - See the full API below!

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
- [TreeNode/Tree API](#treenodetree-api)
  - [Class Functions](#class-functions)
    - [Constructor](#constructor)
    - [getData](#getdata)
    - [getChildrenPropertyName](#getchildrenpropertyname)
    - [hasParent](#hasparent)
    - [isRoot](#isroot)
    - [equals](#equals)
    - [isDescendantOf](#isdescendantof)
    - [isAncestorOf](#isancestorof)
- [| `node` | The node to check. |](#-node--the-node-to-check-)
    - [addChildNode](#addchildnode)
    - [addChildData](#addchilddata)
    - [getNodePath](#getnodepath)
    - [getSelectionPath](#getselectionpath)
    - [selectNode](#selectnode)
    - [getChildren](#getchildren)
    - [hasChildren](#haschildren)
    - [getFirstChild](#getfirstchild)
    - [getLastChild](#getlastchild)
    - [hasChild](#haschild)
    - [removeChild](#removechild)
    - [removeParent](#removeparent)
    - [getSiblings](#getsiblings)
    - [getSiblingCount](#getsiblingcount)
    - [isOnlyChild](#isonlychild)
    - [getFirstSibling](#getfirstsibling)
    - [getLastSibling](#getlastsibling)
    - [getLeftSibling](#getleftsibling)
    - [getRightSibling](#getrightsibling)
    - [addSiblingNode](#addsiblingnode)
    - [addSiblingData](#addsiblingdata)
    - [getIndex](#getindex)
    - [indexOfChild](#indexofchild)
    - [indexOfSibling](#indexofsibling)
    - [getParent](#getparent)
    - [isParent](#isparent)
    - [setParent](#setparent)
    - [getRoot](#getroot)
    - [findFirst](#findfirst)
    - [findAll](#findall)
    - [findById](#findbyid)
    - [walk](#walk)
    - [toObject](#toobject)
    - [toJSON](#tojson)
    - [clone](#clone)
  - [Static Functions](#static-functions)
    - [fromJSON](#fromjson)
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

## TreeNode/Tree API

A `Tree` simply extends `TreeNode` and can be used as the root node. Both share the same API, defined below.

### Class Functions

#### Constructor

```ts
new Tree(data: Record<string, any> = {}, options: TreeNodeOptions = TreeNode.defaultTreeNodeOptions)
```

Construct a new TreeNode using the provided data. The data can include arbitrary properties with an optional children array.
The default property name for the array of children is `"children"`. This can be customized via `options.childrenPropertyName`.

The constructor will recursively create TreeNodes for all children. All other properties will be stored as data for each node.

For example, given a nested object such as:

```js
{ id: 1, children: [
    { id: 2 },
    { id: 3, children: [
        { id: 4 },
        { id: 5 }
      ]
    }
  ]
}
```

In this case, each node will have data containing the `id` property, and all children will be turned into TreeNodes themselves.

To turn the TreeNode back into an object at a later time, use `toObject()`, and to turn it into a JSON string, use `toJSON()`.
To construct a TreeNode from JSON, use `TreeNode.fromJSON()`.

| Param     | Description                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `data`    | Optional. An object containing data for the node, plus optional children with subnodes.                                    |
| `options` | Optional (pun intended). The options for the TreeNode. Falls back on `TreeNode.defaultTreeNodeOptions` when not specified. |

#### getData

```ts
getData()
```

Return the data for this node, without the children property.

To get data and all descendants, including children, for this node, use `toObject()`.

| Returns                                                |
| ------------------------------------------------------ |
| The data for this node, without the children property. |

#### getChildrenPropertyName

```ts
getChildrenPropertyName()
```
Returns the property name used for children.

| Returns                              |
| ------------------------------------ |
| The property name used for children. |

#### hasParent

```ts
hasParent(): boolean
```

Returns true if this node has a parent, false otherwise.

When a node has no parent, it is the root. You can also use `isRoot()` to check for this case.

| Returns                                          |
| ------------------------------------------------ |
| True if this node has a parent, false otherwise. |

#### isRoot

```ts
isRoot(): boolean
```
Returns true if this node is the root (has no parent), false otherwise.

When a node has a parent, it is not the root. You can also use `hasParent()` to check for this case.

| Returns                                                         |
| --------------------------------------------------------------- |
| True if this node is the root (has no parent), false otherwise. |

#### equals

```ts
equals(node: TreeNode): boolean
```

Returns true if the provided node is equal to this node.

This operation uses the equals function provided in the TreeNode options, and uses `===` equality by default when an equals function is not specified.

| Param  | Description                     |
| ------ | ------------------------------- |
| `node` | The node to check for equality. |

| Returns                                          |
| ------------------------------------------------ |
| True if the provided node is equal to this node. |

#### isDescendantOf

```ts
isDescendantOf(node: TreeNode)
```

Returns true if this node is a descendant of, or below, the provided node. False otherwise.

| Param  | Description        |
| ------ | ------------------ |
| `node` | The node to check. |

| Returns                                                                             |
| ----------------------------------------------------------------------------------- |
| True if this node is a descendant of, or below, the provided node. False otherwise. |

#### isAncestorOf

```ts
isAncestorOf(node: TreeNode)
```
Returns true if this node is an ancestor of, or above, the provided node. False otherwise.

| Param  | Description        |
| ------ | ------------------ |
| `node` | The node to check. |
- 
| Returns                                                                            |
| ---------------------------------------------------------------------------------- |
| True if this node is an ancestor of, or above, the provided node. False otherwise. |

#### addChildNode

```ts
addChildNode(node: TreeNode, index?: number, allowCircularReferences?: boolean)
```

Adds the provided node as a child of this node. If the provided node already has a parent, it will first be removed from its previous parent.

You can specify an optional index at which to insert the child. If no index is provided, the child will be added to the end.

In addition, if the provided node is an ancestor to this node, this node will be removed from its parent before adding the node as a child.
This prevents adding an ancestor as a child to create a loop, also known as a circular reference.
You disable this protection by setting `allowCircularReferences` to true.

| Param                     | Description                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `node`                    | The node to add as a child.                                                                           |
| `index`                   | Optional. The index at which to insert the child. If `undefined`, the child will be added to the end. |
| `allowCircularReferences` | Optional. Set to `true` to allow circular references.                                                 |

#### addChildData

```ts
addChildData(data: Record<string, any> = {}, index?: number): TreeNode
```
Creates a TreeNode with the data provided and adds it as a child. Returns the newly created TreeNode.

| Param   | Description                                                                              |
| ------- | ---------------------------------------------------------------------------------------- |
| `data`  | The child data. A new node will be created from this data.                               |
| `index` | The index at which to add the child. Pass `undefined` to add to the end of the children. |

| Returns                     |
| --------------------------- |
| The newly created TreeNode. |

#### getNodePath

```ts
getNodePath(): TreeNode[]
```

Returns an array containing all nodes in the tree leading to this one, starting with the root.

| Returns                                                                                |
| -------------------------------------------------------------------------------------- |
| An array containing all nodes in the tree leading to this one, starting with the root. |

#### getSelectionPath

```ts
getSelectionPath(): number[]
```


Return an array of sibling index positions of all nodes leading to this one.
This includes the root, which will always be the first item in the array with an index of `0`, as root siblings are prohibited.

You can then use `selectNode(selectionPath)` to select this node at a later time. This is useful if your nodes do not have an ID and you want to reselect a node
at a later time, or if your tree is large. It is much faster than a `find()` operation.
The speed of selection is constant time, O(1), as you know exactly where to find the node.

For example, given a tree with the data:

```js
{ id: 1, children: [
    { id: 2 },
    { id: 3, children: [
        { id: 4 },
        { id: 5 }
      ]
    }
  ]
}
```

The selection path for the node with `id: 4` would be:

```js
[0, 1, 0]
```

Selecting the node using this path is nearly instantaneous.

| Returns                                                               |
| --------------------------------------------------------------------- |
| An array of sibling index positions of all nodes leading to this one. |

#### selectNode

```ts
selectNode(selectionPath: number[]): TreeNode | undefined
```

Returns the TreeNode at the provided selection path, or `undefined` if the node at the provided selection path is not found.

A selection path is an array of sibling index positions of all nodes leading to the desired node.
This includes the root, which will always be the first item in the array with an index of `0`, as root siblings are prohibited.

This is useful if your nodes do not have an ID and you want to reselect a node
at a later time, or if your tree is large. It is much faster than a `find()` operation.
The speed of selection is constant time, O(1), as you know exactly where to find the node.

See `getSelectionPath()` for more.

| Param           | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `selectionPath` | The selection path for the TreeNode as an array of sibling indexes leading to the desired node. |

| Returns                                             |
| --------------------------------------------------- |
| The selected TreeNode, or `undefined` if not found. |

#### getChildren

```ts
getChildren(): TreeNode[]
```
Returns the children for this node.

| Returns                     |
| --------------------------- |
| The children for this node. |

#### hasChildren

```ts
hasChildren(): boolean
```
Returns true if this node has children. False otherwise.

| Returns                                          |
| ------------------------------------------------ |
| True if this node has children. False otherwise. |

#### getFirstChild

```ts
getFirstChild(): TreeNode | undefined
```

Returns the first child in this node's list of children, or `undefined` if there are no children.

| Returns                                                                                   |
| ----------------------------------------------------------------------------------------- |
| The first child in this node's list of children, or `undefined` if there are no children. |

#### getLastChild

```ts
getLastChild(): TreeNode | undefined
```

Returns the last child in this node's list of children, or `undefined` if there are no children.

| Returns                                                                                  |
| ---------------------------------------------------------------------------------------- |
| The last child in this node's list of children, or `undefined` if there are no children. |

#### hasChild

```ts
hasChild(node: TreeNode)
```

Returns true if this node has the provided node in its direct list of children. False otherwise.

You can use `isDescendant(node)` to check for a child relationship along the entire tree hierarchy.

| Param  | Description             |
| ------ | ----------------------- |
| `node` | The node to search for. |

| Returns                                                                                  |
| ---------------------------------------------------------------------------------------- |
| True if this node has the provided node in its direct list of children. False otherwise. |

#### removeChild

```ts
removeChild(node: TreeNode): boolean
```


Removes the provided node from this node's list of children and sets the provided node's parent to `undefined`.

Returns `true` if the node was successfully removed. Returns `false` if the node was not found.

| Param  | Description         |
| ------ | ------------------- |
| `node` | The node to remove. |

| Returns                                                  |
| -------------------------------------------------------- |
| True if the node was removed. False if it was not found. |

#### removeParent

```ts
removeParent(): boolean
```


Removes this node from its parent and sets this node's parent to `undefined`.

Returns `true` if this node was successfully removed from its parent, `false` otherwise.

| Returns                                                         |
| --------------------------------------------------------------- |
| True if this node was removed from its parent, false otherwise. |

#### getSiblings

```ts
getSiblings(): TreeNode[]
```
Returns an array of all siblings for this node.

| Returns                                 |
| --------------------------------------- |
| An array of all siblings for this node. |

#### getSiblingCount

```ts
getSiblingCount(): number
```

Returns the number of siblings this node has including itself.

| Returns                                                |
| ------------------------------------------------------ |
| The number of siblings this node has including itself. |

#### isOnlyChild

```ts
isOnlyChild(): boolean
```

Returns true if this node is an only child (has no other siblings), false otherwise.

| Returns                                                                      |
| ---------------------------------------------------------------------------- |
| True if this node is an only child (has no other siblings), false otherwise. |

#### getFirstSibling

```ts
getFirstSibling(): TreeNode
```

Returns the first sibling in this node's list of siblings.

| Returns                                            |
| -------------------------------------------------- |
| The first sibling in this node's list of siblings. |

#### getLastSibling

```ts
getLastSibling(): TreeNode
```

Returns the last sibling in this node's list of siblings.

| Returns                                           |
| ------------------------------------------------- |
| The last sibling in this node's list of siblings. |

#### getLeftSibling

```ts
getLeftSibling(): TreeNode | undefined
```

Returns the sibling to the left of this node, or `undefined` if there is none.

| Returns                                                                |
| ---------------------------------------------------------------------- |
| The sibling to the left of this node, or `undefined` if there is none. |

#### getRightSibling

```ts
getRightSibling(): TreeNode | undefined
```
Returns the sibling to the right of this node, or `undefined` if there is none.

| Returns                                                                 |
| ----------------------------------------------------------------------- |
| The sibling to the right of this node, or `undefined` if there is none. |

#### addSiblingNode

```ts
addSiblingNode(node: TreeNode, index?: number)
```

Adds the provided node as a sibling to this node. You can specify an optional sibling index for the insertion, otherwise the sibling will be added to the end.

If you attempt to call this function at the root, an error will be thrown, as root nodes cannot have siblings.
To prevent this, use `isRoot()` to check if you're at the root.

| Param   | Description                              |
| ------- | ---------------------------------------- |
| `node`  | The node to add as a sibling.            |
| `index` | Optional. The index for the new sibling. |

| Errors Thrown                          |
| -------------------------------------- |
| Throws an error if called at the root. |

#### addSiblingData

```ts
addSiblingData(data: Record<string, any> = {}, index?: number): TreeNode
```


Creates a TreeNode with the data provided and adds it as a sibling. Returns the newly created TreeNode.

If you attempt to call this function at the root, an error will be thrown, as root nodes cannot have siblings.
To prevent this, use `isRoot()` to check if you're at the root.

| Param   | Description                                                                                |
| ------- | ------------------------------------------------------------------------------------------ |
| `data`  | The sibling data. A new node will be created from this data.                               |
| `index` | The index at which to add the sibling. Pass `undefined` to add to the end of the siblings. |

| Returns                     |
| --------------------------- |
| The newly created TreeNode. |

#### getIndex

```ts
getIndex(): number
```
Returns this node's index among its siblings.

Note: The root will always have an index of `0`.

| Returns                               |
| ------------------------------------- |
| This node's index among its siblings. |

#### indexOfChild

```ts
indexOfChild(node: TreeNode): number
```

Returns the index of the provided node in this node's list of children, or `-1` if it is not found.

| Param  | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| `node` | The node for which to find the index in this node's list of children. |

| Returns                                                                                     |
| ------------------------------------------------------------------------------------------- |
| The index of the provided node in this node's list of children, or `-1` if it is not found. |

#### indexOfSibling

```ts
indexOfSibling(node: TreeNode): number
```

Returns the index of the provided node in this node's list of siblings, or `-1` if it is not found.

| Param  | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| `node` | The node for which to find the index in this node's list of siblings. |

| Returns                                                                                     |
| ------------------------------------------------------------------------------------------- |
| The index of the provided node in this node's list of siblings, or `-1` if it is not found. |

#### getParent

```ts
getParent(): TreeNode | undefined
```
Returns the parent of this node, or `undefined` if there is none.

| Returns                                                   |
| --------------------------------------------------------- |
| The parent of this node, or `undefined` if there is none. |

#### isParent

```ts
isParent(node: TreeNode)
```
Returns true if the provided node is this node's direct parent, false otherwise.

You can use `isAncestor(node)` to check for a parental relationship along the entire tree hierarchy.

| Param  | Description        |
| ------ | ------------------ |
| `node` | The node to check. |

| Returns                                                                  |
| ------------------------------------------------------------------------ |
| True if the provided node is this node's direct parent, false otherwise. |

#### setParent

```ts
setParent(parent: TreeNode | undefined): void
```
Sets the provided node as the parent of this node. If `parent` is `undefined`, this node will be removed from its parent.

| Param    | Description                        |
| -------- | ---------------------------------- |
| `parent` | The node to set as the new parent. |

#### getRoot

```ts
getRoot(): TreeNode
```

Returns the root node at the top of the tree hierarchy.

| Returns                                         |
| ----------------------------------------------- |
| The root node at the top of the tree hierarchy. |

#### findFirst

```ts
findFirst(predicate: (node: TreeNode) => boolean, rightToLeft?: boolean): TreeNode | undefined
```

Searches the tree node and its children for the first node that passes the test defined by the matcher function provided.

The found node is returned. If not found, `undefined` is returned.

The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.

| Param         | Description                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `predicate`   | A function used to match the node being searched for. This function is passed a node and returns true if the node is a match. |
| `rightToLeft` | Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal.                     |

| Returns                                      |
| -------------------------------------------- |
| The found node, or `undefined` if not found. |

#### findAll

```ts
findAll(predicate: (node: TreeNode) => boolean, rightToLeft?: boolean): TreeNode[]
```

Searches the tree node and its children for all nodes that pass the test defined by the matcher function provided.

The found nodes are returned as an array of TreeNode.

The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.

| Param         | Description                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `predicate`   | A function used to match the nodes being searched for. This function is passed a node and returns true if the node is a match. |
| `rightToLeft` | Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal.                      |

| Returns                                          |
| ------------------------------------------------ |
| A `TreeNode[]` array containing all found nodes. |

#### findById

```ts
findById(id: any, idPropertyName = 'id', rightToLeft?: boolean): TreeNode | undefined
```

Finds and returns the node with the provided id (using `===` comparison), or returns `undefined` if not found.

Uses "id" as the property name by default, or you can provide the ID property name using
the `idPropertyName` argument.

The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.

| Param            | Description                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `id`             | The node ID to search for.                                                                                |
| `idPropertyName` | Optional. The property name of the ID. Defaults as "id".                                                  |
| `rightToLeft`    | Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal. |

| Returns                                                     |
| ----------------------------------------------------------- |
| The node with the provided id, or `undefined` if not found. |

#### walk

```ts
walk(visit: (node: TreeNode) => boolean | void, rightToLeft?: boolean): boolean
```

Walk the tree node and its children, calling the visit function on each node.

If the visit function returns true at any point, walking is aborted.

The walk algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.

| Param         | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `visit`       | A visit function called on every node traversed. If the visit function returns true at any point, walking is aborted. |
| `rightToLeft` | Optional. When true, it will traverse the tree using depth-first right-to-left preorder traversal.                    |

| Returns                                             |
| --------------------------------------------------- |
| True if the traversal was aborted, false otherwise. |

#### toObject

```ts
toObject(): Record<string, any>
```

Returns an object containing the tree node data including all nested children.

Note: Parents, if any, are not included.

| Returns                                                                |
| ---------------------------------------------------------------------- |
| An object containing the tree node data including all nested children. |

#### toJSON

```ts
toJSON(): string
```

Returns a JSON string of an object containing the tree node data including all nested children.
Parents, if any, are not included.

This is accomplished by stringifying the tree node's `toObject()` value.
As such, all data in the tree node must support `JSON.stringify()` or an error will be thrown.

@see You can use `TreeNode.fromJSON()` to construct a tree node from the resulting JSON output.
@see If you'd like to clone the tree node, you can simply use `clone()` which converts to JSON and back to a TreeNode for you.

| Returns                                                                                 |
| --------------------------------------------------------------------------------------- |
| A JSON string of an object containing the tree node data including all nested children. |

| Errors Thrown                                                                            |
| ---------------------------------------------------------------------------------------- |
| An error if the tree node data cannot be converted to a string using `JSON.stringify()`. |

#### clone

```ts
clone(): TreeNode
```

Returns a deep clone of the tree node, including all children. Parents, if any, are not included.

This is accomplished by stringifying the tree node's `toObject()` value, and then parsing the resulting JSON string to create an entirely new tree node.
As such, all data in the tree node must support `JSON.stringify()` or an error will be thrown.

| Returns                                                |
| ------------------------------------------------------ |
| A deep clone of the tree node, including all children. |

| Errors Thrown                                          |
| ------------------------------------------------------ |
| An error if `JSON.stringify()` fails on the tree node. |

### Static Functions

#### fromJSON

```ts
TreeNode.fromJSON(dataString: string, options: TreeNodeOptions = TreeNode.defaultTreeNodeOptions): TreeNode
```

Parses the provided data string, which contains an object with nested children, and creates a tree node from the resulting parsed object.

JSON example:

```json
{
  "id": 1,
  "children": [{ "id": 2 }, { "id": 3, "children": [{ "id": 4 }, { "id": 5 }] }]
}
```

| Param        | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `dataString` | The JSON data string containing an object with nested children. |
| `options`    | Optional. The options for the TreeNode.                         |

| Returns                                      |
| -------------------------------------------- |
| A TreeNode constructed from the parsed JSON. |

| Errors Thrown                   |
| ------------------------------- |
| An error if JSON parsing fails. |





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