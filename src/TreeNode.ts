/* eslint-disable @typescript-eslint/no-this-alias */

/**
 * A TreeNode can be used to build a tree structure in JavaScript.
 *
 * Each node contains arbitrary data, children, and accessor and mutator methods for reading and manipulating
 * tree nodes.
 *
 * In addition to basic accessors and mutators, several handy methods are available.
 * You can convert an instance of a tree node into an object or JSON via `toObject()`
 * and `toJSON()`, you can deep clone an instance via `clone()`, and you can build a new TreeNode from JSON via `TreeNode.fromJSON()`.
 * The JSON methods are useful for storing tree data in a database as JSON and rebuilding the tree later on from said data.
 *
 * In addition, the path of any tree node from the root can be retrieved with `getNodePath()`, and nodes can be
 * selected using an array of sibling indexes via `getSelectionPath()` and `selectNode()`. These are useful for
 * hierarchy traversal and quickly selecting existing nodes. For example, you may want to store a node's selection path and then
 * reselect that same node at a later time in your application. You can also find nodes via `find()` or `findById()` if your nodes use IDs.
 */
export class TreeNode {
  public static defaultTreeNodeOptions: TreeNodeOptions = {
    childrenPropertyName: 'children',
    equals: (a, b) => a === b,
  };
  private parent: TreeNode | undefined;
  private children: TreeNode[];
  private childrenPropertyName: string;
  private equalsFunction: TreeNodeEquals;

  /**
   * Construct a new TreeNode using the provided data. The data can include arbitrary properties with an optional children array.
   * The default property name for the array of children is `"children"`. This can be customized via `options.childrenPropertyName`.
   *
   * The constructor will recursively create TreeNodes for all children. All other properties will be stored as data for each node.
   *
   * For example, given a nested object such as:
   *
   * ```js
   * { id: 1, children: [
   *     { id: 2 },
   *     { id: 3, children: [
   *         { id: 4 },
   *         { id: 5 }
   *       ]
   *     }
   *   ]
   * }
   * ```
   *
   * In this case, each node will have data containing the `id` property, and all children will be turned into TreeNodes themselves.
   *
   * To turn the TreeNode back into an object at a later time, use `toObject()`, and to turn it into a JSON string, use `toJSON()`.
   * To construct a TreeNode from JSON, use `TreeNode.fromJSON()`.
   *
   * @param data Optional. An object containing data for the node, plus optional children with subnodes.
   * @param options Optional (pun intended). The options for the TreeNode. Falls back on `TreeNode.defaultTreeNodeOptions` when not specified.
   */
  constructor(
    private data: Record<string, any> = {},
    private options: TreeNodeOptions = TreeNode.defaultTreeNodeOptions,
  ) {
    this.childrenPropertyName =
      options.childrenPropertyName ?? (TreeNode.defaultTreeNodeOptions.childrenPropertyName as string);
    this.equalsFunction = options.equals ?? (TreeNode.defaultTreeNodeOptions.equals as TreeNodeEquals);
    this.data = { ...data };
    const childrenData: Record<string, any>[] = this.data[this.childrenPropertyName] ?? [];
    delete this.data[this.childrenPropertyName];
    const childrenDataIsArray = Array.isArray(childrenData);
    this.children = [];
    if (childrenDataIsArray) {
      childrenData.forEach((childData) => this.addChildNode(new TreeNode(childData, options)));
    } else {
      console.error(
        `TreeNode: Expected children property "${
          this.childrenPropertyName
        }" to be an array of children data. Instead got ${typeof childrenData}:`,
        childrenData,
      );
    }
  }

  /**
   * Return the data for this node, without the children property.
   *
   * To get data and all descendants, including children, for this node, use `toObject()`.
   *
   * @returns The data for this node, without the children property.
   */
  public getData() {
    return this.data;
  }

  /**
   * Returns the property name used for children.
   *
   * @returns The property name used for children.
   */
  public getChildrenPropertyName() {
    return this.childrenPropertyName;
  }

  /**
   * Returns true if this node has a parent, false otherwise.
   *
   * When a node has no parent, it is the root. You can also use `isRoot()` to check for this case.
   *
   * @returns True if this node has a parent, false otherwise.
   */
  public hasParent(): boolean {
    return !!this.getParent();
  }

