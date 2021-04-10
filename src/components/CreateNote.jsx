import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state={
        uri:'http://localhost:4000/api/',
        users:[],
        userselected:'',
        description:'',
        title:'',
        date:new Date(),
        editing:false,
        _id:''
    }

    async componentDidMount(){
        const res= await axios.get(this.state.uri+'users')
        this.setState({users:res.data.map(user=> user.username),
                        userselected:res.data[0].username})
        if(this.props.match.params.id){
            const res =await axios.get(this.state.uri+'notes/'+this.props.match.params.id)
            const NewNote = res.data
            this.setState({
                editing:true,
                _id:this.props.match.params.id,
                userselected:NewNote.author,
                description:NewNote.description,
                title:NewNote.title,
                date:new Date(NewNote.date)
            })
        }
    }
    onSubmit=async e=>{
        e.preventDefault()
        const newNote={
            title:this.state.title,
            author:this.state.userselected,
            description:this.state.description,
            date:this.state.date
        }
        if(this.state.editing){
            await axios.put(this.state.uri+'notes/'+this.state._id,newNote)
        }else{
            await axios.post(this.state.uri+'notes',newNote)
        }
        window.location.href="/"
    }
    onINputChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onChangeDate=date=>{
        this.setState({date})
    }
    render() {
        return (
            <div>
                <h3>Create Note</h3>
                <select 
                    name="userselected" 
                    onChange={this.onINputChange}
                    value={this.state.userselected}
                >
                    {
                        this.state.users.map(user=>(
                            <option value={user} key={user}>
                                {user}
                            </option>
                        ))
                    }
                </select>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    onChange={this.onINputChange} 
                    value={this.state.title}
                    required
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    onChange={this.onINputChange} 
                    value={this.state.description}
                    required
                ></textarea>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                />
                <form onSubmit={this.onSubmit}>
                    <button type="submit">
                        save
                    </button>
                </form>
            </div>
        )
    }
}
