<script>
let canvas = document.createElement("canvas");
import Params from "../Params";

/**
 * 盤面を描画してCANVASを返す。
 */
function drawBoard(element, canvas) {
  const canvSize = Params.CANV_SIZE *3;
  let cellSize = canvSize / 6;
  canvas.width = canvSize;
  canvas.height = canvSize;
  let ctx_board = canvas.getContext("2d");
  ctx_board.clearRect(0, 0, canvSize, canvSize);

  let grad = ctx_board.createLinearGradient(0, 0, canvSize, canvSize);
  grad.addColorStop(0, Params.COLOR_PANEL_6);
  grad.addColorStop(0.3, Params.COLOR_PANEL_5);
  grad.addColorStop(1, Params.COLOR_PANEL_4);

  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
      // パネル描画
      ctx_board.strokeStyle = Params.COLOR_LINE;
      if (y === 0) {
        ctx_board.fillStyle = Params.COLOR_PANEL_1;
      } else if (y == 5) {
        ctx_board.fillStyle = Params.COLOR_PANEL_2;
      } else if ((x + y) % 2 === 0) {
        ctx_board.fillStyle = Params.COLOR_PANEL_3;
      } else {
        ctx_board.fillStyle = Params.COLOR_PANEL_4;
        ctx_board.fillStyle = grad;
      }
      ctx_board.beginPath();
      ctx_board.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx_board.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  element.setAttribute("href", canvas.toDataURL());
}
function drawBoard2(element, canvas) {
  const canvSize = Params.CANV_SIZE *3;
  const COLOR_WHITE = "#FFFFFF";
  let cellSize = canvSize / 6;
  let ctx_board2 = canvas.getContext("2d");
  ctx_board2.clearRect(0, 0, canvSize, canvSize);
  ctx_board2.globalAlpha = 0.07;
  ctx_board2.fillStyle = Params.COLOR_WHITE;
  ctx_board2.beginPath();
  ctx_board2.arc(
    cellSize * 1,
    -3 * cellSize,
    7 * cellSize,
    0,
    Math.PI * 2,
    false
  );
  ctx_board2.fill();

  element.setAttribute("href", canvas.toDataURL());
}
export default {
  data() {
    return {};
  },
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number
  },
  mounted() {
    drawBoard(this.$el.querySelector("#bg1"), canvas);
    drawBoard2(this.$el.querySelector("#bg2"), canvas);
  }
};
</script>
<template>
  <g>
    <image id="bg1" :x="x" :y="y" :width="w" :height="h" />
    <image id="bg2" :x="x" :y="y" :width="w" :height="h" />
  </g>
</template>
<style scoped>
</style>