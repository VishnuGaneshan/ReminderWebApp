import ReminderBox from "../components/ReminderBox";
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs, and } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useEffect, useState } from "react";


export default function Reminder () {
    const [userData, setUserData] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
   
    const loadData = async () => {
        try {
            let reminders = [];
            const userReminders = query(collection(db, "reminders"), where("userId", "==", auth.currentUser.uid), where("date", "==", date));
            
            const querySnapshot = await getDocs(userReminders);
            querySnapshot.forEach((doc) => {
                reminders.push(<ReminderBox key={uuidv4()} docId={doc.id} data={doc.data()}/>)
                console.log(doc.id, " => ", doc.data());
            });

            setUserData(reminders)
            console.log('called');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadData()
    },[date])

    return (
        <div className="container mb-5 pb-5">
            <div className="container text-light sticky-top bg-dark p-2">
                <span>Select Date: </span><input type='date' value={date} onChange={e => {setDate(e.target.value)}}/>
            </div>
            <div className="container">
                {userData}
            </div>
        </div>
    )
};