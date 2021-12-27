<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" ><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="book-list">
          <router-link  to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              <span></span>
              <span class="action" >编辑</span>
              <span class="action" >删除</span>
              <span class="date">}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import auth from "../apis/auth";
import Notebooks from "../apis/notebooks";
window.Notebooks = Notebooks

export default {
  data () {
    return {
      msg: '笔记本列表'
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
@import url(../assets/css/notebookList.less);
</style>
