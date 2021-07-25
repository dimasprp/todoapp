const User = require('../../model/User');
const bcrypt = require('bcrypt');
const UserLayer = require('../user/UserLayer')
const { createJwtToken } = require('../../librariesUtil/jwt');
exports.login = async (req,res)=>{
    const body = req.body
    try {
        const dataUser = await UserLayer.getUserByEmail(body.email)
        if(!dataUser){
            res.status(400).send({ message: 'user with that email not found' });
        }else {
            // compare password                
            const match = await bcrypt.compare(body.password, dataUser.password)
            if(match) {
                const data = {
                    id: dataUser._id,
                    email: dataUser.email,
                    name: dataUser.name,
                    token: createJwtToken(dataUser._id)
                }
                await User.updateOne({_id:dataUser._id},{$set:{token:data.token}})
                return res.json({ status: 200, message: 'Login success', data});

            } else {
                return res.status(400).send({ message: 'Password not match in our data' });
            }
        }
    } catch (error) {
        return res.status(500).send({ message: err.message });

    }
}
