import Note from "@/apis/notes";
import {Message} from "element-ui";

const state ={
  notes: [],
  currentNote:{},
}
const getters = {
  notes: state => state.notes
}
const mutations ={
  setNotes(state,payload){
    state.notes = payload.notes
  },
  addNote(state,payload){
    state.notes.unshift(payload.note)
  },
  updateNote(state,payload){
    const note = state.notes.find(note => note.id === payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  },
  deleteNote(state,payload){
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  }
}
const actions ={
  getNotes({commit},{notebookId}){
    Note.getAll({notebookId}).then(res=>{
      commit('setNotes',{notes:res.data})
    })
  },
  addNote({commit},{notebookId,title,content}){
    Note.addNote({notebookId},{title,content}).then(res=>{
      commit('addNote',{note:res.data})
      Message.success(res.msg)
    })
  },
  updateNote({commit},{noteId,title,content}){
    Note.updateNote({noteId},{title,content}).then(res=>{
      commit('updateNote',{noteId,title,content})
      Message.success(res.msg)
    })
  },
  deleteNote({commit}, {noteId}) {
    Note.deleteNotebook({noteId}).then(res =>{
      commit('deleteNote',{noteId})
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
