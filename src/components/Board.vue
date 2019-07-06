<script>
import Piece from "./Piece";

export default {
  components: { Piece },
  data() {
    return {
      fill: "#123456",
      title: "hello",
      pieces: [
        { id: 1, number:1, x: 10, y: 15 },
        { id: 2, number:-2, x: 110, y: 115 },
        { id: 3, number:3, x: 210, y: 215 },
        { id: 4, number:-4, x: 310, y: 315 },
      ]
    };
  }
};
</script>
<template>
  <svg width ="500" height="500">
    <text x="0" y="10" font-size="10" :fill="fill">あいうえお</text>
    <piece v-for="p in pieces" :key="p.id" :x="p.x" :y="p.y" :number="p.number" />
  </svg>
</template>
<style scoped>
</style>