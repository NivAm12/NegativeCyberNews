
import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';


export default function LandingPage(props) {

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ data, setData ] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault()

        const response = await Axios.post("http://localhost:5000/search", { searchTerm })
        //setData(response.data.data)
    }

    const onLogout = async (event) => {
        event.preventDefault()
        try {
            await Axios.get(`http://localhost:5000/logout`)
            props.setUser(null)
            props.history.push('/login')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        >
            <form onSubmit={onSubmit}>
                <TextField 
                label="Search" 
                variant="outlined" 
                size="sm"
                onChange={(event) => setSearchTerm(event.target.value)}
                />
                <Button 
                variant="contained" 
                color="primary"
                type="submit"
                >
                Search
                </Button>
                <Button
                onClick={onLogout}
                >
                    Logout
                </Button>
            </form>
        </Box>
    )
}

