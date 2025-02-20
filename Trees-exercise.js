class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return this.root;
          }
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return this.root;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

  lookup(value) {
    if (!this.root) return false;
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return currentNode; // ✅ Return the found node
      }
    }
    return false;
  }

  remove(value) {
    if (!this.root) return null;
    this.root = this.removeNode(this.root, value);
    return this.root;
  }

  removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
    } else {
      // Case 1: No children (leaf node)
      if (!node.left && !node.right) return null;

      // Case 2: One child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      let minValue = this.findMin(node.right);
      node.value = minValue;
      node.right = this.removeNode(node.right, minValue);
    }

    return node;
  }

  findMin(node) {

    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
}

// 🔹 Create Tree & Insert Values
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

// 🔹 Remove nodes
tree.remove(170);
tree.remove(20);

// 🔹 Print the tree structure after removals
console.log("Tree after removals:");
console.log(JSON.stringify(traverse(tree.root), null, 2));

// 🔹 Lookup a node
console.log("\nLooking up value 10:");
console.log(tree.lookup(10));

console.log("----------------------------------------------------");
console.log("Tree root:", tree.root);
console.log("----------------------------------------------------");

// 🔹 Helper function for tree traversal
function traverse(node) {
  if (!node) return null;
  return {
    value: node.value,
    left: traverse(node.left),
    right: traverse(node.right),
  };
}
