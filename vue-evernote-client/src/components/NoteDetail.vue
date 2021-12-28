<template>
  <div id="note-detail">
    <h1>{{msg}} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
import auth from "../apis/auth";

export default {
  data () {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  }
}
</script>

<style lang="less" scoped>
h1 {
  color: blue;
}
</style>
