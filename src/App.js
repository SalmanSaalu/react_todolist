
import './App.css';
import { useState, useEffect } from 'react'
function App() {
  const [toDos, setTodos] = useState([])
  const [toDo, setTodo] = useState('')
  const [toDelete, setDelete] = useState([])
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('toDos')))
    setDelete(JSON.parse(localStorage.getItem('toDelete')))

  }, [])

  const setTODOS = (e) => {
    localStorage.setItem('toDos', JSON.stringify(e))
    setTodos(e);
  }
  const setDELETE = (e) => {
    localStorage.setItem('toDelete', JSON.stringify(e))
    setDelete(e);
  }
  // useEffect(() => {
  //   return () => {
  //     console.log('todelete')
  //     localStorage.setItem('toDelete', JSON.stringify(toDelete))
  //   }

  // }, [toDelete])

  // useEffect(() => {

  //   return () => {

  //     console.log('todos')
  //     localStorage.setItem('toDos', JSON.stringify(toDos))
  //   }

  // }, [toDos])



  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={() => setTODOS([...toDos, { id: Date.now(), text: toDo, status: false }])} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {

          return (
            <div className="todo">
              <div className="left">
                <input onChange={(e) => {
                  // console.log(e.target.checked)
                  // console.log(obj)

                  setTODOS(toDos.filter(obj2 => {
                    if (obj2.id === obj.id) {
                      obj2.status = e.target.checked
                    }
                    return obj2
                  }))
                }} value={obj.status} type="checkbox" name="" id="" />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i onClick={() => {
                  setTODOS(toDos.filter(obj3 => {
                    if (obj3.id === obj.id) {
                      setDELETE([...toDelete, { id: obj3.id, text: obj3.text, status: false }])
                      return null
                    }
                    return obj3
                  }))
                }} className="fas fa-times"></i>
              </div>
            </div>)
        })}
        {/* completed list */}

        {
          toDos.map(obj => obj.status).includes(true) && <h1>finished list</h1>
        }
        {toDos.filter(obj => obj.status === true).map(obj => <h1>{obj.text}</h1>)}
        {/* {  
       toDos.map((obj)=>{
          if (obj.status){
            return (<h1>{obj.text}</h1>)
         }
          return null
       
       })
     } */}


        {/* uncompleted list */}
        {
          toDos.map(obj => obj.status).includes(false) && <h1>unfinished list</h1>
        }

        {
          toDos.filter(obj => obj.status === false).map(obj => <h1>{obj.text}</h1>)
        }
        {/* deleted */}
        {
          toDelete.length > 0 && <h1>deleted  list</h1>
        }
        {
          toDelete.map(obj => <div><h1>{obj.text}</h1><button onClick={() => {
            setDELETE(toDelete.filter(obj4 => obj.id !== obj4.id))
            setTODOS([...toDos, obj])

          }}>restore</button></div>)

          // toDelete.map(obj=>{console.log(obj) 
          //   return <h1>{obj.text}</h1>})
        }

      </div>
    </div>
  );
}

export default App;
