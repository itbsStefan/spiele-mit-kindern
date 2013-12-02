

function copySelectionTo(domElement) {
  nodes = getSelectedTextNodes()
  for (var i = 0; i < nodes.length; i+= 1) {
    // from http://api.jquery.com/clone/
    // $( ".hello" ).clone().appendTo( ".goodbye" );
    $( nodes[i] ).clone().appendTo( domElement );
  }
  return true;
}

function getSelectedNodes() {
  // from https://developer.mozilla.org/en-US/docs/Web/API/Selection
  var selection = window.getSelection();
  if (selection.isCollabsed) {
    return [];
  };
  var node1 = selection.anchorNode;
  var node2 = selection.focusNode;
  var selectionAncestor = get_common_ancestor(node1, node2);
  if (selectionAncestor == null) {
    return [];
  }
  return getNodesBetween(selectionAncestor, node1, node2);
}

function get_common_ancestor(a, b)
{
    // from http://stackoverflow.com/questions/3960843/how-to-find-the-nearest-common-ancestors-of-two-or-more-nodes
    $parentsa = $(a).parents();
    $parentsb = $(b).parents();

    var found = null;

    $parentsa.each(function() {
        var thisa = this;

        $parentsb.each(function() {
            if (thisa == this)
            {
                found = this;
                return false;
            }
        });

        if (found) return false;
    });

    return found;
}

function isDescendant(parent, child) {
     // from http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

function getNodesBetween(rootNode, node1, node2) {
  var resultNodes = [];
  var isBetweenNodes = false;
  for (var i = 0; i < rootNode.childNodes.length; i+= 1) {
    if (isDescendant(rootNode.childNodes[i], node1) || isDescendant(rootNode.childNodes[i], node2)) {
      if (resultNodes.length == 0) {
        isBetweenNodes = true;
      } else {
        isBetweenNodes = false;
      }
      resultNodes.push(rootNode.childNodes[i]);
    } else if (resultNodes.length == 0) {
    } else if (isBetweenNodes) {
      resultNodes.push(rootNode.childNodes[i]);
    } else {
      return resultNodes;
    }
  };
  if (resultNodes.length == 0) {
    return [rootNode];
  } else {
    // same child node for both should never happen
    return [resultNodes[0]];
  }
}







