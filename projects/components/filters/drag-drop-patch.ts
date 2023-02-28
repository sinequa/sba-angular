import { coerceElement } from '@angular/cdk/coercion';
import { DragRef, DropListRef } from '@angular/cdk/drag-drop';

// A few lines of code used for debugging (saved to avoid having to re-write them)
// let reflistToString = (list: DropListRef[]) => JSON.stringify(list.map(ref => coerceElement(ref.element).id));
// console.log("Targets: " + reflistToString(targets));

export function installPatch() {
  DropListRef.prototype._getSiblingContainerFromPosition = function(
    item: DragRef,
    x: number,
    y: number
  ): DropListRef | undefined {
    // Possible targets include siblings and 'this'
    //@ts-ignore
    let targets = [this, ...this._siblings];

    // Only consider targets where the drag postition is within the client rect
    // (this avoids calling enterPredicate on each possible target)
    let matchingTargets = targets.filter(ref => {
      return ref._clientRect && isInsideClientRect(ref._clientRect, x, y);
    });

    // Stop if no targets match the coordinates
    if (matchingTargets.length == 0) {
      return undefined;
    }

    // Order candidates by DOM hierarchy and z-index
    let orderedMatchingTargets = orderByHierarchy(matchingTargets);

    // The drop target is the last matching target in the list
    let matchingTarget =
      orderedMatchingTargets[orderedMatchingTargets.length - 1];

    // Only return matching target if it is a sibling
    if (matchingTarget === this) {
      return undefined;
    }

    // Can the matching target receive the item?
    if (!matchingTarget._canReceive(item, x, y)) {
      return undefined;
    }

    // Return matching target
    return matchingTarget;
  };
}

// Not possible to improt isInsideClientRect from @angular/cdk/drag-drop/client-rect
function isInsideClientRect(clientRect: ClientRect, x: number, y: number) {
  const { top, bottom, left, right } = clientRect;
  return y >= top && y <= bottom && x >= left && x <= right;
}

// Order a list of DropListRef so that for nested pairs, the outer DropListRef
// is preceding the inner DropListRef. Should probably be ammended to also
// sort by Z-level.
function orderByHierarchy(refs: DropListRef[]) {
  // Build a map from HTMLElement to DropListRef
  let refsByElement: Map<HTMLElement, DropListRef> = new Map();
  refs.forEach(ref => {
    refsByElement.set(coerceElement(ref.element), ref);
  });

  // Function to identify the closest ancestor among th DropListRefs
  let findAncestor = (ref: DropListRef) => {
    let ancestor = coerceElement(ref.element).parentElement;

    while (ancestor) {
      if (refsByElement.has(ancestor)) {
        return refsByElement.get(ancestor);
      }
      ancestor = ancestor.parentElement;
    }

    return undefined;
  };

  // Node type for tree structure
  type NodeType = { ref: DropListRef; parent?: NodeType; children: NodeType[] };

  // Add all refs as nodes to the tree
  let tree: Map<DropListRef, NodeType> = new Map();
  refs.forEach(ref => {
    tree.set(ref, { ref: ref, children: [] });
  });

  // Build parent-child links in tree
  refs.forEach(ref => {
    let parent = findAncestor(ref);

    if (parent) {
      let node = tree.get(ref);
      let parentNode = tree.get(parent);

      node!.parent = parentNode;
      parentNode!.children.push(node!);
    }
  });

  // Find tree roots
  let roots = Array.from(tree.values()).filter(node => !node.parent);

  // Function to recursively build ordered list from roots and down
  let buildOrderedList = (nodes: NodeType[], list: DropListRef[]) => {
    list.push(...nodes.map(node => node.ref));
    nodes.forEach(node => {
      buildOrderedList(node.children, list);
    });
  };

  // Build and return the ordered list
  let ordered: DropListRef[] = [];
  buildOrderedList(roots, ordered);
  return ordered;
}
