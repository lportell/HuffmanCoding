class MinPriorityQueue{
    constructor(){
        this.items = [];
        this.n = 0;
    }
    IsEmpty(){
        return this.n===0;
    }
    GetSize(){
        return this.n;
    }
    Insert(newItem){
        this.items[++this.n] = newItem;
        let i = this.n;
       // while we haven't reached the beginning of the items and
       // the parent is greater than the child
        while(i > 1 && this.greater(Math.floor(i/2),i)===1) {
            this.swap(i, Math.floor(i/2));
            i = Math.floor(i/2);
        }
    }
    DeleteMin(){
        if(this.IsEmpty()) {
            throw new Error('No items in the queue.');
        }
        this.swap(1,this.n);
        let min = this.items[this.n--];
        let i = 1;
        while(2*i <= this.n){
             let child = 2*i;
             // swap with the smaller child
             if(child<this.n && this.greater(child,child+1)===1){
                 child++;
             }
             // if the parent is not larger than the parent, stop swapping
             if(!this.greater(i,child)){
                  break;
             }
             this.swap(i,child);
             i = child;
        }
        return min;

    }
    swap(j,k){
       let temp = this.items[j];
       this.items[j] = this.items[k];
       this.items[k] = temp;
    }

    greater(j,k){
        if(this.items[j].weight>this.items[k].weight){
          return 1;
        }
       return 0;
    }
    toString(){
        let array = [];
        for (var index = 1; index < this.n+1; index++) {
          array.push(this.items[index].weight);
        }
        return array;
    }
    printQueue(){
      let curLevel = [1];
      while (curLevel.length>0){
        let nextLevel = [];
        let lweight,rweight;
        console.log('NewLevel');
        for(var j=0;j<curLevel.length;j++){
          let node = this.items[curLevel[j]];
          let leftIndex = 2*curLevel[j];
          let rightIndex = 2*curLevel[j]+1;
          if (leftIndex<=this.n){
            nextLevel.push(leftIndex);
            lweight = this.items[leftIndex].weight;
          }else{
            lweight = '';
          }
          if (rightIndex<=this.n){
            nextLevel.push(rightIndex);
            rweight = this.items[rightIndex].weight;
          }else{
            rweight = '';
          }
          console.log('I:',curLevel[j],':',node.weight,'L:',leftIndex,':',lweight,'R:',rightIndex,':',rweight);
        }
        curLevel = nextLevel;
      }
    }
};

global.MinPriorityQueue = MinPriorityQueue;
