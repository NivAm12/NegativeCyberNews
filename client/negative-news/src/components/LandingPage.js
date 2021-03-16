
import Button from '@material-ui/core/Button';
import Axios from 'axios';

export default function LandingPage(props) {

    const onLogout = async (event) => {
        event.preventDefault()
        try {
            const response = await Axios.get(`http://localhost:5000/logout`)
            
            const { message } = response.data
            props.setUser(null)
            props.setMessage({message: "", variant: ""})
        } catch (err) {
            console.log("lala")
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

