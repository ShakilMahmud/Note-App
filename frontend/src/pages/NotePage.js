import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom';


const NotePage = () => {
    let {id} = useParams()
    let navigate = useNavigate();
    let [note,setNote] = useState(null)
    console.log(id)

    useEffect(() => {
        getNote()
    },[id])

    let getNote = async () => {
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () =>{
      fetch(`/api/notes/`, {
        method : "POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(note)
      })
       
    }

    let updateNote = async () =>{
      fetch(`/api/notes/${id}/update/`, {
        method : "PUT",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(note)
      })
       
    }

let deleteNote = async => {
  fetch(`/api/notes/${id}/delete/`,{
    method : "DELETE",
    headers:{
      'Content-type':'application/json'
    },
  })
  navigate('/');
}


    let handleSubmit = () => {
      console.log(note)
      if(id!=='new' && note.body === ''){
        deleteNote()
      }
      else if(id!=='new'){
        updateNote()
      }
      else if(id==='new' && note!==null){
        createNote()
        
      }
     
      navigate('/');
  
    }

  return (
    <div className='note'>
      <div className='note-header'>
          <h3>
            {/* <Link to="/"> */}
              <ArrowLeft onClick={handleSubmit}/>
            {/* </Link>   */}
          </h3> 
          { id!=='new'?(
            <button onClick={deleteNote}>Delete</button>
          ):(
            <button onClick={handleSubmit}>Done</button>
          )}
          
      </div>
      <textarea  onChange={(e) => { setNote({ ...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage
