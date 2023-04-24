import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function Login ( {setIsLogged} ) {
    const [logOption, setLogOption] = useState(1); // 1- login and 0 - signup
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [user, setUser] = useState();

    // onAuthStateChanged(auth, (currentUser) => {setUser(currentUser)});

    console.log("hello");

    const setToLogin = () => {
        setLogOption(1);
    }

    const setToSignUp = () => {
        setLogOption(0);
    }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerUsername, registerPassword);
            // console.log(user);
            // console.log(auth.currentUser.uid);
            setIsLogged(true);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginUsername, loginPassword);
            // console.log(user);
            // console.log(auth.currentUser.uid);
            setIsLogged(true);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }

    return (
        <div className="container border p-5">
            <div className="container">
                <button className={`btn btn-${logOption ? 'primary' : 'secondary'} btn-lg active m-5`} onClick={setToSignUp}> Sign Up </button>
                <button className={`btn btn-${!logOption ? 'primary' : 'secondary'} btn-lg active m-5`} onClick={setToLogin}> LogIn </button>
            </div>
            {logOption ? <div className="container d-flex flex-column">
                <h3> Login </h3>
                <label>Username: <input type="email" placeholder="Enter Your Username" onChange={(e) => {setLoginUsername(e.target.value)}}/> </label>
                <label>Password: <input type="text" placeholder="Enter Your Password" onChange={(e) => {setLoginPassword(e.target.value)}}/> </label>
                <button className="btn btn-outline-success" onClick={login}>Login</button>
            </div> :
            <div className=" d-flex flex-column">
                <h3> Sign Up </h3>
                <label>Username: <input type="email" placeholder="Enter Your Username" onChange={e => {setRegisterUsername(e.target.value)}}/> </label>
                <label>Password: <input type="text" placeholder="Enter Your Password" onChange={e => {setRegisterPassword(e.target.value)}}/> </label>
                <button className="btn btn-outline-success" onClick={register}>Sign Up</button>
            </div>}
        </div>
    )
}