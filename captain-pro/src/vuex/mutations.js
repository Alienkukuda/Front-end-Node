export default {
  onclickShow (state) {
    state.show = !state.show
  },
  onclickShowAdd (state) {
    state.show = !state.show
    state.isAdd = !state.isAdd
  },
  onclickShowEdit (state) {
    state.show = !state.show
    state.isAdd = !state.isAdd
  },
  changeTitleMsg (state, str) {
    state.titleMsg = str
  },
  deleteItem (state, payload) {
    state.items.splice(payload, 1)
  },
  addItem (state, payload) {
    console.log(state)
    state.items.push({name: payload.name, price: payload.price, amount: payload.amount, sale: 0})
    state.show = !state.show
  },
  editItem (state, payload) {
    state.items.forEach(function (val, index) {
      if (val.name === payload.name) {
        val.price = payload.price
        val.amount = payload.amount
        val.sale = payload.sale
      }
    })
    state.show = !state.show
  }
}
