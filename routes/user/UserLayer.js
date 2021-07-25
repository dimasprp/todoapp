const User = require('../../model/User');

exports.getUserByEmail = async(email)=>{
    const users = await User.findOne({email:email})
    return users
}

exports.getAll = async()=>{
    const users = await User.find({})
    return users
}

exports.store= async (body)=>{
    let data = await new User(body);
    data = await data.save();
    return data
}