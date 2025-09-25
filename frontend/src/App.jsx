import React, { useEffect, useState } from 'react'
import { ToastContainer , toast}from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [todo,setTodo] = useState([])
  const [editId,setEditId] =useState(null)
  const [addTitle,setAddTitle] = useState('')
  const [addDescription,setAddDescription] = useState('')

  const api = 'http://localhost:4000/api/todo'

  //get taske :
  useEffect(()=>{
    fetch(api)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success){
        setTodo(data.message)
      }
      else{
        console.log('unable to push data to todo array')
      }

    }).catch((error)=>{
      console.log(error.message)
    })
    
  },[])

  //add task :
  const handleClickAdd = ()=>{
    if(addTitle.trim()=== '' && addDescription.trim()===''){
      toast.error('Title and Description required')
    }
  }

  return (
    <div className=''>
      <div className="container mt-5">
         <h4 className='text-center mb-2 text-light'>Todo + Crud Project</h4>
    <div className="input-group mb-3">
  <div className="input-group-text">
  </div>
 
  <input onChange={(e)=>setAddTitle(e.target.value)} style={{backgroundColor:'transparent'}} type="text" className="form-control" aria-label="Text input with checkbox" placeholder='Add Task'/>
  <input onChange={(e)=>setAddDescription(e.target.value)} style={{backgroundColor:'transparent'}} type="text" className="form-control" aria-label="Text input with checkbox" placeholder='Add Description'/>
  <button onClick={handleClickAdd} className='btn btn-success'>Add</button>
</div>
</div>

<div className="container mt-4">
  <div className="row">
    {todo.map((u,index) => (
      <div key={u._id} className="col-md-6 mb-3">
        <div className="card text-light" style={{backgroundColor:'black'}}>
          <div className="card-body" style={{border:'1px solid',borderRadius:'4px'}}>
            
            <h5 className="card-title"><p>{`Task_${index+1}`}</p>
              {editId ===u._id ?
              <input style={{backgroundColor:'transparent'}} type='text'/> :
               u.title}</h5>
            <p className="card-text">{ u.description}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">{'craated at :' +new Date(u.createdAt).toLocaleString()}</small>
           <div>
            {editId===u._id ?(<button className='btn btn-success btn-sm mx-1 my-1'>Save</button>)
            :(<button className='btn btn-primary btn-sm mx-1 my-1' onClick={()=>setEditId(u._id)}>Edit</button>)}
          
          
            {editId===u._id ?(<button className='btn btn-warning btn-sm mx-1 my-1' onClick={()=>setEditId(null)}>Cancel</button>)
            :(<button className='btn btn-danger btn-sm mx-1 my-1'>Delete</button>)}
           </div>
          </div>
        </div>
      </div>
    ))}
  </div>
   
</div>
 <ToastContainer position ='top-center' autoClose ={3000}/>
    </div>
  )
}

export default App
