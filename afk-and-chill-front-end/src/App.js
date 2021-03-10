import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Register from './layouts/RegisterPage';
import Login from './layouts/LoginPage';
import ChatBox from './layouts/ChatBoxPage';
import GuardedRoute from './layouts/GuardedRoute';
import useLocalStorage from 'react-use-localstorage';

function App() {
    const [isAuthenticated, setisAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );

    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Login setisAuthenticated={setisAuthenticated} />
                </Route>
                <GuardedRoute
                    component={ChatBox}
                    path="/chatBox"
                    isAuthenticated={isAuthenticated}
                />
            </Switch>
        </Router>
    );
}
export default App;
