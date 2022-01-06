import Trash from "../../apis/trash";
import {Message} from "element-ui";
import notebook from "./notebook";

const state ={
  trashNotes:null,
  curTrashNoteId:null
}
const getters ={
  trashNotes: state => state.trashNotes || [],
  curTrashNote:(state,getters) =>{
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(trashNote => trashNote.id == state.curTrashNoteId) || {}
  },
  belongTo:(state,getters,rootGetters) => {
    if(rootGetters.notebook.notebooks){
      let notebook = rootGetters.notebook.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId)|| {}
      return notebook.title || ''
    }

  }
}
const mutations ={
  setTrashNote(state,payload){
    state.trashNotes = payload.trashNotes
  },
  addTrashNote(state,payload){
    state.trashNotes.unshift(payload.trashNote)
  },
  deleteTrashNote(state,payload){
    state.trashNotes = state.trashNotes.filter(trashNote => trashNote.id !== payload.trashNoteId)
  },
  setCurTrashNote(state,payload){
    state.curTrashNoteId = payload.curTrashNoteId
  }
}
const actions ={
   getTrashNote({commit}){
     return Trash.getAll().then(res=>{
       commit('setTrashNote', {trashNotes:res.data})
     })
   },
  deleteTrashNote({commit},{noteId}) {
     return Trash.deleteNote({noteId}).then(res=>{
       commit('deleteTrashNote',{trashNoteId:noteId})
       Message.success(res.msg)
     })
  },
  revertTrashNote({commit},{noteId}){
     return Trash.revertNote({noteId}).then(res =>{
       commit('deleteTrashNote',{trashNoteId:noteId})
       Message.success(res.msg)
     })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
