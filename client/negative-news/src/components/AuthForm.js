import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Axios from 'axios';

Axios.defaults.withCredentials = true

const AuthForm = (props) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const onLogin = async (event) => {

        event.preventDefault()

        try {
            const response = await Axios.post(`http://localhost:5000/login`, {username,password})
            const { message, user } = response.data
            props.setUser(user)
            props.setMessage({ message, variant: "success" })
        } catch (err) {
            const { message } = err.response.data
            props.setMessage({ message , variant: "danger"})
        } finally {
            setUsername("")
            setPassword("")
        }
    }

    const onLogout = async (event) => {
        event.preventDefault()
        try {
            const response = await Axios.get(`http://localhost:5000/logout`)
            
            const { message } = response.data
            props.setUser(null)
            props.setMessage({message, variant: "success"})
        } catch (err) {
            const { message } = err.response.data
            props.setMessage({ message , variant: "danger"})
        }
    }

    return (
        <>
        <Navbar bg="light" variant="light">
            <Nav className="mr-auto"/>
            {!props.user ? 
                <Form onSubmit={onLogin} inline>
                    <Form.Control 
                        size="sm" 
                        type="text" 
                        placeholder="Username" 
                        className="mr-sm-2" 
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        />
                    <Form.Control 
                    size="sm" 
                    type="password" 
                    placeholder="Password" 
                    className="mr-sm-2"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button 
                    variant="link"
                    type="submit"
                    >
                        Login
                        </Button>
                </Form>
                :
                <Form onSubmit={onLogout}>
                    <Button 
                    variant="link" 
                    type="submit"
                    >
                        Logout
                        </Button>
                </Form>
                }
        </Navbar>
        </>
    )
}

export default AuthForm;