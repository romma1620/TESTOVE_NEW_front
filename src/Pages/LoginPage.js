import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import {withRouter} from "react-router";


const LoginPage = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () =>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log('9999999999999999999999')
        console.log(props.socket);
        console.log('9999999999999999999999')

        axios
            .post('http://localhost:1616/api/auth/login', {
                email,
                password
            }, {headers: {
                socketId: props.socket.id
                }})
            .then(response => {
                makeToast('success', response.data.message)
                localStorage.setItem('Chat_Token', response.data.token)
                props.history.push('/chatroom');
                props.setupSocket();
            })
            .catch(err => {
                makeToast('error', err.response.data.message);
            })
    }

    return <div className='card'>
        <div className='cardHeader'>
            Login
        </div>
        <div className='cardBody'>
            <div className='inputGroup'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='email@email.com'
                    ref={emailRef}
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    ref={passwordRef}
                />
            </div>
            <button onClick={loginUser}>Login</button>
        </div>
    </div>;
}

export default withRouter(LoginPage);
