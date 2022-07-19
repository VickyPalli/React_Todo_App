import { useState } from "react"
import "./style.css"
const Todoform = () => {
    const [input, setinput] = useState("")
    const [items, setitems] = useState([])
    const [button, setbutton] = useState(true)
    const [editid, seteditid] = useState("")
    const inputhandle = (e) => {
        setinput(e.target.value)
    }
    const todohandle = () => {
        if (!input) {
            alert("Please enter Todo")
        } else if (input && !button) {
            const updated = items.map((element) => {
                if (element.id === editid) {
                    return { ...element, Todo: input }
                }
                return element
            })
            setitems(updated)
            setinput("")
            setbutton(true)
        } else {
            const AllTodo = { id: new Date().getTime().toString(), Todo: input }
            setitems([...items, AllTodo])
            setinput("")
        }

    }
    const tododeletehandle = (id) => {
        const updatetodos = items.filter((element) => {
            return element.id !== id
        })
        setitems(updatetodos)
    }
    const todoedithandle = (id) => {
        setbutton(false)
        seteditid(id)
        const editvalue = items.find((element) => {
            return element.id === id
        })
        setinput(editvalue.Todo)
    }
    return (
        <div className="Todo">
            <div>
                <input type="text" value={input} placeholder="Add Todo" onChange={inputhandle} />
                {
                    button ? <button className="Todobutton" onClick={todohandle}>Add Todo</button> : <button className="Todobutton" onClick={todohandle}>Edit</button>
                }
            </div>
            <table >
                {
                    items.map((element) => {
                        return (
                            <tr key={element.id}>
                                <td><span>{element.Todo}</span></td>
                                <td><button type="button" className="delete" onClick={() => tododeletehandle(element.id)}>Delete</button></td>
                                <td><button type="button" className="edit" onClick={() => todoedithandle(element.id)}>Edit</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Todoform;