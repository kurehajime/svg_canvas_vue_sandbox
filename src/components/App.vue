<script>
import Board from './Board'
import Ai from '../Ai'
import Utils from "../Utils";

export default {
  components: {Board},
  data() {
   return {
     map: Utils.ShuffleBoard(),
     hover:null,
    }
  },
  methods: {
    clickCell(cellNumber){
      let { x, y } = Utils.CellNumberToPoint(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        cellNumber
      );
      // this.map[0].x = x;
      // this.map[0].y = y;



    if(this.hover == null){
      if(this.map[cellNumber]!=null){
        this.hover = cellNumber;
      }
    }else{
      let canm = Ai.getCanMovePanelX(this.hover, this.map);
      if (canm.indexOf(cellNumber) >= 0) {
        let nextMap =Array.from(this.map);
        nextMap[cellNumber] = nextMap[this.hover];
        nextMap[this.hover] = null;
        this.map = nextMap;
        this.hover = null;
      }else{
        this.hover = null;
      }
    }


    }
  }
}
</script>
<template>
  <board :map = "map" :hover="hover" @clickCell="clickCell"/>
</template>
<style scoped>
</style>