  /**
   * Returns true if this node is the root (has no parent), false otherwise.
   *
   * When a node has a parent, it is not the root. You can also use `hasParent()` to check for this case.
   *
   * @returns True if this node is the root (has no parent), false otherwise.
   */
  public isRoot(): boolean {
    return !this.hasParent();
  }

  /**
   * Returns true if the provided node is equal to this node.
   *
   * This operation uses the equals function provided in the TreeNode options, and uses `===` equality by default when an equals function is not specified.
   *
   * @param node The node to check for equality.
   * @returns True if the provided node is equal to this node.
   */
  public equals(node: TreeNode): boolean {
    return this.equalsFunction(this, node);
  }

  /**
   * Returns true if this node is a descendant of, or below, the provided node. False otherwise.
   *
   * @param node The node to check.
   * @returns True if this node is a descendant of, or below, the provided node. False otherwise.
   */
  public isDescendantOf(node: TreeNode) {
    let found = false;
    let ancestor = node.getParent();
    while (ancestor) {
      found = ancestor.equals(this);
      if (found) {
        break;
      } else {
        ancestor = ancestor.getParent();
      }
    }
    return found;
  }

  /**
   * Returns true if this node is an ancestor of, or above, the provided node. False otherwise.
   *
   * @param node The node to check.
   * @returns True if this node is an ancestor of, or above, the provided node. False otherwise.
   */
  public isAncestorOf(node: TreeNode) {
    return node.isDescendantOf(this);
  }

  /**
   * Adds the provided node as a child of this node. If the provided node already has a parent, it will first be removed from its previous parent.
   *
   * You can specify an optional index at which to insert the child. If no index is provided, the child will be added to the end.
   *
   * In addition, if the provided node is an ancestor to this node, this node will be removed from its parent before adding the node as a child.
   * This prevents adding an ancestor as a child to create a loop, also known as a circular reference.
   * You disable this protection by setting `allowCircularReferences` to true.
   *
   * @param node The node to add as a child.
   * @param index Optional. The index at which to insert the child. If `undefined`, the child will be added to the end.
   * @param allowCircularReferences Optional. Set to `true` to allow circular references.
   */
  public addChildNode(node: TreeNode, index?: number, allowCircularReferences?: boolean) {
    if (!allowCircularReferences) {
      if (node.isAncestorOf(this)) {
        this.removeParent();
      }
    }
    node.removeParent();
    node.parent = this;
    if (typeof index === 'number') {
      this.children.splice(Math.min(this.children.length, Math.max(0, index)), 0, node);
    } else {
      this.children.push(node);
    }
  }

  /**
   * Creates a TreeNode with the data provided and adds it as a child. Returns the newly created TreeNode.
   *
   * @param data The child data. A new node will be created from this data.
   * @param index The index at which to add the child. Pass `undefined` to add to the end of the children.
   *
   * @returns The newly created TreeNode.
   */
  public addChildData(data: Record<string, any> = {}, index?: number): TreeNode {
    const treeNode = new TreeNode(data, this.options);
    this.addChildNode(treeNode, index);
    return treeNode;
  }

  /**
   * Returns an array containing all nodes in the tree leading to this one, starting with the root.
   *
   * @returns An array containing all nodes in the tree leading to this one, starting with the root.
   */
  public getNodePath(): TreeNode[] {
    const path: TreeNode[] = [];
    let currNode: TreeNode | undefined = this;
    while (currNode) {
      path.unshift(currNode);
      currNode = currNode.getParent();
    }
    return path;
  }

  /**
   * Return an array of sibling index positions of all nodes leading to this one.
   * This includes the root, which will always be the first item in the array with an index of `0`, as root siblings are prohibited.
   *
   * You can then use `selectNode(selectionPath)` to select this node at a later time. This is useful if your nodes do not have an ID and you want to reselect a node
   * at a later time, or if your tree is large. It is much faster than a `find()` operation.
   * The speed of selection is constant time, O(1), as you know exactly where to find the node.
   *
   * For example, given a tree with the data:
   *
   * ```js
   * { id: 1, children: [
   *     { id: 2 },
   *     { id: 3, children: [
   *         { id: 4 },
   *         { id: 5 }
   *       ]
   *     }
   *   ]
   * }
   * ```
   *
   * The selection path for the node with `id: 4` would be:
   *
   * ```js
   * [0, 1, 0]
   * ```
   *
   * Selecting the node using this path is nearly instantaneous.
   *
   * @returns An array of sibling index positions of all nodes leading to this one.
   */
  public getSelectionPath(): number[] {
    return this.getNodePath().map((n) => n.getIndex());
  }

