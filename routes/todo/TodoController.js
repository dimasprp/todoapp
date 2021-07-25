const Todo = require('../../model/Todo');
const moment = require('moment')

exports.create = async (req,res)=>{
    const body = req.body
    try {
        console.log(res.locals.idLogin)
        body.author= res.locals.idLogin
        body.dueDate = new Date(moment().utcOffset('7').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'))
        console.log(body)
        data = await new Todo(body);
        data = await data.save();
        return res.json({ status: 200, message: 'Todo created successfully',data });
    } catch (error) {
        return res.status(500).send({ message: err.message });

    }
}

exports.getAll = async (req,res)=>{
    try {
        const data = await Todo.find({ author: res.locals.idLogin });
        return res.json({ status: 200, message: `Todo get all  data successfully`,data });

    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
}

exports.getOne=async (req,res)=>{

    try {
        console.log(req.params.toDoId)
        console.log(res.locals.idLogin)

        const dataTodo = await Todo.findOne({ _id: req.params.toDoId});
        if (!dataTodo) {
            return res.status(404).send({ message: 'Todo not found' });
        } 
        if(String(dataTodo.author) !== String(res.locals.idLogin)){
            return res.status(401).json({ message: `You can only get your own todo.`});
        }
        return res.json({ status: 200, message: `Todo get one  data successfully`,dataTodo });
    } catch (error) {
        return res.status(500).send({ message: err.message });

    }
    
}

exports.update=async (req,res)=>{
    try {
        const dataTodo = await Todo.findOne({ _id: req.params.toDoId});
        if (!dataTodo) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        const update = await Todo.findOneAndUpdate({ _id: req.params.toDoId, author: author} , {title, description});
        if (!update) {
            return res.status(401).send({ message: 'You can only update your own data.' });
        }
        const data = await Todo.findOne({_id: req.params.id, author: author});
        return res.json({ status: 200, message: `Update todo data successfully`,data });
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
}

exports.delete=async (req,res)=>{
    try {
        const dataTodo = await Todo.findOne({ _id: req.params.toDoId});
        if (dataTodo == null) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        const data = await Todo.findOneAndRemove({ _id: req.params.id, author: param.author });
        if (!data) {
            return res.status(401).send({ message: 'You can only delete your own todo.' });
        }
        return res.json({ status: 200, message: `Todo Deleted`,data });
    } catch (error) {
        return res.status(500).send({ message: err.message });

    }
}

