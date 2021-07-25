const bcrypt = require('bcrypt');
const User = require('../../model/User');
const UserLayer = require('./UserLayer')
const UserMain = require('./UserMain')

exports.getAllUser = async(req,res)=>{
    try {
        const getAllUser = await UserLayer.getAll();
        return res.json({ status: 200, message: "successfully",data:getAllUser });
    } catch (error) {
        res.status(400).send({ message:error.msg });
    }
}

exports.create= async(req,res)=>{
    const body = req.body
    try {
        const cekuser = await UserLayer.getUserByEmail(body.email)
        if(cekuser){
            return res.status(404).send({ message: 'user with email already exist' });
        }
        let hash = await bcrypt.hash(body.password, 10);
        body.password = hash
        const data = await UserLayer.store(body)
        return res.json({ status: 200, message: "successfully created user",data:data });
    } catch (error) {
        res.status(400).send({ message:error.msg });

    }

}

exports.update= async(req,res)=>{
    const body = req.body
    try {
                    const dataUser = await User.findOne({ _id: req.params.id});
                    if (!dataUser) {
                        return res.status(404).send({ message: 'User not found' });
                    }
                    if(String(dataUser._id) !== String(res.locals.idLogin)){
                        return res.status(401).json({ message: `You can only update your own data.`});
                    }
                    await User.update({ _id: req.params.id} , {$set:{body}});
                    const data = await User.findOne({_id: req.params.id});
                    res.json({ status: 200, message: `Update User  data successfully`,data });
                } catch(err) {
                    res.status(500).send({ message: err.message });
                }

}

exports.getOne= async(req,res)=>{
    try {
                   const data = await UserMain.getOne({idLogin:res.locals.idLogin,id:req.params.id})
                    res.json({ status: 200, message: `User get one data successfully`,data });
                } catch(err) {
                    res.status(500).send({ message: err.message });
                }

}