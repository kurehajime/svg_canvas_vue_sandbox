<script>
import Piece from "./Piece";
import BackGround from "./BackGround";
import Params from "../Params";
import Utils from "../Utils";

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
        let { x, y } = Utils.CellNumberToPoint(width, height, m);
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
      pieces: pieces,
      hover : [],
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
      let cellNumber = Utils.PointToCellNumber(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        e.offsetX,
        e.offsetY
      );
      // let { x, y } = Utils.CellNumberToPoint(
      //   this.$el.getBoundingClientRect().width,
      //   this.$el.getBoundingClientRect().height,
      //   cellNumber
      // );
      // this.pieces[0].x = x;
      // this.pieces[0].y = y;
      this.$emit('clickCell',cellNumber);
    },
    mousemove: function(e){
      if(this.hover.length == 0){
        return;
      }

      let cellNumber = Utils.PointToCellNumber(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        e.offsetX,
        e.offsetY
      );
      console.log(cellNumber);
    }
  }
};
</script>
<template>
  <svg :width="board_w" :height="board_h" 
  @mousedown="clicked($event)"
  @mousemove="mousemove($event)">
    <backGround :x="board_x" :y="board_y" :w="board_w" :h="board_h" />
    <!-- map -->
    <piece
      v-for="p in pieces"
      :key="p.number"
      :x="p.x"
      :y="p.y"
      :number="p.number"
      :goal="p.goal"
      :display="p.display"
    />
    <!-- hover -->
    <piece
      v-for="p in hover"
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