const User = require('../../model/User');


exports.getOne = async ({id,idLogin})=>{
    const data = await User.findOne({ _id: id });
        if (data == null) {
            throw new Error('User not found')
        }
        if(String(data._id) !== String(idLogin)){
            throw new Error('You can only get your own data.`')
        }
        return data
}