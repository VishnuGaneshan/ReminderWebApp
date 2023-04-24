import { collection, addDoc } from "firebase/firestore"; 
import { useState } from "react";
import { db, auth } from "../firebase-config";

export default function AddReminder () {
    const [reminderName, setReminderName] = useState();
    const [reminderDate, setReminderDate] = useState();
    const [reminderTime, setReminderTime] = useState();

    const addReminder = async () => {
        try {
            const docRef = await addDoc(collection(db, "reminders"), {
            userId: auth.currentUser.uid,
            name: reminderName,
            date: reminderDate,
            time: reminderTime,
            isCompleted: false
            }).then(alert("Added successfully"));
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="container p-2 fixed-bottom bg-dark">
            <div className="d-flex flex-row">
                <input className="m-2 w-100 p-2" type="text" placeholder="Enter your reminder name" onChange={e => {setReminderName(e.target.value)}}/>
                <input className="m-2 w-100 p-2" type="date" onChange={e => {setReminderDate(e.target.value)}}/>
                <input className="m-2 w-100 p-2" type="time" onChange={e => {setReminderTime(e.target.value)}}/>
                <button onClick={addReminder} className="border border-dark rounded-lg m-2 p-2 font-weight-bold"> &#10132; </button>
            </div>
        </div>
    )
};