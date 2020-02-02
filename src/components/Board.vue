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
      hover_piece : [],
      mouse_event : null,
    };
  },
  props: {
    map: Array,
    hover : Number,
  },
  watch: {
    mapAndHover: function(newVal, oldVal) {
      let newMap = Array.from(newVal[0]);
      let newHover = newVal[1];
      if(newHover != null){
        newMap[newHover] = null;
      }
      this.pieces = Utils.MapToPieces(Params.CANV_SIZE, Params.CANV_SIZE, newMap);
      this.mousemove(this.mouse_event);
    }
  },
  computed:{
    mapAndHover(){
      return [this.map,this.hover];
    }
  },
  methods: {
    clicked: function(e) {
      this.mouse_event = e;
      let cellNumber = Utils.PointToCellNumber(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        this.mouse_event.offsetX,
        this.mouse_event.offsetY
      );
      this.$emit('clickCell',cellNumber);
      this.mousemove(e);
    },
    mousemove: function(e){
      this.mouse_event = e;
      if(this.hover == null){
        this.hover_piece = [];
        return;
      }
      let hp = Utils.MakePiece();
      let plus= (Params.CANV_SIZE / 6)/2;
      hp.display ="inline"
      hp.number = this.map[this.hover];
      hp.x = this.mouse_event.offsetX -plus;
      hp.y = this.mouse_event.offsetY -plus;
      this.hover_piece =[hp];
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
    <!-- hover_piece -->
    <piece
      v-for="p in hover_piece"
      :key="'hover'+p.number"
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