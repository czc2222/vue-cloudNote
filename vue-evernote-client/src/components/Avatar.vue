<template>
   <span :title="username">{{slug}}</span>
  </template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
   data() {
       return {
       }
     },
  computed:{
     ...mapGetters(['username','slug']),

  },
  created() {
    this.checkLogin({path: '/login'})
  },
  methods:{
     ...mapActions(['checkLogin'])
  }
}
</script>

<style lang="less" scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
