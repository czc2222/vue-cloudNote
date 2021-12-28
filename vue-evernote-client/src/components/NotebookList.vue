<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> <span>新建笔记本</span></a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :to="`/note/${notebook.id}`" class="notebook" :key="notebook.id">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
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
import {friendlyDate} from '@/helpers/util'

window.Notebooks = Notebooks

export default {
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'})
      }
    })
    Notebooks.getAll().then(res => {
      console.log(res.data);
      this.notebooks = res.data
    })
  },
  methods: {
    onEdit(notebook) {
      let title
      this.$prompt('请输入新笔记本的标题', '修改标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue:notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, {title})
      }).then(res => {
        notebook.title = title
        this.$message({
          type: 'success',
          message: res.msg
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '放弃修改'
        });
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id)
      }).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });

    },
    onCreate() {
      this.$prompt('请输入新笔记本的标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        return Notebooks.addNotebook({title: value})
      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message({
          type: 'success',
          message: res.msg
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      })

    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebookList.less);
</style>
