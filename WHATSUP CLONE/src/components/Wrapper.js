import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Sidebars} from "./Sidebars";
import {Chat} from "./Chat";
import {Login} from "./Login";
import {selectUserName, selectUserPhoto, signOut} from "../features/user";

export const Wrapper = () => {
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    return (
        <div>
            <div className='app'>
                {!userName ? <Login/> : (
                    <div className='app__body'>
                        <Router>
                            <Routes element={<Sidebars/>}>
                                <Route path='/' element={<Sidebars userPhoto={userPhoto} />}/>
                                <Route path='/rooms/:roomId' element={<> <Sidebars userPhoto={userPhoto} /> <Chat/></>}/>
                            </Routes>
                        </Router>
                    </div>
                )}
            </div>
        </div>
    )
}

