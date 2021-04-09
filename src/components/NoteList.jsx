import axios from 'axios';
import React, { Component } from 'react';

class NoteList extends Component {
    state={
        notes:[]
    }
    async componentDidMount(){
      const res= await axios.get('http://localhost:4000/api/notes')
      this.setState({
         notes:res.data
     })
    }
    render() {
        return (
            <div className="noteList">
                {
                    this.state.notes.map(note =>(<div className="noteList__card" key={note._id}>
                        <h2 className="noteList__title">{note.title}</h2>
                        <h3 className="noteList__author" >{note.author}</h3>
                        <p className="noteList__description">{note.description}</p>
                        <div className="noteList-content__btn">
                        <button className="noteList-btn__edit">
                            Edit
                        </button>
                        <button className="noteList-btn__delete">
                            Delete
                        </button>
                        </div>
                    </div>))
                }
            </div>
        );
    }
}

export default NoteList;