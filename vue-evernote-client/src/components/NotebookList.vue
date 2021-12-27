<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link  v-for="notebook in notebooks" :to="`/note/${notebook.id}`" class="notebook" :key="notebook.id">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.createdAt}}</span>
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
      notebooks:[]
    }
  },
  created() {
    auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
    Notebooks.getAll().then(res=>{
      console.log(res.data);
      this.notebooks =res.data
    })
  },
  methods:{
    onEdit(notebook){
      const title =window.prompt('修改标题',notebook.title)
      Notebooks.updateNotebook(notebook.id,{title}).then(res=>{
        notebook.title = title
        alert(res.msg)
      })
    },
    onDelete(notebook){
      const isConfirm =window.confirm('你确定要删除吗')
      if(isConfirm){
        Notebooks.deleteNotebook(notebook.id).then(res=>{
          console.log(res);
          this.notebooks.splice(this.notebooks.indexOf(notebook),1)
          alert(res.msg)
        })
      }


    },
    onCreate(){
      const title = window.prompt('创建笔记本')
      if(title.trim() === ''){
        alert('笔记本名称不能为空')
      }else {
        Notebooks.addNotebook({title}).then(res=>{
          console.log(res.data);

          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebookList.less);
</style>
