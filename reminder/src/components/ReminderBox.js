import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";

export default function ReminderBox ({docId, data}) {
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);
    const [showOption, setShowOption] = useState(0);
    const [isDeleted, setIsDeleted] = useState(0);

    console.log(docId, '======', data)

    const changeOption = () => {
        showOption ? setShowOption(0) : setShowOption(1);
    }

    const deleteIt = async () => {
        await deleteDoc(doc(db, "reminders", docId)).then(
        setIsDeleted(1));
    };

    const complete = async () => {
        data.isCompleted = true;
        await updateDoc(doc(db, "reminders", docId), data);
        setIsCompleted(true);
    };

    let background = isCompleted ? 'bg-success' : 'bg-light'

    return (
        <>
        {!isDeleted ? <div className={`container border border-dark text-dark ${background} rounded-lg my-5 p-3`} onClick={changeOption}>
            <div className="d-flex flex-column">
            {/* <div className="d-flex justify-content-around"> */}
                <h3 className="text-break font-weight-bold">{data.name}</h3>
                <p className="">Time: {data.time}</p>
            {/* </div> */}
            {showOption ? <div className="d-flex justify-content-around">
                {!isCompleted ? <button className="btn btn-outline-success" aria-pressed="true" onClick={complete}>Completed</button> : <></>}
                <button className="btn btn-outline-danger" aria-pressed="true" onClick={deleteIt}>Delete</button>
            </div> : <></>}
            </div>
        </div> : <></>}
        </>
    )
};