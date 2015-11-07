function grid() {
  var data = []
  var nodes;
  var width = 100;
  var cellWidth = 10;
  var cellHeight = 10;
  var nColumns = 10;
  var offset = [0,0];
  var margin = [1,1];
  var brick = false;


  function getX(d,i) {
    return offset[0] + (i % nColumns) * (cellWidth + margin[0])
  }
  function getY(d,i) {
    return offset[1] + Math.floor(i/nColumns) * (cellHeight + margin[1])
  }

  function newNodes() {
    nodes = [];
    data.forEach(function(d,i) {
      var node = {
        x: getX(d,i),
        y: getY(d,i),
        data: d,
        index: i
      }
      nodes.push(node);
    })
  }
  newNodes();

  function calculate() {
    nodes.forEach(function(node, i) {
      node.x = getX(node, node.index);
      node.y = getY(node, node.index);
      // calculate the center for convenience
      node.cx = node.x + cellWidth/2;
      node.cy = node.x + cellHeight/2;
    })
  }

  this.nodes = function(val) {
    if(val) {
      data = val;
      newNodes();
    }
    calculate();
    return nodes;
  }
  this.columns = function(val) {
  }
  this.cellWidth = function(val) {
    if(val) {
      cellWidth = val;
      this.width(width);
      return this;
    }
    return cellWidth;
  }
  this.cellHeight = function(val) {
    if(val) {
      cellHeight = val;
      return this;
    }
    return cellHeight;
  }
  this.width = function(val) {
    if(val) {
      width = val;
      nColumns = Math.floor((width) / (cellWidth + margin[0])) + (brick ? 0.5 : 0);
      //cellWidth = val / nColumns;
      return this;
    }
    return width;
  }
  this.margin = function(val) {
    if(val) {
      margin = val;
      this.width(width);
      return this;
    }
    return margin;
  }

  this.offset = function(val) {
    if(val) {
      offset = val;
      return this;
    }
    return offset;
  }
  this.brick = function(val) {

    if(val === null || val === undefined) return brick;
    if(val !== null) {
      brick = val;
      this.width(width);
      return this;
    }
    return brick;
  }

  return this;
}
