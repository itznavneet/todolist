import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveTOLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

const toggleFinished= (e) => {
  setshowFinished(!showFinished)
}


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  
    
  }, [])
  

  const handleEdit = (e, id) => {
    let t= todos.filter(i=>i.id === id)
   setTodo(t[0].todo)

   let newTodos= todos.filter(item=>{
    return item.id!== id;
   }); //new array bna having same reference
   
   setTodos(newTodos)
     saveTOLS()
  }
  const handleDelete = (e, id) => {
    
     let newTodos= todos.filter(item=>{
      return item.id!== id;
     }); //new array bna having same reference
     
     setTodos(newTodos)
     saveTOLS()

  }
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveTOLS()

  }
  const handleChange = (e) => {
    // console.log(e)
    // console.log(e.target.value)
    setTodo(e.target.value)

  }
  const handleCheckbox= (e) => {
   let id= e.target.name;
   console.log(`id:${id}`)
   let index= todos.findIndex(item=>{
    return item.id === id;
   })
   let newTodos= [...todos]; //new array bna having same reference
   newTodos[index].isCompleted= !newTodos[index].isCompleted;
   setTodos(newTodos)
   console.log(newTodos,todos)
   saveTOLS()

  }
  
  return (
    <>
      <Navbar />
      <div className="container my-5 rounded-xl bg-violet-100 p-5 min-h-[85vh] md:w-1/2 m-auto w-4/5">
      
      <h1 className='font-bold text-center text-xl'>iTask- Manage Todo at One Place</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className='flex flex-wrap'>
          <input onChange={handleChange} value={todo} type="text" className='md:w-3/4 w-[95%] py-1 my-2' />
          <button onClick={handleAdd} disabled={todo.length<2} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white text-sm rounded-md mx-6 disabled:bg-violet-700 w-[90%] md:w-[53px]'>Add</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        
        <h2 className="text-lg font-bold m-2">Your Todos</h2>

        <div className="todos">
        {todos.length=== 0 && <div>No Todos to Display</div> }
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 justify-between my-3">
              <div className='flex gap-5'>

              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white text-sm rounded-md mx-2'><FaRegEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white text-sm rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>
          })}

        </div>

      </div>
    </>
  )
}

export default App
