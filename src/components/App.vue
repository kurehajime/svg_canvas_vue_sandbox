<script>
import Board from "./Board";
import Ai from "../Ai";
import Utils from "../Utils";
import Params from "../Params";

export default {
  components: { Board },
  data() {
    return {
      map: Utils.ShuffleBoard(),
      hover: null,
      turn_player: 1,
      winner: null,
      goaled: false,
      logArray: [],
      logArray2: [],
      thisHand: null,
      map_list: {},
      blueScore:0,
      redScore:0,
    };
  },
  methods: {
    clickCell(cellNumber) {
      let { x, y } = Utils.CellNumberToPoint(
        this.$el.getBoundingClientRect().width,
        this.$el.getBoundingClientRect().height,
        cellNumber
      );

      if (this.winner != null) {
        return;
      }

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
          this.calcScore(this.map);
          if (this.winner === null) {
            window.setTimeout(() => {
              this.ai(5);
              this.calcScore(this.map);
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
      let depth = this.getDepth(thisMap, level);
      hand = Ai.thinkAI(thisMap, this.turn_player, depth)[0];
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
    },
    getDepth(map, level) {
      let count = this.getNodeCount(map) / 2;
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
      return level + plus + 1;
    },
    calcScore(map) {
      let sum1 = 0;
      let sum2 = 0;
      let GoalTop = [0, 10, 20, 30, 40, 50];
      let GoalBottom = [5, 15, 25, 35, 45, 55];
      let thisMap = map;
      // 点数勝利
      for (let i in GoalTop) {
        if (thisMap[GoalTop[i]] * 1 > 0) {
          sum1 += thisMap[GoalTop[i]];
        }
      }
      for (let i in GoalBottom) {
        if (thisMap[GoalBottom[i]] * -1 > 0) {
          sum2 += thisMap[GoalBottom[i]];
        }
      }
      if (sum1 >= 8) {
        this.winner = 1;
      } else if (sum2 <= -8) {
        this.winner = -1;
      }

      // 手詰まりは判定
      if (this.isNoneNode(thisMap)) {
        if (Math.abs(sum1) > Math.abs(sum2)) {
          this.winner = 1;
        } else if (Math.abs(sum1) < Math.abs(sum2)) {
          // 引き分けは後攻勝利
          this.winner = -1;
        } else if (Math.abs(sum1) == Math.abs(sum2)) {
          this.winner = 0;
        }
      } else {
        if (this.is1000day(thisMap) === true) {
          this.winner = 0;
        }
      }
      this.blueScore = Math.abs(sum1);
      this.redScore = Math.abs(sum2);
      this.updateMessage();
    },
    isNoneNode(wkMap) {
      let flag1 = false;
      let flag2 = false;
      for (let panel_num in wkMap) {
        if (wkMap[panel_num] === 0) {
          continue;
        }
        let canMove = Ai.getCanMovePanelX(panel_num, wkMap);
        if (canMove.length !== 0) {
          if (wkMap[panel_num] > 0) {
            flag1 = true;
          } else if (wkMap[panel_num] < 0) {
            flag2 = true;
          }
        }
        if (flag1 && flag2) {
          return false;
        }
      }
      return true;
    },
    is1000day(wkMap) {
      let map_json = JSON.stringify(wkMap);
      if (this.map_list[map_json] === undefined) {
        this.map_list[map_json] = 1;
        return false;
      } else {
        this.map_list[map_json] += 1;
      }
      if (this.map_list[map_json] >= Params.LIMIT_1000DAY) {
        return true;
      }
      return false;
    },
    updateMessage() {
      // let Block = "";
      // document.querySelector("#blue").innerHTML = "Blue: " + blueScore + "/8";
      // document.querySelector("#red").innerHTML = " Red: " + redScore + "/8";
      // document.querySelector("#time").innerHTML =
      //   "(" + thinktime.toFixed(3) + "sec)";
      if (this.logArray.length === 0) {
        if (this.winner == 1) {
          // message = "You win!";
          // storage.setItem(
          //   "level_" + document.querySelector("#level").value,
          //   parseInt(
          //     storage.getItem("level_" + document.querySelector("#level").value)
          //   ) + 1
          // );
          // endgame();
        } else if (this.winner == -1) {
          // message = "You lose...";
          // storage.setItem("level_" + document.querySelector("#level").value, 0);
          // endgame();
        } else if (this.winner === 0) {
          // if (map_list[JSON.stringify(thisMap)] >= LIMIT_1000DAY) {
          //   message = "3fold repetition";
          // } else {
          //   message = "-- Draw --";
          // }
          // endgame();
        }
      }
    }
  },computed:{
    message:function(){
      var mes = "";
      mes += this.turn_player == 1 ? "Your turn <br/>" :"COM's turn  <br/>";
      mes += "Blue : " + this.blueScore + " / Red : " + this.redScore + "  <br/>";
      if(this.winner ==1){
        mes += "You win  <br/>";
      }else if (this.winner ==-1){
        mes += "You lose  <br/>";
      }
      return mes;
    }
  }
};
</script>
<template>
<div>
  <board :map="map" :hover="hover" @clickCell="clickCell" />
  <p style="white-space:pre-wrap; word-wrap:break-word;" v-html="message" />
</div>
</template>
<style scoped>
</style>