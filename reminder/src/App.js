import { useState } from 'react';
import './App.css';
import AddReminder from './pages/AddReminder';
import Login from './pages/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Reminder from './pages/Reminder';
import { auth } from './firebase-config';


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState();
  
  onAuthStateChanged(auth, (currentUser) => {if(currentUser){setEmail(currentUser.email); setIsLogged(true)}})

  const logout = async () => {
    setIsLogged(false);
    signOut(auth);
  }

  return (
    <>
    <div className="container text-center">
      <h1 className='text-center my-5'> Reminder Web App</h1>
      {!isLogged ? <Login setIsLogged={setIsLogged}/> :
      <>
      <p>Email: {email} <button onClick={logout}>Sign Out</button> </p>
      <Reminder/>
      <AddReminder/></>}
    </div>
    </>
  );
}

export default App;
