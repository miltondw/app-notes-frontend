import React, { Component } from 'react'
import axios from 'axios'
export default class CreateUser extends Component {

    state = {
        users:[],
        username:'',
        uri:'http://localhost:4000/api/users/'
    }

    getUsers=async ()=>{
        const res=  await axios.get(this.state.uri)
        this.setState({
            users:res.data
        })
    }

    componentDidMount(){
      this.getUsers()
    }
    onChangeUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }
    onSubmit=async (e)=>{
        e.preventDefault()
        await axios.post(this.state.uri,{
           username:this.state.username
       })
       this.setState({
           username:''
       })
       this.getUsers()
    }
    deleteUser= async (id)=>{
        await axios.delete(this.state.uri+id)
        this.getUsers()
        console.log(id)
    }
    render() {
        return (
            <div>
              <form onSubmit={this.onSubmit}>
                  <h3>Create user</h3>
                  <input type="text" 
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
                  <button 
                  type="submit"
                  >
                      Save
                  </button>
              </form>
              {
                  this.state.users.map(user =>(
                      <li
                      key={user._id}
                      onDoubleClick={()=>this.deleteUser(user._id)}
                      >
                          {user.username}
                      </li>
                  ))
              }
            </div>
        )
    }
}
