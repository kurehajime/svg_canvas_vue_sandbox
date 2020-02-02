<script>
import Piece from "./Piece";
import BackGround from "./BackGround";
import Params from "../Params";
import Utils from "../Utils";



export default {
  components: { Piece, BackGround },
  data() {
    let pieces = Utils.MapToPieces(Params.CANV_SIZE, Params.CANV_SIZE, this.map);
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
      this.pieces = Utils.MapToPieces(Params.CANV_SIZE, Params.CANV_SIZE, newMap);
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