  /**
   * Returns the TreeNode at the provided selection path, or `undefined` if the node at the provided selection path is not found.
   *
   * A selection path is an array of sibling index positions of all nodes leading to the desired node.
   * This includes the root, which will always be the first item in the array with an index of `0`, as root siblings are prohibited.
   *
   * This is useful if your nodes do not have an ID and you want to reselect a node
   * at a later time, or if your tree is large. It is much faster than a `find()` operation.
   * The speed of selection is constant time, O(1), as you know exactly where to find the node.
   *
   * See `getSelectionPath()` for more.
   *
   * @param selectionPath The selection path for the TreeNode as an array of sibling indexes leading to the desired node.
   * @returns The selected TreeNode, or `undefined` if not found.
   */
  public selectNode(selectionPath: number[]): TreeNode | undefined {
    let selectedNode: TreeNode | undefined = undefined;
    let currNode: TreeNode = this.getRoot();
    let currDepth = 0;
    // Walk down the selection path and stop when we hit the end
    while (currDepth < selectionPath.length) {
      // Get the index at the current depth
      const currIndex = selectionPath[currDepth];
      // Get the node's children. If we're at the root, we get the root's siblings (an array containing just the root).
      const currChildren: TreeNode[] = currDepth === 0 ? currNode.getSiblings() : currNode.getChildren();
      // If the current index is within bounds of the children...
      if (currIndex >= 0 && currIndex < currChildren.length) {
        // Set the current node to the child at the specified position
        currNode = currChildren[currIndex];
        // If we haven't reached the bottom, increment the depth
        if (currDepth < selectionPath.length - 1) {
          currDepth++;
        } else {
          // Else, we've reached our selected node
          selectedNode = currNode;
          break;
        }
      } else {
        // If the current index is out of bounds, break
        break;
      }
    }
    return selectedNode;
  }

  /**
   * Returns the children for this node.
   *
   * @returns The children for this node.
   */
  public getChildren(): TreeNode[] {
    return this.children;
  }

  /**
   * Returns true if this node has children. False otherwise.
   *
   * @returns True if this node has children. False otherwise.
   */
  public hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Returns the first child in this node's list of children, or `undefined` if there are no children.
   *
   * @returns The first child in this node's list of children, or `undefined` if there are no children.
   */
  public getFirstChild(): TreeNode | undefined {
    return this.hasChildren() ? this.children[0] : undefined;
  }

  /**
   * Returns the last child in this node's list of children, or `undefined` if there are no children.
   *
   * @returns The last child in this node's list of children, or `undefined` if there are no children.
   */
  public getLastChild(): TreeNode | undefined {
    return this.hasChildren() ? this.children[this.children.length - 1] : undefined;
  }

  /**
   * Returns true if this node has the provided node in its direct list of children. False otherwise.
   *
   * You can use `isDescendant(node)` to check for a child relationship along the entire tree hierarchy.
   *
   * @param node The node to search for.
   * @returns True if this node has the provided node in its direct list of children. False otherwise.
   */
  public hasChild(node: TreeNode) {
    return this.indexOfChild(node) >= 0;
  }

  /**
   * Removes the provided node from this node's list of children and sets the provided node's parent to `undefined`.
   *
   * Returns `true` if the node was successfully removed. Returns `false` if the node was not found.
   *
   * @param node The node to remove.
   * @returns True if the node was removed. False if it was not found.
   */
  public removeChild(node: TreeNode): boolean {
    let wasRemoved = false;
    if (this.hasChild(node)) {
      this.children.splice(this.indexOfChild(node), 1);
      node.parent = undefined;
      wasRemoved = true;
    }
    return wasRemoved;
  }

  /**
   * Removes this node from its parent and sets this node's parent to `undefined`.
   *
   * Returns `true` if this node was successfully removed from its parent, `false` otherwise.
   *
   * @returns True if this node was removed from its parent, false otherwise.
   */
  public removeParent(): boolean {
    return !!this.parent?.removeChild(this);
  }

  /**
   * Returns an array of all siblings for this node.
   *
   * @returns An array of all siblings for this node.
   */
  public getSiblings(): TreeNode[] {
    return this.getParent()?.getChildren() ?? [this];
  }

  /**
   * Returns the number of siblings this node has including itself.
   *
   * @returns The number of siblings this node has including itself.
   */
  public getSiblingCount(): number {
    return this.getSiblings().length;
  }

  /**
   * Returns true if this node is an only child (has no other siblings), false otherwise.
   *
   * @returns True if this node is an only child (has no other siblings), false otherwise.
   */
  public isOnlyChild(): boolean {
    return this.getSiblingCount() === 1;
  }

  /**
   * Returns the first sibling in this node's list of siblings.
   *
   * @returns The first sibling in this node's list of siblings.
   */
  public getFirstSibling(): TreeNode {
    const siblings = this.getSiblings();
    return siblings[0];
  }

  /**
   * Returns the last sibling in this node's list of siblings.
   *
   * @returns The last sibling in this node's list of siblings.
   */
  public getLastSibling(): TreeNode {
    const siblings = this.getSiblings();
    return siblings[siblings.length - 1];
  }

  /**
   * Returns the sibling to the left of this node, or `undefined` if there is none.
   *
   * @returns The sibling to the left of this node, or `undefined` if there is none.
   */
  public getLeftSibling(): TreeNode | undefined {
    let leftSibling = undefined;
    const siblings = this.getSiblings();
    const index = this.getIndex();
    if (index > 0) {
      leftSibling = siblings[index - 1];
    }
    return leftSibling;
  }

  /**
   * Returns the sibling to the right of this node, or `undefined` if there is none.
   *
   * @returns The sibling to the right of this node, or `undefined` if there is none.
   */
  public getRightSibling(): TreeNode | undefined {
    let rightSibling = undefined;
    const siblings = this.getSiblings();
    const index = this.getIndex();
    if (index < siblings.length - 1) {
      rightSibling = siblings[index + 1];
    }
    return rightSibling;
  }

  /**
   * Adds the provided node as a sibling to this node. You can specify an optional sibling index for the insertion, otherwise the sibling will be added to the end.
   *
   * If you attempt to call this function at the root, an error will be thrown, as root nodes cannot have siblings.
   * To prevent this, use `isRoot()` to check if you're at the root.
   *
   * @param node The node to add as a sibling.
   * @param index Optional. The index for the new sibling.
   * @throws Throws an error if called at the root.
   */
  public addSiblingNode(node: TreeNode, index?: number) {
    if (!this.isRoot()) {
      const siblings = this.getSiblings();
      if (typeof index === 'number') {
        siblings.splice(Math.min(siblings.length, Math.max(0, index)), 0, node);
      } else {
        siblings.push(node);
      }
    } else {
      throw new Error('TreeNode: Cannot add sibling to root.');
    }
  }

  /**
   * Creates a TreeNode with the data provided and adds it as a sibling. Returns the newly created TreeNode.
   *
   * If you attempt to call this function at the root, an error will be thrown, as root nodes cannot have siblings.
   * To prevent this, use `isRoot()` to check if you're at the root.
   *
   * @param data The sibling data. A new node will be created from this data.
   * @param index The index at which to add the sibling. Pass `undefined` to add to the end of the siblings.
   *
   * @returns The newly created TreeNode.
   */
  public addSiblingData(data: Record<string, any> = {}, index?: number): TreeNode {
    const treeNode = new TreeNode(data, this.options);
    this.addSiblingNode(treeNode, index);
    return treeNode;
  }

  /**
   * Returns this node's index among its siblings.
   *
   * Note: The root will always have an index of `0`.
   *
   * @returns This node's index among its siblings.
   */
  public getIndex(): number {
    return this.getParent()?.indexOfChild(this) ?? 0;
  }

