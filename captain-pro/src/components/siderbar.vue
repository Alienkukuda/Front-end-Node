<template>
  <transition name="slide-fade">
    <div v-if="this.$store.state.show" class="slide-panel">
      <slot name="header">
        <div class="slide-panel-header">
          <h3 class="slide-panel-header-title" v-if="this.$store.state.isAdd">添加商品</h3>
          <h3 class="slide-panel-header-title" v-else>编辑商品</h3>
          <a class="slide-panel-header-close" @click="onShow"></a>
        </div>
      </slot>
      <slot name="body"></slot>
      <slot name="footer">
        <div class="slide-panel-footer">
          <button class="slide-panel-footer-define" v-if="this.$store.state.isAdd" @click="onclickAdd()">确定添加</button>
          <button class="slide-panel-footer-define" v-else @click="onclickEdit()">确定编辑</button>
          <button class="slide-panel-footer-close" @click="onShow">取消</button>
        </div>
      </slot>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    onShow () {
      this.$store.commit('onclickShow')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.slide-panel {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 500px;
  height: 100%;
  background: pink;
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(500px);
  opacity: 0;
}
</style>
