export default class{
    static PointToCellNumber(width, height, x, y){
        let cellSize = width / 6;
        return Math.floor(x / cellSize) * 10 + Math.floor(y / cellSize);
    }

    static CellNumberToPoint(width, height, cellNumber){
        let cellSize = width / 6;
        let x = ~~(cellNumber / 10) * cellSize;
        let y = ~~(cellNumber % 10) * cellSize;
        return { x, y };
    }

    static MakePieces(){
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
    }
    static MapToPieces(width, height, map){
      let pieces = this.MakePieces();
      for (let m = 0; m < map.length; m++) {
        for (let p = 0; p < pieces.length; p++) {
          if (pieces[p].number == map[m]) {
            pieces[p].display = "inline";
            let { x, y } = this.CellNumberToPoint(width, height, m);
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
    }
    static ShuffleBoard(){
        let map = [];
        for (let num in map) {
          map[num] = 0;
        }
        let arr = [1, 2, 3, 4, 5, 6, 7, 8];
        let red_num = [0, 10, 20, 30, 40, 50, 11, 41];
        let blue_num = [55, 45, 35, 25, 15, 5, 44, 14];
        for (let i = arr.length - 1; i >= 0; i--) {
          let r = Math.floor(Math.random() * (i + 1));
          let tmp = arr[i];
          arr[i] = arr[r];
          arr[r] = tmp;
        }
        for (let num in blue_num) {
          map[blue_num[num]] = arr[num];
        }
        for (let num in red_num) {
          map[red_num[num]] = -1 * arr[num];
        }
        return map;
      }
}