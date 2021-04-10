import React, { Component } from 'react'
import axios from 'axios'
import {format} from  'timeago.js'
import {Link} from 'react-router-dom'

export default class NoteList extends Component {
    state={
        notes:[],
        uri:'http://localhost:4000/api/notes/',
    }
    getNotes=async()=>{
        const res =  await axios.get(this.state.uri)
        this.setState({
            notes:res.data
        })
    }
    componentDidMount(){
        this.getNotes()
    }
    deleteNote=async id=>{
       await axios.delete(this.state.uri+id)
       this.getNotes()
    }
    render() {
        return (
            <div>
                {
                    this.state.notes.map(note=>(
                        <div className="note" key={note._id}>
                            <h2>{note.title} </h2>
                            <p>{note.author}</p>
                            <p>{note.description}</p>
                            <p>{format(note.date)}</p>
                            <button onClick={()=>this.deleteNote(note._id)} >
                                delete
                            </button>
                            <Link to={'/edit/'+note._id}> 
                                Edit
                            </Link>
                        </div>

                    ))
                }
            </div>
        )
    }
}
