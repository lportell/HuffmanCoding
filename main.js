let fs = require("file-system");
let reader = require("read-file");
require('./MinPriorityQueue.js');
let symbol_info = [];
let tree = [];
let forest = new MinPriorityQueue();

let debug = true;

// used to bootstrap the application
let init = function () {
    let readBuffer = reader.sync("infile.dat", "utf-8");
    let allSymbols = readBuffer.replace(/[^0-9a-zA-Z]/g, ''); // get rid of everything except letters and numbers
    createSymbolInfo(allSymbols);
    initForest(symbol_info);
    condenseForest();
    //console.log(inputString);
};

let createSymbolInfo = function (symbols) {
    let index = 0;
    for (let i = 0; i < symbols.length; i++) {
        let character = symbols[i];
        if (!symbol_info[character]) { // newly encountered symbol
            let details = {
                symbol: character,
                frequency: 1,
                leaf: index++ // TODO: fill this
            };
            symbol_info[character] = details;
        } else { // repetition of a symbol
            symbol_info[character].frequency += 1;
        }
    }
    // temp log for our benefit
    for (item in symbol_info) {
        console.log(symbol_info[item]);
    }

};

let initForest = function(alphabet){
    for (item in alphabet){
        let forestRoot = {
                  root:alphabet[item].leaf,
                  weight:alphabet[item].frequency
        };
        forest.Insert(forestRoot);
        let treeNode = {
                left_child:-1,
                right_child:-1,
                parent:-1
        };
        tree[alphabet[item].leaf]=treeNode;
    }
}

let condenseForest = function(){
    if (debug){forest.printQueue();}
    while (forest.GetSize() > 1){
      // get the first two items in the forest priority queue
        let min1 = forest.DeleteMin();
        let min2 = forest.DeleteMin();
     // create a tree node with the roots (ids) of the two min items
        treeNode = {left_child:min1.root,
                    right_child:min2.root,
                    parent:-1
        };
        // create a new forest node with the sum of the weights of the two min items
        let forestRoot = {
                  root:tree.length,
                  weight:min1.weight+min2.weight
        };
    // set the parent of the two children to be the index of the new node
        tree[min1.root].parent=tree.length;
        tree[min2.root].parent=tree.length;
    // append the new node to the end of the tree
        tree[tree.length]=treeNode;
   // insert the new root into the forest
        forest.Insert(forestRoot);
      }
      if (debug){printTree(tree);}
}
let findLeaf = function(root){
  for (symbol in symbol_info){
    if (symbol_info[symbol].leaf==root){
      return symbol_info[symbol].symbol;
    }
  }
  return 'no match';
}

let printTree = function(tree){
  for(var i=0;i<tree.length;i++){
    treeNode = tree[i];
    if (treeNode.parent == -1){
        let topNode = treeNode;
        break;}
  }
  let curLevel = [i];
  while (curLevel.length>0){
    let nextLevel = [];
    if (debug){console.log('NewLevel');}
    for(var j=0;j<curLevel.length;j++){
      let node = tree[curLevel[j]];
      let leftIndex = node.left_child;
      let rightIndex = node.right_child;
      let parent = node.parent;
      if (leftIndex>0){nextLevel.push(leftIndex);}
      if (rightIndex>0){nextLevel.push(rightIndex);}
      if (debug){console.log('I:',curLevel[j],'L:',leftIndex,'R:',rightIndex,'P:',parent);}
    }
    curLevel = nextLevel;
  }






}

init();
