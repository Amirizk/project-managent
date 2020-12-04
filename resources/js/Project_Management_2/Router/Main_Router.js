import React, { useState,useContext } from 'react'


import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
} from 'react-router-dom';
import Tasks from '../components/Basic/Tasks';
import AddProject from '../components/Admin/AddProject';
import Logout from '../components/Logout';
import SignIn from '../components/Sign_In';
import Members_Show from '../components/Admin/Members_Show';
import Register from '../components/Register';
import Navbar_BeforeLogin from '../components/Navbar_BeforeLogin';
import HomePage_Admin from '../components/Admin/HomePage_Admin';
import {UserContext} from '../components/UserContext';
import ShowTeams from '../components/Admin/ShowTeams';
import AddProject_Project from '../components/Admin/AddProject_Project';
import Chat_Room from '../components/Admin/Chat_Room';
export default function Initial() {
    var isloggedin=localStorage.getItem('isloggedin');
    const [user, setUser] = useState(isloggedin);
console.log('entered router');
    return (

        <Router >
<UserContext.Provider value={{user,setUser}}>

            <Navbar_BeforeLogin></Navbar_BeforeLogin>

            { console.log('entered navbar') }


            <Switch>

            <Route exact path="/login">
                <SignIn></SignIn>
                </Route>
                <Route exact path="/homepage_admin">
               <HomePage_Admin></HomePage_Admin>
                </Route>
                <Route exact path="/register">
                <Register> </Register>
                </Route>

                { console.log('entered navbar') }
                <Route exact path="/addproject">
                <AddProject> </AddProject>
                </Route>
                <Route exact path="/members_admin">
                <Members_Show> </Members_Show>
                </Route>
                <Route exact path="/chat_room">
                <Chat_Room> </Chat_Room>
                </Route>

                <Route exact path="/show_teams">
                <ShowTeams> </ShowTeams>
                </Route>
                <Route exact path="/addProject_Project">
                <AddProject_Project> </AddProject_Project>
                </Route>



                <Route exact path="/tasks">
                <Tasks> </Tasks>
                </Route>
                <Route exact path="/logout">
                <Logout> </Logout>
                </Route>


            </Switch>
            </UserContext.Provider>

        </Router>
    )
}
ReactDOM.render(<Initial />,document.getElementById('root'));

