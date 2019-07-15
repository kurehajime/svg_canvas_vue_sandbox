<script>
import Piece from "./Piece";
import BackGround from "./BackGround";
import Params from "../Params";

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
        let { x, y } = CellNumberToPoint(width, height, m);
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
    let pieces = MapToPieces(Params.CANV_SIZE, Params.CANV_SIZE, this.map);
    return {
      fill: "#123456",
      title: "hello",
      board_x: 0,
      board_y: 0,
      board_w: Params.CANV_SIZE,
      board_h: Params.CANV_SIZE,
      pieces: pieces
    };
  },
  props: {
    map: Array
  },
  watch: {
    map: function(newMap, oldMap) {
      this.pieces = MapToPieces(Params.CANV_SIZE, Params.CANV_SIZE, newMap);
    }
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
  <svg :width="board_w" :height="board_h" @mousedown="clicked($event)">
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