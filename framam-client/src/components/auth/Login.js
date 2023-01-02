import React from 'react';

export const Login = () => {
    return (
        <div className="loginContainer">
            <form>
                <div className="emailContainer">
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" />
                </div>
                <div className="passwordContainer">
                    <label>Password</label>
                <input type="password" placeholder="8 or more characters" />
                </div>
                <div className='loginButtonContainer'>
                    Login
                </div>
            </form>
        </div>
    )
}