import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  titleMsg: '出售中的商品',
  isAdd: false,
  show: false,
  items: [{
    name: 'captain1',
    price: 20,
    amount: 8,
    sale: 0
  },
  {
    name: 'captain2',
    price: 20,
    amount: 10,
    sale: 0
  },
  {
    name: 'captain3',
    price: 20,
    amount: 10,
    sale: 0
  }
  ]
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
