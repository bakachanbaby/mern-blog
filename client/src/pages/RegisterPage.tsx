import React from 'react'

const RegisterPage = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const register = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            console.log(data)

            if (response.status === 200) {
                alert('Registration successful')
            }
            else {
                alert('Registration failed')
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred')
        }
    }

    return (
        <form className='register' action=''
            onSubmit={register}
        >
            <h1>Register</h1>
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
            <button type='submit'>Register</button>
        </form>
    )
}

export default RegisterPage