  /**
   * Returns the index of the provided node in this node's list of children, or `-1` if it is not found.
   *
   * @param node The node for which to find the index in this node's list of children.
   * @returns The index of the provided node in this node's list of children, or `-1` if it is not found.
   */
  public indexOfChild(node: TreeNode): number {
    return this.children.findIndex((c) => c.equals(node));
  }

  /**
   * Returns the index of the provided node in this node's list of siblings, or `-1` if it is not found.
   *
   * @param node The node for which to find the index in this node's list of siblings.
   * @returns The index of the provided node in this node's list of siblings, or `-1` if it is not found.
   */
  public indexOfSibling(node: TreeNode): number {
    return this.getSiblings().findIndex((s) => s.equals(node));
  }

  /**
   * Returns the parent of this node, or `undefined` if there is none.
   *
   * @returns The parent of this node, or `undefined` if there is none.
   */
  public getParent(): TreeNode | undefined {
    return this.parent;
  }

  /**
   * Returns true if the provided node is this node's direct parent, false otherwise.
   *
   * You can use `isAncestor(node)` to check for a parental relationship along the entire tree hierarchy.
   *
   * @param node The node to check.
   * @returns True if the provided node is this node's direct parent, false otherwise.
   */
  public isParent(node: TreeNode) {
    const myParent = this.getParent();
    return myParent && myParent.equals(node);
  }

  /**
   * Sets the provided node as the parent of this node. If `parent` is `undefined`, this node will be removed from its parent.
   *
   * @param parent The node to set as the new parent.
   */
  public setParent(parent: TreeNode | undefined): void {
    if (parent) {
      parent.addChildNode(this);
    } else {
      this.removeParent();
    }
  }

  /**
   * Returns the root node at the top of the tree hierarchy.
   *
   * @returns The root node at the top of the tree hierarchy.
   */
  public getRoot(): TreeNode {
    let root: TreeNode = this;
    let currNode: TreeNode | undefined = root;
    while (typeof currNode !== 'undefined') {
      currNode = currNode.getParent();
      if (currNode) {
        root = currNode;
      }
    }
    return root;
  }

  /**
   * Searches the tree node and its children for the first node that passes the test defined by the matcher function provided.
   *
   * The found node is returned. If not found, `undefined` is returned.
   *
   * The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
   * You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.
   *
   * @param predicate A function used to match the node being searched for. This function is passed a node and returns true if the node is a match.
   * @param rightToLeft Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal.
   * @returns The found node, or `undefined` if not found.
   */
  public findFirst(predicate: (node: TreeNode) => boolean, rightToLeft?: boolean): TreeNode | undefined {
    let foundNode: TreeNode | undefined = undefined;
    this.walk((n) => {
      const found = predicate(n);
      if (found) {
        foundNode = n;
      }
      return found; // Return `found` to abort when true
    }, rightToLeft);
    return foundNode;
  }

  /**
   * Searches the tree node and its children for all nodes that pass the test defined by the matcher function provided.
   *
   * The found nodes are returned as an array of TreeNode.
   *
   * The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
   * You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.
   *
   * @param predicate A function used to match the nodes being searched for. This function is passed a node and returns true if the node is a match.
   * @param rightToLeft Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal.
   * @returns A `TreeNode[]` array containing all found nodes.
   */
  public findAll(predicate: (node: TreeNode) => boolean, rightToLeft?: boolean): TreeNode[] {
    const foundNodes: TreeNode[] = [];
    this.walk((n) => {
      if (predicate(n)) {
        foundNodes.push(n);
      }
    }, rightToLeft);
    return foundNodes;
  }

  /**
   * Finds and returns the node with the provided id (using `===` comparison), or returns `undefined` if not found.
   *
   * Uses "id" as the property name by default, or you can provide the ID property name using
   * the `idPropertyName` argument.
   *
   * The find algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
   * You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.
   *
   * @param id The node ID to search for.
   * @param idPropertyName Optional. The property name of the ID. Defaults as "id".
   * @param rightToLeft Optional. When true, searching will traverse the tree using depth-first right-to-left preorder traversal.
   * @returns The node with the provided id, or `undefined` if not found.
   */
  public findById(id: any, idPropertyName = 'id', rightToLeft?: boolean): TreeNode | undefined {
    return this.findFirst((node) => node.getData()[idPropertyName] === id, rightToLeft);
  }

