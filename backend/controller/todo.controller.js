const get =async(req,res)=>{
    res.json('get route work')
}

const post = async(req,res)=>{
    res.json('post rout work')
}

const put = async(req,res)=>{
    res.json('put rout works')
}

const deleted = async(req,res)=>{
    res.json('delete route work')
}

module.exports =
{
    get,post,put,deleted
}