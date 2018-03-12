function setup() {
  // Width enough for 5 levels (32 leaves)
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(51);

  // Fill tree with random nodes
  tree = new Tree();
  for (let i = 0; i < 15; i++) {
    tree.insertNode(floor(random(0, 100)), 'node');
  }
}

function draw() {

}

// Event handlers
document.getElementsByClassName('insertBtn')[0]
  .addEventListener('click', function(e) {

    e.preventDefault();

    let key = document.getElementsByClassName('key1')[0].value;
    let val = document.getElementsByClassName('value')[0].value;
    tree.insertNode(key, val);

    var node = document.createElement("LI");
    var textnode = document.createTextNode(key);
    node.appendChild(textnode);
    document.getElementsByTagName("FORM")[0].appendChild(node);
  });

  document.getElementsByClassName('removeBtn')[0]
    .addEventListener('click', function(e) {
      e.preventDefault();

      let key = parseInt(document.getElementsByClassName('key2')[0].value);
      tree.removeNode(key);
    });
