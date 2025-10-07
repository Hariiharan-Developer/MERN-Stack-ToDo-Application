import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'



const App = () => {

  const [todo,setTodo] = useState([])
  const [editId,setEditId] =useState(null)
  const [addTitle,setAddTitle] = useState('')
  const [addDescription,setAddDescription] = useState('')
  const [error,setError] =useState('')
  const [success,setSuccess] =useState('')
  const [editTitle,setEditTitle] =useState('')
  const [editDescription,setEditDescription] =useState('')
  const [isLoading,setIsLoading] = useState(false)

  const api = 'https://mern-stack-todo-application.onrender.com'

  //get taske :
  useEffect(()=>{
    setIsLoading(true)
    fetch(api+'/api/todo')
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
      setTimeout(() => {
        setError(error.message)
      }, 3000);
    })
    .finally(()=>setIsLoading(false))
    
  },[])

  //add task :
  const handleClickAdd = ()=>{
    if(addTitle.trim()=== '' && addDescription.trim()===''){
      console.error('Title and Description required')
      setError('Title and Description required')
      setTimeout(() => { 
        setError('')
      }, 3000);
    }
    setIsLoading(true)
    fetch(api+'/api/todo' ,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title:addTitle,description:addDescription})
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.success){
        setTodo([...todo ,data.message])
        setAddTitle('')
        setAddDescription('')
        setSuccess('Todo added successfully')
        setTimeout(() => {
          setSuccess('')
        }, 3000);
      }
     
    }) .catch((error)=>{
      setError(error.message)
      setTimeout(()=>{
        setError('')
      },3000)
    })
    .finally(()=>setIsLoading(false))
  }
  

  //handle save :
  const handleSave =()=>{
    if(editTitle.trim() ==='' && editDescription.trim()===''){
      setError('fields are empty')
      setTimeout(()=>{
        setError('')
      },3000)
    }
    setIsLoading(true)
    fetch(api+'/api/todo/'+editId,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title:editTitle , description:editDescription})
    }).then((res)=>res.json())
    .then((data)=>{
   if(data.success){
     const updatedTodo = todo.map((u)=>u._id ===editId ? {...todo,title :editTitle ,description : editDescription} : u)
     setTodo(updatedTodo)
     setSuccess('Todo Updated')
     setTimeout(()=>{
      setSuccess('')
     },3000)
     setEditTitle('')
     setEditDescription('')
     setEditId(null)
   }
   
    })
    .catch((err)=>{
      console.log(err.message)
      setError('Unable to update')
      setTimeout(() => {
        setError('')
      }, 3000);
    }).finally(()=>setIsLoading(false))

  }

  //edit button:

  const editButton=(u)=>{
   setEditId(u._id)
   setEditTitle(u.title)
   setEditDescription(u.description)


  }

  //deleteButton:

  const deleteTodo =(id)=>{
    setIsLoading(true)
    fetch(api+'/api/todo/'+id,{
      method:'DELETE',
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.success){
     const deletedTodo =todo.filter((e)=>e._id !== id )
     setTodo(deletedTodo)
     setSuccess('Task deleted')
     setTimeout(()=>{
      setSuccess('')
     },3000)
      }
    })
    .catch((err)=>{
      console.log(err.message)
      setError('delete operation failed')
      setTimeout(() => {
        setError('')
      }, 3000);
    }).finally(()=>setIsLoading(false))
  }
  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className=''>
      <div className="container mt-5">
         <h4 className='text-center mb-2 text-light'>Todo + Crud Project</h4>
    <div className="input-group mb-3">
  <div className="input-group-text">
  </div>
 
  <input
  value={addTitle} onChange={(e)=>setAddTitle(e.target.value)} style={{backgroundColor:'transparent'}} type="text" className="form-control text-light" aria-label="Text input with checkbox" placeholder='Add Task'/>
  <input 
  value={addDescription} onChange={(e)=>setAddDescription(e.target.value)} style={{backgroundColor:'transparent'}} type="text" className="form-control text-light" aria-label="Text input with checkbox" placeholder='Add Description'/>
  <button onClick={handleClickAdd} className='btn btn-success'>Add</button>
  <div className=''>
  {error && <p style={{borderBottom:'1px solid'}} className='text-danger fw-bold text-center mx-3 my-2'>{error}</p>}
  {success && <p style={{borderBottom:'1px solid'}} className='text-success fw-bold text-center mx-3 my-2'>{success}</p>}
  </div>

</div>
</div>

<div className="container mt-4">
  <div className="row">
    {todo.map((u,index) => (
      <div key={u._id} className="col-md-6 mb-3">
        <div className="card text-light" style={{backgroundColor:'black'}}>
          <div className="card-body" style={{border:'1px solid ',borderRadius:'4px'}}>
            
            <h6 className="card-title"><p className='text-warning'>{`${index+1}`}</p>
              {editId ===u._id ?
              <input value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
              style={{width:'100%',color:'white',backgroundColor:'transparent',border: 'none',borderBottom: '2px solid orange', outline: 'none',padding: '5px 0',borderRadius:0}} 
              type='text'/> :
              <h5 className='text-warning'>{u.title}</h5> }</h6>
            
            <p className="card-text">
              {editId===u._id ?(
                <input value={editDescription}
                onChange={(e)=>setEditDescription(e.target.value)}
                type='text' style={{color:'white',backgroundColor:'transparent',border: 'none',borderBottom: '2px solid orange', outline: 'none',padding: '5px 0',borderRadius:0,width:'90%'}}/>)
              : <p>{u.description}</p>}
             </p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">{'craated at :' +new Date(u.createdAt).toLocaleString()}</small>
           <div>
            {editId===u._id ?
            (<button onClick={handleSave}
               className='btn btn-success btn-sm mx-1 my-1'>Save</button>)
            :(<button className='btn btn-primary btn-sm mx-1 my-1' onClick={()=>editButton(u)}>Edit</button>)}
          
          
            {editId===u._id ?(<button className='btn btn-warning btn-sm mx-1 my-1' onClick={()=>setEditId(null)}>Cancel</button>)
            :(<button onClick={()=>deleteTodo(u._id)} className='btn btn-danger btn-sm mx-1 my-1'>Delete</button>)}
           </div>
          </div>
        </div>
      </div>
    ))}
  </div>
   
</div>
    </div>
  )
}

export default App
