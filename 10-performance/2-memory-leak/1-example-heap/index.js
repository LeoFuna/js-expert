const items = [];

while (true) {
  items.push(items);
}

// node --max-old-space-size=64 index.js     =>  Para limitar a memoria e estourar mais rápido