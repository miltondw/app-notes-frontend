import React, { Component } from 'react';
import axios from 'axios'

class CreateUser extends Component {
    state ={
        users:[],
        username:''
    }

  async componentDidMount(){
       const res= await axios.get('http://localhost:4000/api/users')
       this.setState({
           users:res.data
       })
    }
    onChangeUsername = (e)=>{
        this.setState({
            username:e.target.value
        })
    }
    render() {
        return (
            <div className="content__users">
               <div className="form">
                   <div className="form__card">
                       <h2 className="form__title">Create new user</h2>
                       <form>
                               <input 
                               type="text" 
                               onChange={this.onChangeUsername}
                               placeholder="Username"
                               />
                       </form>
                   </div>
               </div>
               <ul className="list_users">
                   {
                       this.state.users.map(user=>(
                           <li className="list_users__item" key={user._id}>
                               <p className="list_users__name">
                                   {
                                       user.username
                                   }
                               </p>
                           </li>
                       ))
                   }
               </ul>
            </div>
        );
    }
}

export default CreateUser;