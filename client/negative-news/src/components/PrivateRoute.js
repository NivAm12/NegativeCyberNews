import { Redirect, Route } from 'react-router-dom';


export default function PrivateRoute ({component: Component, user, ...rest}){
    console.log(`inside private route: ${user}`)
    return (
      <Route
        {...rest}
        render={(props) => user
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login'}} />}
      />
    )
  }