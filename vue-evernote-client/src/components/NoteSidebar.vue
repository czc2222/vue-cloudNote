<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote" >添加笔记</span>
    <el-dropdown class="notebook-title"  @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{currentNotebook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item  command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${currentNotebook.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  created() {
    this.getNotebooks().then(()=>{
      this.setCurrentNotebook({currentNotebookId:this.$route.query.notebookId})
      // return this.getNotes({notebookId:this.currentNotebook.id})
      if(this.currentNotebook.id){
        return this.getNotes({notebookId:this.currentNotebook.id})
      }

    }).then(()=>{
      this.setCurrentNote({currentNoteId:this.$route.query.noteId})
      this.$router.replace({
        path:'/note',
        query:{
          noteId:this.currentNote.id,
          notebookId:this.currentNotebook.id
        }
      })
    })

  },

  data() {
    return {

    }
  },
  computed:{
    ...mapGetters(['notes','notebooks','currentNotebook','currentNote'])
  },

  methods: {
    ...mapMutations(['setCurrentNote','setCurrentNotebook']),
    ...mapActions(['getNotes','addNote','getNotebooks']),
    handleCommand(notebookId) {
      if(notebookId === 'trash'){
       return  this.$router.push({path:'/trash'})
      }
      this.setCurrentNotebook({currentNotebookId:notebookId})

      this.getNotes({notebookId}).then(()=>{
        this.setCurrentNote()
        this.$router.replace({
          path:'/note',
          query:{
            noteId:this.currentNote.id,
            notebookId:this.currentNotebook.id
          }
        })
      })

    },

    onAddNote() {
      this.addNote({notebookId:this.currentNotebook.id })

    }

  }
}

</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);

</style>
