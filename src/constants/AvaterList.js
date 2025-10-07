class AvatarClass {
  constructor(id, image, color) {
    this.id = id;
    this.image = image;
    this.color = color;
  }
}

export const AvatarList = [
  new AvatarClass(1, require('../assets/avaters/1.png'), '#ea4e1b'),
  new AvatarClass(2, require('../assets/avaters/2.png'), '#239daa'),
  new AvatarClass(3, require('../assets/avaters/3.png'), '#e83d3f'),
  new AvatarClass(4, require('../assets/avaters/4.png'), '#94c120'),
  new AvatarClass(5, require('../assets/avaters/5.png'), '#239daa'),
  new AvatarClass(6, require('../assets/avaters/6.png'), '#ea4e1b'),
  new AvatarClass(7, require('../assets/avaters/7.png'), '#239daa'),
  new AvatarClass(8, require('../assets/avaters/8.png'), '#e83a3c'),
  new AvatarClass(9, require('../assets/avaters/9.png'), '#94c120'),
  new AvatarClass(10, require('../assets/avaters/10.png'), '#ea4e1b'),
];
