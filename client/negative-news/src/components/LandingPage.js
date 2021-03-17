
import Button from '@material-ui/core/Button';
import Axios from 'axios';

export default function LandingPage(props) {

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
        <div>
            <h1>LANDING PAGE!!!</h1>
            <form onSubmit={onLogout}>
            <Button 
            variant="link" 
            type="submit"
            >
                Logout
                </Button>
            </form>
        </div>
    )
}