  /**
   * Walk the tree node and its children, calling the visit function on each node.
   *
   * If the visit function returns true at any point, walking is aborted.
   *
   * The walk algorithm uses [depth-first left-to-right preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) by default.
   * You can pass `rightToLeft` argument as `true` to use [depth-first right-to-left preorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL) instead.
   *
   * @param visit A visit function called on every node traversed. If the visit function returns true at any point, walking is aborted.
   * @param rightToLeft Optional. When true, it will traverse the tree using depth-first right-to-left preorder traversal.
   * @returns True if the traversal was aborted, false otherwise.
   */
  public walk(visit: (node: TreeNode) => boolean | void, rightToLeft?: boolean): boolean {
    let abort = !!visit(this);
    if (!abort) {
      let i = rightToLeft ? this.children.length - 1 : 0;
      const condition = () => (rightToLeft ? i >= 0 : i < this.children.length);
      const update = () => (rightToLeft ? i-- : i++);
      while (condition()) {
        const childNode = this.children[i];
        abort = childNode.walk(visit, rightToLeft);
        if (abort) {
          break;
        }
        update();
      }
    }
    return abort;
  }

  /**
   * Returns an object containing the tree node data including all nested children.
   *
   * Note: Parents, if any, are not included.
   *
   * @returns An object containing the tree node data including all nested children.
   */
  public toObject(): Record<string, any> {
    const children: Record<string, any> = [];
    const obj = { ...this.data, [this.childrenPropertyName]: children };
    this.children.forEach((child) => {
      children.push(child.toObject());
    });
    return obj;
  }

  /**
   * Returns a JSON string of an object containing the tree node data including all nested children.
   * Parents, if any, are not included.
   *
   * This is accomplished by stringifying the tree node's `toObject()` value.
   * As such, all data in the tree node must support `JSON.stringify()` or an error will be thrown.
   *
   * @see You can use `TreeNode.fromJSON()` to construct a tree node from the resulting JSON output.
   * @see If you'd like to clone the tree node, you can simply use `clone()` which converts to JSON and back to a TreeNode for you.
   *
   * @returns A JSON string of an object containing the tree node data including all nested children.
   * @throws An error if the tree node data cannot be converted to a string using `JSON.stringify()`.
   */
  public toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  /**
   * Returns a deep clone of the tree node, including all children. Parents, if any, are not included.
   *
   * This is accomplished by stringifying the tree node's `toObject()` value, and then parsing the resulting JSON string to create an entirely new tree node.
   * As such, all data in the tree node must support `JSON.stringify()` or an error will be thrown.
   *
   * @returns A deep clone of the tree node, including all children.
   * @throws An error if `JSON.stringify()` fails on the tree node.
   */
  public clone(): TreeNode {
    return TreeNode.fromJSON(this.toJSON(), this.options);
  }

  // === Static === === ===

  /**
   * Parses the provided data string, which contains an object with nested children, and creates a tree node from the resulting parsed object.
   *
   * JSON example:
   *
   * ```json
   * {
   *   "id": 1,
   *   "children": [{ "id": 2 }, { "id": 3, "children": [{ "id": 4 }, { "id": 5 }] }]
   * }
   * ```
   *
   * @param dataString The JSON data string containing an object with nested children.
   * @param options Optional. The options for the TreeNode.
   * @returns A TreeNode constructed from the parsed JSON.
   *
   * @throws An error if JSON parsing fails.
   */
  public static fromJSON(dataString: string, options: TreeNodeOptions = TreeNode.defaultTreeNodeOptions): TreeNode {
    return new TreeNode(JSON.parse(dataString), options);
  }
}

/** A Tree simply extends TreeNode and can be used as the root node. */
export class Tree extends TreeNode {}

/**
 * A function used to check for node equality.
 */
export type TreeNodeEquals = (a: TreeNode, b: TreeNode) => boolean;

/**
 * Options for the tree node.
 */
export interface TreeNodeOptions {
  childrenPropertyName?: string;
  equals?: TreeNodeEquals;
}
