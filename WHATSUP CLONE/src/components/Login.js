import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../firebase-config";
import {signIn, signOut} from "../features/user";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(signIn({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }))
            }
        })
    }, [])

    const logUser = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                let user = res.user;
                dispatch(signIn({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }))
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={<div className='login__screen'>
                    <h2 onClick={logUser} className='login__text'>Login</h2>
                </div>}/>
            </Routes>
        </Router>
  )
}