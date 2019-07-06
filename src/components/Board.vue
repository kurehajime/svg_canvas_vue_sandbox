<script>
import Piece from "./Piece";

export default {
  components: { Piece },
  data() {
    return {
      fill: "#123456",
      title: "hello",
      pieces: [
        { id: 1, number:1, x: 10, y: 15 ,goal:false},
        { id: 2, number:-2, x: 110, y: 115 ,goal:false},
        { id: 3, number:3, x: 210, y: 215 ,goal:false},
        { id: 4, number:-4, x: 310, y: 315 ,goal:true},
      ]
    };
  },
  methods : {
    clicked : function(e){
        console.log("clicked:%d,%d", e.offsetX, e.offsetY);
        this.pieces[0].x=e.offsetX;
        this.pieces[0].y=e.offsetY;
    }
}
};
</script>
<template>
  <svg width ="500" height="500" @mousedown="clicked($event)">
    <text x="0" y="10" font-size="10" :fill="fill">あいうえお</text>
    <piece v-for="p in pieces" :key="p.id" :x="p.x" :y="p.y" :number="p.number" :goal="p.goal" />
  </svg>
</template>
<style scoped>
</style>