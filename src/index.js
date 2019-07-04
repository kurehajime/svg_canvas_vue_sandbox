import Vue from 'vue'
import Board from './components/Board'

new Vue({
  el: '#app', // アプリをマウントする要素
  components: { Board }, // Appというコンポーネント
  template: '<board/>', // el(今回は#app)の中に表示する内容
})