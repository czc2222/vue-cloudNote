import Note from "@/apis/notes";
import {Message} from "element-ui";


const state ={
  notes: null,
  currentNoteId:null,
}
const getters = {
  notes: state => state.notes || [],
  currentNote:state =>{
    if(!Array.isArray(state.notes)) return {title:'',content:''}
    if(!state.currentNoteId) return  state.notes[0] || {title:'',content:''}
    return  state.notes.find(note => note.id == state.currentNoteId) || {title:'',content:''}
  }
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
  },
  setCurrentNote(state,payload ={}){
    state.currentNoteId = payload.currentNoteId
  }
}
const actions ={
  getNotes({commit},{notebookId}){
    return Note.getAll({notebookId}).then(res=>{
      commit('setNotes',{notes:res.data})
    })
  },
  addNote({commit},{notebookId,title,content}){
    return Note.addNote({notebookId},{title,content}).then(res=>{
      commit('addNote',{note:res.data})
    })
  },
  updateNote({commit},{noteId,title,content}){
    return Note.updateNote({noteId},{title,content}).then(res=>{
      commit('updateNote',{noteId,title,content})
    })
  },
  deleteNote({commit}, {noteId}) {
    return Note.deleteNote({noteId}).then(res =>{
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
