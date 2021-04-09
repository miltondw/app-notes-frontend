import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NavLink } from 'react-router-dom';

class CreateNote extends Component {

    state={
        users:[],
        userSelected:'',
        title:'',
        description:'',
        date:new Date()
    }

   async componentDidMount(){
      const res= await axios.get('http://localhost:4000/api/users')
      this.setState({
          users:res.data.map(user => user.username),
          userSelected:res.data[0].username
      })
    }

    onSubmit = async(e)=>{
        e.preventDefault()
        const newNote = {
            title:this.state.title,
            description:this.state.description,
            author:this.state.userSelected,
            date:this.state.date
        }
        await axios.post('http://localhost:4000/api/notes',newNote)
       
    }
    onInputChange=e=>{
     this.setState({
         [e.target.name]:e.target.value
     })
    }
    onChangeDate=date=>{
        this.setState({
            date
        })
    }
    render() {
        return (
            <div className="note">
                    <h4 className="note__title">Create a Note</h4>     
                    <select
                    name="userSelected"
                    onChange={this.onInputChange}
                    >
                        {
                            this.state.users.map(user => <option key={user} value={user}>{user}</option> )
                        }
                    </select>               
                <form className="note__form" onSubmit={this.onSubmit}>
                    <input 
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                    required
                    onChange={this.onInputChange}
                    />
                    <textarea name="description" placeholder="Description" onChange={this.onInputChange}></textarea>
                    <div className="note__date">
                    <DatePicker 
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                    />
                    </div>
                    <NavLink exact to="/" >
                    <button 
                    type="submit" 
                    className="btn note__btn">
                        Sabe
                    </button>
                    </NavLink>
                    </form>
            </div>
        );
    }
}

export default CreateNote;