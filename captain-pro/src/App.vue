<template>
  <div id="app">
    <div class="view-wrap">
      <div class="sale-headline fn-clear">
        <div class="headline-title">
          <p class="headtitle-style">{{titleMsg}}</p>
        </div>
        <div class="headline-btn">
          <button class="headbtn-style" @click="onShowAdd()">添加商品</button>
        </div>
      </div>
      <table>
        <tr>
          <th class="firstCol">商品名称</th>
          <th>价格</th>
          <th>库存</th>
          <th>销售</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,key) in itemsList" :key="key">
          <td >{{item.name}}</td>
          <td >{{item.price}}</td>
          <td >{{item.amount}}</td>
          <td >{{item.sale}}</td>
          <td>
            <a href="#" class="edit-btn" @click="onShowEdit(key)">编辑</a> |
            <a href="#" class="delete-btn" @click="onclickDel(key)">删除</a>
          </td>
        </tr>
      </table>
      <Siderbar>
        <div slot="body">
          <div class="slide-panel-body">
            <div class="slide-panel-body-content">
              <p>
                <span>商品名称</span><input class="firstInput" type="text" v-model="newItem.name">
              </p>
              <p>
                <span>商品价格</span><input type="text" v-model="newItem.price"><span class="ex-title">原价</span><input type="text">
              </p>
              <p>
                <span>库存</span><input type="text" v-model="newItem.amount">
              </p>
              <p>
                <span>商品编码</span><input type="text">
              </p>
              <p>
                <span>运费</span>
                <input type="radio" name="fee" id="free"><label for="free">包邮</label>
                <input type="radio" name="fee" id="nofree"><label for="nofree">统一邮费</label>
              </p>
            </div>
          </div>
        </div>
      </Siderbar>
    </div>
  </div>
</template>

<script>
import Siderbar from './components/siderbar'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      newItem: {
        name: '',
        price: '',
        amount: '',
        sale: 0
      }
    }
  },
  computed: mapState({
    show: state => state.show,
    titleMsg: state => state.titleMsg,
    itemsList: state => state.items
  }),
  //   show () {
  //     return this.$store.state.show
  //   },
  //   titleMsg () {
  //     return this.$store.state.titleMsg
  //   },
  //   itemsList () {
  //     return this.$store.state.items
  //   }
  // },
  components: {
    Siderbar
  },
  methods: {
    onShow () {
      this.$store.commit('onclickShow')
    },
    onShowAdd () {
      this.$store.commit('onclickShowAdd')
      this.newItem.name = ''
      this.newItem.price = ''
      this.newItem.amount = ''
    },
    onShowEdit (key) {
      this.$store.commit('onclickShowEdit')
      var item = this.$store.state.items[key]
      this.newItem.name = item.name
      this.newItem.price = item.price
      this.newItem.amount = item.amount
      this.newItem.sale = item.sale
    },
    onclickDel (key) {
      console.log(key)
      this.$store.commit('deleteItem', key)
    },
    onclickAdd () {
      this.$store.commit('addItem', this.newItem)
    },
    onclickEdit () {
      this.$store.commit('editItem', this.newItem)
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow: hidden;
}
.fn-clear:after{
  display: block;
  content: "";
  clear: both;
}
#app .view-wrap {
  width: 805px;
  margin: 60px auto 0;
}
#app .view-wrap .sale-headline {
  width: 100%;
  height: 60px;
  background-color: #f9f8f4;
  border: 1px solid #e3e6e9;
}
#app .view-wrap .sale-headline .headline-title {
  float: left;
  margin-left: 60px;
  margin-top: 20px;
}
#app .view-wrap .sale-headline .headline-btn {
  float: right;
  margin-right: 70px;
  margin-top: 15px;
}
#app .view-wrap .sale-headline .headtitle-style {
  font-size: 18px;
}
#app .view-wrap .sale-headline .headbtn-style {
  height: 35px;
  color: #f8dec5;
  border-radius: 5px;
  background-color: #fa982e;
  font-size: 18px;
  padding: 0 20px;
  line-height: 35px;
}
#app .view-wrap table {
  width: 805px;
  font-size: 14px;
  border-collapse: collapse;
  border: 1px solid #e3e6e9;
}
#app .view-wrap table tr th {
  background-color: #f9f8f4;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #e3e6e9;
  line-height: 40px;
  padding-left: 20px;
}
#app .view-wrap table tr td {
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #e3e6e9;
  line-height: 40px;
  padding-left: 25px;
}
#app .view-wrap table tr th.firstCol {
  width: 160px;
}
/* #app .view-wrap table td .edit-btn {
    text-align:left;
    color: #3d61d8;
}
#app .view-wrap table td .delete-btn {
    text-align:left;
    color: #3d61d8;
}
#app .view-wrap table td {
    height: 65px;
    text-align: center;
    vertical-align: middle;
    line-height: 65px;
} */
/* 防止用户自定义背景颜色对网页的影响，添加让用户可以自定义字体 */
html{
    color:#000;background:#fff;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}
/* 内外边距通常让各个浏览器样式的表现位置不同 */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
    margin:0;padding:0;
}
.slide-panel-header {
  position: absolute;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #f9f9f9;
  top: 0px;
}
.slide-panel-footer {
  position: absolute;
  height: 60px;
  width: 100%;
  bottom: 0px;
  background-color: #f9f9f9;
}
.slide-panel-body {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 40px;
}
.slide-panel-body-content {
  width: 420px;
  margin: 0 auto;
}
.slide-panel-body-content p {
  height: 40px;
  text-align: left;
  line-height: 40px;
}
.slide-panel-body-content p span.ex-title {
  width: 30px;
  margin-right: 0px;
  font-size: 10px;
  border: 1px solid #f9f9f9;;
  height: 20px;
  line-height: 20px;
  background-color: #f9f9f9;
}
.slide-panel-body-content p span {
  width:70px;
  display: inline-block;
  margin-right: 20px;
}
.slide-panel-body-content p input {
  margin-right: 15px;
  height: 18px;
}
.slide-panel-body-content p input.firstInput {
  width: 305px;
}
.slide-panel-header-title {
  position: absolute;
  margin-left: 40px;
  text-align: left;
  font-size: 14px;
}
.slide-panel-header-close {
  position: absolute;
  background-color: #f2f2f2;
  right: 0;
  top: 0;
  width: 50px;
  height: 40px;
  font-size: 14px;
}
.slide-panel-footer-define {
  height: 33px;
  line-height: 33px;
  display: inline-block;
  padding: 0 20px;
  margin: auto 0;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  border-radius: 3px;
  background-color: #f09133;
  color: #ebebeb;
  border: none;
  margin-top: 15px;
}
.slide-panel-footer-close {
  height: 33px;
  line-height: 33px;
  display: inline-block;
  padding: 0 20px;
  margin: auto 0;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  border-radius: 3px;
  background-color: #ebebeb;
  color: #666;
  border: none;
  margin-top: 15px;
}
</style>
