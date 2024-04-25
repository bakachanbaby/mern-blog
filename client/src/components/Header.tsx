import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {
        checkProfile()
        console.log(userInfo);

    }, [])



    const checkProfile = async () => {
        try {
            const response = await fetch('http://localhost:4000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            if (!data.error) {
                setUserInfo(data)
            }
            else {
                setUserInfo('')
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            if (data === 'ok') {
                setUserInfo('')
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred')
        }
    }

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {
                    userInfo ?
                        <>
                            <Link to="/create">Create new post</Link>
                            <Link to="/profile">{userInfo.username}</Link>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </>
                        :
                        <>
                            <Link to="/login" className="active">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                }
            </nav>
        </header >
    )
}

export default Header