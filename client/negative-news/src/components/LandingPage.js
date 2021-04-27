import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ArticleCard from './ArticleCard'

const useStyles = makeStyles({
    container: {
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
        height: "1000px",
        background: "#f7f7f7"
    },
    input: {    
        background: "white"
    },
    inputBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "50px",
        borderBottom: "1px solid rgba(0,0,0,0.2)"
    },
    logoutButton: {
        float: "right",
        textTransform: "none"
    },
    article: {
        margin: "20px 20px 20px 20px"
    }
})

export default function LandingPage(props) {

    const bla = [{'title': 'Cracked copies of Microsoft Office and Adobe Photoshop steal your session cookies, browser history, crypto-coins', 'description': 'Cracked copies of Microsoft Office and Adobe Photoshop are stealing browser session cookies and Monero cryptocurrency wallets from tightwads who install the pirated software, Bitdefender has warned.', 'date': 'April 14,  2021', 'link': 'https://www.theregister.com/2021/04/13/cracked_copies_of_microsoft_office/?&web_view=true'}, {'title': 'Adobe Patches Critical Code Execution Vulnerabilities in Photoshop, Bridge', 'description': 'Adobe on Tuesday announced patches for several vulnerabilities in four of its products, including critical code execution and buffer flow flaws affecting Photoshop and Bridge.', 'date': 'April 14,  2021', 'link': 'https://www.securityweek.com/adobe-patches-critical-code-execution-vulnerabilities-photoshop-bridge?&web_view=true'}, {'title': 'Critical code execution vulnerability fixed in Adobe ColdFusion', 'description': 'Adobe released ColdFusion 2016 Update 17, ColdFusion 2018 Update 11, and ColdFusion 2021 Update 1 to patch the vulnerability and said that all previous versions before these patches are vulnerable.', 'date': 'March 22,  2021', 'link': 'https://www.bleepingcomputer.com/news/security/critical-code-execution-vulnerability-fixed-in-adobe-coldfusion/?&web_view=true'}]
    const classes = useStyles()

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([])

    useEffect(() => {

    }, [data])

    const onSubmit = async (event) => {

        //prevent refresh
        event.preventDefault()

        //API Post request
        const response = await Axios.post("http://localhost:5000/search", { searchTerm })
        
        //reset search term
        setSearchTerm("")
        console.log( typeof response.data.data)
        setData(response.data.data)
    }

    const onLogout = async (event) => {

        //prevent refresh
        event.preventDefault()

        try {

            //API Get request
            await Axios.get(`http://localhost:5000/logout`)

            //logout user
            props.setUser(null)

            //redirect to login page
            props.history.push('/login')

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container 
        fixed
        className={classes.container}
        >
            <Button
                onClick={onLogout}
                className={classes.logoutButton}
                color="default"
                startIcon={<ExitToAppIcon/>}
            >
                Logout
            </Button>

            <form onSubmit={onSubmit}>
                <Grid
                container 
                spacing={3}
                className={classes.inputBar}
                >
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            autoFocus="true"
                            className={classes.input}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            >

                      </TextField>
                    </Grid>
                    <Grid >
                        <IconButton
                            type="submit"
                            >
                            <SearchIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
            <br></br>
            <div>
                {bla.map(article => {
                    return <div><ArticleCard className={classes.article} article={article}></ArticleCard><br></br></div>
                })}
            </div>
        </Container>
    )
}

