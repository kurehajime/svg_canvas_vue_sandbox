<script>
import Piece from "./Piece";
import BackGround from "./BackGround";

const PointToCellNumber = (width, height, x, y) => {
  let cellSize = width / 6;
  return Math.floor(x / cellSize) * 10 + Math.floor(y / cellSize);
};
const CellNumberToPoint = (width, height, cellNumber) => {
  let cellSize = width / 6;
  let x = ~~(cellNumber / 10) * cellSize;
  let y = ~~(cellNumber % 10) * cellSize;
  return { x, y };
};

const MakePieces = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, -1, -2, -3, -4, -5, -6, -7, -8];
  let pieces = [];
  for (const i of numbers) {
    pieces.push({
      number: i,
      x: 0,
      y: 0,
      goal: false,
      display: "none"
    });
  }
  return pieces;
};

const MapToPieces = (width, height, map) => {
  let pieces = MakePieces();
  for (let m = 0; m < map.length; m++) {
    for (let p = 0; p < pieces.length; p++) {
      if (pieces[p].number == map[m]) {
        pieces[p].display = "inline";
        let {x,y} = CellNumberToPoint(width, height, m);
        pieces[p].x = x;
        pieces[p].y = y;
        let yy = ~~(m % 10);
        if (map[m] > 0 && yy === 0) {
          pieces[p].goal = true;
        } else if (map[m] < 0 && yy == 5) {
          pieces[p].goal = true;
        }
      }
    }
  }
  return pieces;
};

export default {
  components: { Piece, BackGround },
  data() {
    let map = [
      -1,
      0,
      0,
      0,
      0,
      6,
      0,
      0,
      0,
      0,
      -2,
      -8,
      0,
      0,
      7,
      5,
      0,
      0,
      0,
      0,
      -3,
      0,
      0,
      0,
      0,
      4,
      0,
      0,
      0,
      0,
      -4,
      0,
      0,
      0,
      0,
      3,
      0,
      0,
      0,
      0,
      -5,
      -7,
      0,
      0,
      8,
      2,
      0,
      0,
      0,
      0,
      -6,
      0,
      0,
      0,
      0,
      1
    ];
    let pieces = MapToPieces(500,500,map);
    return {
      fill: "#123456",
      title: "hello",
      board_x: 0,
      board_y: 0,
      board_w: 500,
      board_h: 500,
      pieces :pieces,
      // pieces: [
      //   { number: 1, x: 10, y: 15, goal: false, display: "inline" },
      //   { number: -2, x: 110, y: 115, goal: false, display: "inline" },
      //   { number: 3, x: 210, y: 215, goal: false, display: "inline" },
      //   { number: -4, x: 310, y: 315, goal: true, display: "none" }
      // ]
    };
  },
  methods: {
    clicked: function(e) {
      let cellNumber = PointToCellNumber(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        e.offsetX,
        e.offsetY
      );
      let { x, y } = CellNumberToPoint(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        cellNumber
      );
      this.pieces[0].x = x;
      this.pieces[0].y = y;
    }
  }
};
</script>
<template>
  <svg width="500" height="500" @mousedown="clicked($event)">
    <backGround :x="board_x" :y="board_y" :w="board_w" :h="board_h" />
    <text x="0" y="10" font-size="10" :fill="fill">あいうえお</text>
    <piece
      v-for="p in pieces"
      :key="p.number"
      :x="p.x"
      :y="p.y"
      :number="p.number"
      :goal="p.goal"
      :display="p.display"
    />
  </svg>
</template>
<style scoped>
</style>