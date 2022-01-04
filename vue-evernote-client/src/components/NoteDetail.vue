<template>
  <div id="note" class="detail">
    <NoteSidebar :value.sync="notes"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{currentNote.createdAtFriendly}}</span>
          <span> 更新日期: {{currentNote.updatedAtFriendly}}</span>
          <span> {{currentNote.statusText}}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="currentNote.title" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true"   v-model:value="currentNote.content" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false">
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import auth from "../apis/auth";
import NoteSidebar from "./NoteSidebar";
import Bus from '@/helpers/bus'
export default {
  data () {
    return {
      currentNote: {},
      notes:[]
    }
  },
  components:{
    NoteSidebar
  },
  created() {
    auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
    Bus.$on('update:value',val =>{
      this.currentNote =val.find(note => note.id == this.$route.query.noteId) ||{}
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>
