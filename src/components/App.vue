<script>
import Board from './Board'
import Utils from "../Utils";

export default {
  components: {Board},
  data() {
   return {
     map: Utils.ShuffleBoard(),
    }
  },
  methods: {
    clickCell(cellNumber){
      console.log(cellNumber);
      let { x, y } = Utils.CellNumberToPoint(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        cellNumber
      );
      // this.map[0].x = x;
      // this.map[0].y = y;
      console.log(this.map);
    }
  }
}
</script>
<template>
  <board :map = "map" @clickCell="clickCell"/>
</template>
<style scoped>
</style>