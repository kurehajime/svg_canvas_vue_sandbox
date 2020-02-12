<script>
import Board from "./Board";
import Ai from "../Ai";
import Utils from "../Utils";

export default {
  components: { Board },
  data() {
    return {
      map: Utils.ShuffleBoard(),
      hover: null,
      turn_player: 1,
      winner: null,
      goaled:false,
      logArray2:[],
      thisHand:null,
    };
  },
  methods: {
    clickCell(cellNumber) {
      let { x, y } = Utils.CellNumberToPoint(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        cellNumber
      );
      // this.map[0].x = x;
      // this.map[0].y = y;

      if (this.hover == null) {
        if (this.map[cellNumber] != null) {
          this.hover = cellNumber;
        }
      } else {
        let canm = Ai.getCanMovePanelX(this.hover, this.map);
        if (canm.indexOf(cellNumber) >= 0) {
          let nextMap = Array.from(this.map);
          nextMap[cellNumber] = nextMap[this.hover];
          nextMap[this.hover] = null;
          this.map = nextMap;
          this.hover = null;
          this.turn_player = this.turn_player * -1;

          if (this.winner === null) {
            window.setTimeout(()=>{
              this.ai(5);
            }, 250);
          }
        } else {
          this.hover = null;
        }
      }
    },
    ai(level) {
      let hand;
      let thisMap = Array.from(this.map);
      // 終盤になったら長考してみる。
      let count = this.getNodeCount(thisMap) / 2;
      let plus = 0;
      level = parseInt(level);
      switch (level) {
        case 1:
          if (count <= 7) {
            plus++;
          }
          break;
        case 2:
          if (count <= 8) {
            plus++;
          }
          break;
        case 3:
          if (count <= 10) {
            plus++;
          }
          if (count <= 6) {
            plus++;
          }
          break;
        case 4:
          if (count <= 11) {
            plus++;
          }
          if (count <= 7) {
            plus++;
          }
          break;
        case 5:
          if (count > 16) {
            plus--;
          }
          if (count <= 12) {
            plus++;
          }
          if (count <= 8) {
            plus++;
          }
          break;
        case 6:
          if (count > 16) {
            plus--;
          }
          if (count <= 12) {
            plus++;
          }
          if (count <= 8) {
            plus++;
          }
          break;
      }

      hand = Ai.thinkAI(thisMap, this.turn_player, level + plus + 1)[0];
      this.thisHand = hand;
      if (hand) {
        thisMap[hand[1]] = thisMap[hand[0]];
        thisMap[hand[0]] = 0;
        this.logArray2.push([hand[0], hand[1]]);
      }
      this.turn_player = this.turn_player * -1;
      this.map = thisMap;
    },
    getNodeCount(wkMap) {
      let count = 0;
      for (let panel_num in wkMap) {
        if (wkMap[panel_num] === 0) {
          continue;
        }
        let canMove = Ai.getCanMovePanelX(panel_num, wkMap);
        count += canMove.length;
      }
      return count;
    },
    isGoaled(map, afterHand, turn) {
      if (turn > 0) {
        if (afterHand % 10 === 0) {
          return true;
        }
      } else if (turn < 0) {
        if (afterHand % 10 === 5) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<template>
  <board :map="map" :hover="hover" @clickCell="clickCell" />
</template>
<style scoped>
</style>