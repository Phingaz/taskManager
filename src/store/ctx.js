import { createContext, useEffect, useState } from "react";

const Main = createContext({})
const temp = [{
    _id: 1,
    value: "Walk the dog",
    checked: false
},
{
    _id: 2,
    value: "Task 2",
    checked: true
},]


export function MainCtxProvider(props) {

    const [loading, setloading] = useState(true)

    const [valueI, setvalueI] = useState(0)

    const [lists, setLists] = useState([])

    const [edit, setEdit] = useState(false)

    const [editedItem, setEditedItem] = useState(
        {
            _id: "",
            value: "",
            checked: ""
        }
    )

    useEffect(() => {
        fetch('https://centraldb.onrender.com/api/v1/tasks/')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.message.length > 0) {
                    setLists(data.message.all)
                    const loading = setInterval(() => {
                        const rand = Math.floor(Math.random() * 15)
                        setvalueI(p => {
                            const newValue = p + rand
                            if (newValue >= 100) {
                                clearInterval(loading)
                                setloading(false)
                            }
                            return newValue
                        })
                    }, 900)
                    return () => {
                        clearInterval(loading)
                    }
                } else {
                    setLists(temp)
                }
                const loading = setInterval(() => {
                    const rand = Math.floor(Math.random() * 15)
                    setvalueI(p => {
                        const newValue = p + rand
                        if (newValue >= 100) {
                            clearInterval(loading)
                            setloading(false)
                        }
                        return newValue
                    })
                }, 900)
                return () => {
                    clearInterval(loading)
                }
            })
    }, [])

    const setList = (data) => {
        setLists(p => ([
            ...p,
            { _id: data._id, value: data.value, checked: data.checked }
        ]))
    }

    const delItem = (data) => {
        setLists(lists.filter(list => list._id !== data))
    }

    const setEditState = (data) => {
        setEdit(p => !p)
        setEditedItem(data)
    }

    const itemToEdit = (data) => {
        fetch('https://centraldb.onrender.com/api/v1/tasks/' + data._id, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const result = lists.map(list => {
                    if (list._id === data.message._id) {
                        return { ...list, value: data.message.value, checked: data.message.checked }
                    }
                    return list
                })
                setLists(result)
            })
    }


    return (
        <Main.Provider value={{
            loading,
            valueI,
            lists,
            edit,
            editedItem,
            setList,
            delItem,
            setEditState,
            itemToEdit,
        }}>
            {props.children}
        </Main.Provider>
    )
}


export default Main