import React, {useState} from 'react'
import api from '../api'


const Users= () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const changeTitleClasses = () => {
        let classes = users.length
        if (classes === 0) {
            classes = 'Никто с тобой не тусанёт'
        } else if (classes === 2 || classes === 3 || classes === 4) {
            classes  +=  '  человека тусанут с тобой сегодня'
        }else if (classes === 1) {
            classes  +=  '  человек тусанёт с тобой сегодня'
        }else {
            classes  += '  человек тусанут с тобой сегодня'
        }
        return classes 
    }

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
        //users.filter((user) => user._id !== userId)
    }

    const renderPhrase = () => {
        return (
            users.length !== 0 && 
            users.map((user) => (
            <tr
                key={user._id}
            >
                <td>{user.name}</td>
                <td>
                    {
                    user.qualities.map((quality) => (
                        <span key ={quality._id}
                        className = {"badge m-2 bg-"+ quality.color}
                        >
                            {quality.name}</span>   
                    ))
                    }
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <button 
                    type = 'button'
                    className = 'btn btn-danger btn-sm m-2 btn-outline-danger'
                    onClick = {() => handleDelete(user._id)}
                    >
                        delete
                 </button>
                
            </tr>          
            ))
            )  
    }

    if(users.length == 0) {
        return <h1>{changeTitleClasses()}</h1>
    }
    return (
        
        <>
            <h1>{changeTitleClasses()}</h1>
            <table className="table table-striped align-right">
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Качества</td>
                        <td>Профессия</td>
                        <td>Количество встреч</td>
                        <td>Оценка</td>
                    </tr>
                </thead>
                <tbody>
                    {renderPhrase()}
                </tbody>
            </table>
        </>
    )
};




export default Users;