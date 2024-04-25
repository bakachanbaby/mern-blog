import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [redirect, setRedirect] = React.useState(false)
    const { userInfo, setUserInfo } = React.useContext(UserContext)

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            console.log(data)

            if (response.status === 200) {
                setUserInfo(data)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred')
        }
    }

    if (redirect) return <Navigate to='/' />


    return (
        <form className='login' action='' onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginPage