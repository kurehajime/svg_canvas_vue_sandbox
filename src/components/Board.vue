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
export default {
  components: { Piece ,BackGround},
  data() {
    return {
      fill: "#123456",
      title: "hello",
      board_x:0,
      board_y:0,
      board_w:500,
      board_h:500,
      pieces: [
        { id: 1, number: 1, x: 10, y: 15, goal: false },
        { id: 2, number: -2, x: 110, y: 115, goal: false },
        { id: 3, number: 3, x: 210, y: 215, goal: false },
        { id: 4, number: -4, x: 310, y: 315, goal: true }
      ]
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
    <piece v-for="p in pieces" :key="p.id" :x="p.x" :y="p.y" :number="p.number" :goal="p.goal" />
  </svg>
</template>
<style scoped>
</style>