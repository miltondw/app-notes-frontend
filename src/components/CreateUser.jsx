import React, { Component } from 'react';
import axios from 'axios'

class CreateUser extends Component {
    state ={
        users:[],
        username:''
    }

  async componentDidMount(){
       this.getUsers()
    }
     getUsers= async ()=>{
        const res= await axios.get('http://localhost:4000/api/users')
        this.setState({
            users:res.data
        })
    }
    onChangeUsername =e=>{
        this.setState({
            username:e.target.value
        })
    }
   onSubmit =async e=>{
       e.preventDefault()
       await axios.post('http://localhost:4000/api/users',{
           username:this.state.username
        })
        this.setState({
            username:''
        })
        this.getUsers()
    }
    deleteuser = async id=>{
       await axios.delete(`http://localhost:4000/api/users/${id}`)
       this.getUsers()
    }
    render() {
        return (
            <div className="content__users">
               <div className="form">
                   <div className="form__card">
                       <h2 className="form__title">Create new user</h2>
                       <form onSubmit={this.onSubmit}>
                               <input 
                               type="text" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               placeholder="Username"
                               />
                            <button type="submit" className="btn btn-user" >Save</button>
                       </form>

                   </div>
               </div>
               <ul className="list_users">
                   {
                       this.state.users.map(user=>(
                           <li 
                                className="list_users__item" 
                                key={user._id}
                                >
                               <p className="list_users__name">
                                   {
                                       user.username
                                   }
                               </p>
                               <i 
                               className="btn_delete"
                               onClick={()=>this.deleteuser(user._id)}
                               >x</i>
                           </li>
                       ))
                   }
               </ul>
            </div>
        );
    }
}

export default CreateUser;