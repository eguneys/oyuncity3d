function World(data) {

  data.blocks = addBlocks2();

}

function addBlocks2() {
  const blocks = [];

  blocks[1] = {
    color: 'yellow',
    texture: 'hongkong'
  };
  blocks[2] = {
    color: 'yellow',
    texture: 'shanghai'
  };
  blocks[3] = {
    color: 'amber',
    texture: 'chance'
  };
  blocks[4] = {
    color: 'lime',
    texture: 'jakarta'
  };
  blocks[5] = {
    color: 'lime',
    texture: 'singapore'
  };
  blocks[7] = {
    color: 'cyan',
    texture: 'mumbai'
  };
  blocks[8] = {
    color: 'cyan',
    texture: 'tahran'
  };
  blocks[9] = {
    color: 'amber',
    texture: 'chance'
  };
  blocks[10] = {
    color: 'green',
    texture: 'buenos'
  };
  blocks[11] = {
    color: 'green',
    texture: 'saopaulo'
  };
  blocks[13] = {
    color: 'orange',
    texture: 'lisbon'
  };
  blocks[14] = {
    color: 'orange',
    texture: 'madrid'
  };
  blocks[15] = {
    color: 'amber',
    texture: 'chance'
  };
  blocks[16] = {
    color: 'purple',
    texture: 'berlin'
  };
  blocks[17] = {
    color: 'purple',
    texture: 'rome'
  };
  blocks[19] = {
    color: 'blue',
    texture: 'london'
  };
  blocks[20] = {
    color: 'amber',
    texture: 'chance'
  };
  blocks[21] = {
    color: 'red',
    texture: 'seoul'
  };
  blocks[22] = {
    color: 'gray',
    texture: 'jejudo'
  };
  blocks[23] = {
    color: 'red',
    texture: 'newyork'
  };
  return blocks;
}

function addBlocks() {
  const blocks = [];

  blocks[1] = {
    color: 'yellow'
  };
  blocks[2] = {
      color: 'yellow'
  };

  blocks[4] = {
    color: 'gray'
  };

  blocks[5] = {
    color: 'lime'
  };
  blocks[6] = {
    color: 'lime'
  };
  blocks[7] = {
    color: 'lime'
  };

  blocks[9] = {
    color: 'cyan'
  };
  blocks[10] = {
    color: 'cyan'
  };

  blocks[12] = {
    color: 'gray'
  };
  blocks[13] = {
    color: 'green'
  };
  blocks[14] = {
    color: 'green'
  };
  blocks[15] = {
    color: 'green'
  };

  blocks[17] = {
    color: 'orange'
  };
  blocks[18] = {
    color: 'orange'
  };
  blocks[19] = {
    color: 'orange'
  };

  blocks[20] = {
    color: 'gray'
  };

  blocks[22] = {
    color: 'purple'
  };
  blocks[23] = {
    color: 'purple'
  };

  blocks[25] = {
    color: 'blue'
  };
  blocks[26] = {
    color: 'blue'
  };
  blocks[28] = {
    color: 'gray'
  };
  blocks[29] = {
    color: 'red'
  };
  blocks[31] = {
    color: 'red'
  };

  return blocks;
};

export { World }
