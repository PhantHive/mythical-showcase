const fs = require('fs');
const path = require('path');

const directories = [
  '../public/creatures/Enchanted',
  '../public/creatures/Fairy',
  '../public/creatures/Mystic',
];

const imageList = {};

directories.forEach((dir) => {
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.png'));
  imageList[dir] = files.map(file => path.join(dir, file));
});

fs.writeFileSync('../src/utils/imageList.json', JSON.stringify(imageList, null, 2));