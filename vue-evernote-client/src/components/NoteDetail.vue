<template>
  <div id="note" class="detail">
    <NoteSidebar :value.sync="notes"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{currentNote.createdAtFriendly}}</span>
          <span> 更新日期: {{currentNote.updatedAtFriendly}}</span>
          <span> {{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview =!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model:value="currentNote.title"
                 placeholder="输入标题" @input="onUpdateNote "
                 @keydown="statusText = '正在输入...'">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview"
                    v-model:value="currentNote.content"
                    placeholder="输入内容, 支持 markdown 语法"
                    @input="onUpdateNote"
                    @keydown="statusText = '正在输入...'">></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import NoteSidebar from "./NoteSidebar";
import _ from 'lodash'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt();
export default {
  data () {
    return {
      statusText:'笔记未改动',
      isShowPreview:false,
    }
  },
  components:{
    NoteSidebar
  },
  created() {
    this.checkLogin({path:'/login'})


  },
  computed:{
    ...mapGetters(['currentNote','notes']),
    previewContent(){
      return md.render(this.currentNote.content || '')
    }
  },
  methods:{
    ...mapMutations(['setCurrentNote']),
    ...mapActions(['updateNote','deleteNote','checkLogin']),
    onUpdateNote:_.debounce(function (){//lodash.debounce 节流
      this.updateNote({noteId:this.currentNote.id,title:this.currentNote.title,content:this.currentNote.content})
        .then(data=>{
          this.statusText = '已保存'
        }).catch(data=>{
        this.statusText = '保存出错'
      })
    },300),
    onDeleteNote(){
      this.deleteNote({noteId:this.currentNote.id}).then(()=>{
        this.$router.replace({path:'/note'})
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setCurrentNote({currentNoteId:to.query.noteId})
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
