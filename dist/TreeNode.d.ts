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
export declare class TreeNode {
    private data;
    private options;
    static defaultTreeNodeOptions: TreeNodeOptions;
    private parent;
    private children;
    private childrenPropertyName;
    private equalsFunction;
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
    constructor(data?: Record<string, any>, options?: TreeNodeOptions);
    /**
     * Return the data for this node, without the children property.
     *
     * To get data and all descendants, including children, for this node, use `toObject()`.
     *
     * @returns The data for this node, without the children property.
     */
    getData(): Record<string, any>;
    /**
     * Returns the property name used for children.
     *
     * @returns The property name used for children.
     */
    getChildrenPropertyName(): string;
    /**
     * Returns true if this node has a parent, false otherwise.
     *
     * When a node has no parent, it is the root. You can also use `isRoot()` to check for this case.
     *
     * @returns True if this node has a parent, false otherwise.
     */
    hasParent(): boolean;
    /**
     * Returns true if this node is the root (has no parent), false otherwise.
     *
     * When a node has a parent, it is not the root. You can also use `hasParent()` to check for this case.
     *
     * @returns True if this node is the root (has no parent), false otherwise.
     */
    isRoot(): boolean;
    /**
     * Returns true if the provided node is equal to this node.
     *
     * This operation uses the equals function provided in the TreeNode options, and uses `===` equality by default when an equals function is not specified.
     *
     * @param node The node to check for equality.
     * @returns True if the provided node is equal to this node.
     */
    equals(node: TreeNode): boolean;
    /**
     * Returns true if this node is a descendant of, or below, the provided node. False otherwise.
     *
     * @param node The node to check.
     * @returns True if this node is a descendant of, or below, the provided node. False otherwise.
     */
    isDescendantOf(node: TreeNode): boolean;
    /**
     * Returns true if this node is an ancestor of, or above, the provided node. False otherwise.
     *
     * @param node The node to check.
     * @returns True if this node is an ancestor of, or above, the provided node. False otherwise.
     */
    isAncestorOf(node: TreeNode): boolean;
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
    addChildNode(node: TreeNode, index?: number, allowCircularReferences?: boolean): void;
    /**
     * Creates a TreeNode with the data provided and adds it as a child. Returns the newly created TreeNode.
     *
     * @param data The child data. A new node will be created from this data.
     * @param index The index at which to add the child. Pass `undefined` to add to the end of the children.
     *
     * @returns The newly created TreeNode.
     */
    addChildData(data?: Record<string, any>, index?: number): TreeNode;
    /**
     * Returns an array containing all nodes in the tree leading to this one, starting with the root.
     *
     * @returns An array containing all nodes in the tree leading to this one, starting with the root.
     */
    getNodePath(): TreeNode[];
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
    getSelectionPath(): number[];
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
    selectNode(selectionPath: number[]): TreeNode | undefined;
    /**
     * Returns the children for this node.
     *
     * @returns The children for this node.
     */
    getChildren(): TreeNode[];
    /**
     * Returns true if this node has children. False otherwise.
     *
     * @returns True if this node has children. False otherwise.
     */
    hasChildren(): boolean;
    /**
     * Returns the first child in this node's list of children, or `undefined` if there are no children.
     *
     * @returns The first child in this node's list of children, or `undefined` if there are no children.
     */
    getFirstChild(): TreeNode | undefined;
    /**
     * Returns the last child in this node's list of children, or `undefined` if there are no children.
     *
     * @returns The last child in this node's list of children, or `undefined` if there are no children.
     */
    getLastChild(): TreeNode | undefined;
    /**
     * Returns true if this node has the provided node in its direct list of children. False otherwise.
     *
     * You can use `isDescendant(node)` to check for a child relationship along the entire tree hierarchy.
     *
     * @param node The node to search for.
     * @returns True if this node has the provided node in its direct list of children. False otherwise.
     */
    hasChild(node: TreeNode): boolean;
    /**
     * Removes the provided node from this node's list of children and sets the provided node's parent to `undefined`.
     *
     * Returns `true` if the node was successfully removed. Returns `false` if the node was not found.
     *
     * @param node The node to remove.
     * @returns True if the node was removed. False if it was not found.
     */
    removeChild(node: TreeNode): boolean;
    /**
     * Removes this node from its parent and sets this node's parent to `undefined`.
     *
     * Returns `true` if this node was successfully removed from its parent, `false` otherwise.
     *
     * @returns True if this node was removed from its parent, false otherwise.
     */
    removeParent(): boolean;
    /**
     * Returns an array of all siblings for this node.
     *
     * @returns An array of all siblings for this node.
     */
    getSiblings(): TreeNode[];
    /**
     * Returns the number of siblings this node has including itself.
     *
     * @returns The number of siblings this node has including itself.
     */
    getSiblingCount(): number;
    /**
     * Returns true if this node is an only child (has no other siblings), false otherwise.
     *
     * @returns True if this node is an only child (has no other siblings), false otherwise.
     */
    isOnlyChild(): boolean;
    /**
     * Returns the first sibling in this node's list of siblings.
     *
     * @returns The first sibling in this node's list of siblings.
     */
    getFirstSibling(): TreeNode;
    /**
     * Returns the last sibling in this node's list of siblings.
     *
     * @returns The last sibling in this node's list of siblings.
     */
    getLastSibling(): TreeNode;
    /**
     * Returns the sibling to the left of this node, or `undefined` if there is none.
     *
     * @returns The sibling to the left of this node, or `undefined` if there is none.
     */
    getLeftSibling(): TreeNode | undefined;
    /**
     * Returns the sibling to the right of this node, or `undefined` if there is none.
     *
     * @returns The sibling to the right of this node, or `undefined` if there is none.
     */
    getRightSibling(): TreeNode | undefined;
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
    addSiblingNode(node: TreeNode, index?: number): void;
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
    addSiblingData(data?: Record<string, any>, index?: number): TreeNode;
    /**
     * Returns this node's index among its siblings.
     *
     * Note: The root will always have an index of `0`.
     *
     * @returns This node's index among its siblings.
     */
    getIndex(): number;
    /**
     * Returns the index of the provided node in this node's list of children, or `-1` if it is not found.
     *
     * @param node The node for which to find the index in this node's list of children.
     * @returns The index of the provided node in this node's list of children, or `-1` if it is not found.
     */
    indexOfChild(node: TreeNode): number;
    /**
     * Returns the index of the provided node in this node's list of siblings, or `-1` if it is not found.
     *
     * @param node The node for which to find the index in this node's list of siblings.
     * @returns The index of the provided node in this node's list of siblings, or `-1` if it is not found.
     */
    indexOfSibling(node: TreeNode): number;
    /**
     * Returns the parent of this node, or `undefined` if there is none.
     *
     * @returns The parent of this node, or `undefined` if there is none.
     */
    getParent(): TreeNode | undefined;
    /**
     * Returns true if the provided node is this node's direct parent, false otherwise.
     *
     * You can use `isAncestor(node)` to check for a parental relationship along the entire tree hierarchy.
     *
     * @param node The node to check.
     * @returns True if the provided node is this node's direct parent, false otherwise.
     */
    isParent(node: TreeNode): boolean | undefined;
    /**
     * Sets the provided node as the parent of this node. If `parent` is `undefined`, this node will be removed from its parent.
     *
     * @param parent The node to set as the new parent.
     */
    setParent(parent: TreeNode | undefined): void;
    /**
     * Returns the root node at the top of the tree hierarchy.
     *
     * @returns The root node at the top of the tree hierarchy.
     */
    getRoot(): TreeNode;
    /**
     * Searches the tree node and its children for a node that passes the test defined by the matcher function provided.
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
    find(predicate: (node: TreeNode) => boolean, rightToLeft?: boolean): TreeNode | undefined;
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
    findById(id: any, idPropertyName?: string, rightToLeft?: boolean): TreeNode | undefined;
    /**
     * Returns an object containing the tree node data including all nested children.
     *
     * Note: Parents, if any, are not included.
     *
     * @returns An object containing the tree node data including all nested children.
     */
    toObject(): Record<string, any>;
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
    toJSON(): string;
    /**
     * Returns a deep clone of the tree node, including all children. Parents, if any, are not included.
     *
     * This is accomplished by stringifying the tree node's `toObject()` value, and then parsing the resulting JSON string to create an entirely new tree node.
     * As such, all data in the tree node must support `JSON.stringify()` or an error will be thrown.
     *
     * @returns A deep clone of the tree node, including all children.
     * @throws An error if `JSON.stringify()` fails on the tree node.
     */
    clone(): TreeNode;
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
    static fromJSON(dataString: string, options?: TreeNodeOptions): TreeNode;
}
/** A Tree simply extends TreeNode and can be used as the root node. */
export declare class Tree extends TreeNode {
}
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
