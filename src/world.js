function World(data) {

  data.blocks = addBlocks();

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
