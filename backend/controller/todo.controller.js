const todo =require('../model/todo.model')

// get all data:
const get =async(req,res)=>{
    try{
        const todoList =  await todo.find()
         res.status(200).json(
             {
                 success : true,
                 message: todoList
             }
         )
        
    }
    catch(error){
        console.log(error.message)
        res.status(404).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}

//post new data :
const post = async(req,res)=>{
    const {title,description} = req.body
   try {
    const todoList  = new todo({title,description})
    await todoList.save()
    res.status(200).json(
        {
            success:true,
            message:todoList
        }
    )
   } catch (error) {
        console.log(error.message)
        res.status(404).json(
            {
                success:false,
                message:error.message
            }
        )
   }
}

//update data:
const put = async(req,res)=>{
    const {title,description} =req.body
    const id = req.params.id
    try {
        const updatedTodo =await todo.findByIdAndUpdate(
            id,
           { title,description},
           {new:true}
        )
        if(!updatedTodo){
            res.status(404).json(
                {
                    success:false,
                    message:'todo not found'
                }
            )
        }
        res.status(200).json(
            {
                success:true,
                message:updatedTodo
            }
        )
    } catch (error) {
        console.log(error.message)
        res.status(404).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}

//delete data : 
const deleted = async(req,res)=>{
    const {id} = req.params

   try {
       await  todo.findByIdAndDelete(id)
        res.status(200).json({
        success:true,
        message:'todo deleted'
    })
   } catch (error) {
    console.log(error.message)    
    res.status(400).json({
        success:false,
        message:error.message
    })
   }
}

module.exports =
{
    get,post,put,deleted
}