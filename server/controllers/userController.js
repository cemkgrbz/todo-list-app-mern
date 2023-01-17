const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const SALT_ROUNDS = 10

// app.post('/register', async (req,res) => {

// 	try {
		
// 		const hashedPass = await bcrypt.hash(req.body.password, 10)

// 	} catch (error) {
		
// 	}

// 	// const user = await User.add

// 	// const salt = await bcrypt.genSalt(SALT_ROUNDS)
// 	// const hashedPass = await bcrypt.hash(req.body.password, salt)

// 	// req.body.password = hashedPass

// 	const userRegister = await User.create(req.body)
//     console.log("🚀 ~ register ~ user", userRegister)

// 	res.send(userRegister)


// })

// app.post('/login', async (req,res) => {

// 	const userLogin = await User.findOne({
// 		$or: [{username: req.body.username}, {email: req.body.email}]
// 	}).select('-__v')

// 	console.log("🚀 ~ login ~ user", user)

// 	if (!userLogin) return res.send({success: false, errorId: 1})

// 	const passMatch = await bcrypt.compare(req.body.password, user.password)
// 	if (passMatch) {
// 		const newUser = user.toObject()
            
//             delete newUser.password

//             res.send({success: true, user: newUser})

// 	} else return res.send({success: false, errorId: 1})



// 	// res.send(userLogin)

// })

// app.get('/userlist', async (req, res) => {

// 	const userList = await User.find().select('-password -__v')
//     console.log("🚀 ~ userList", userList)

// 	res.send(userList)
// })

module.exports.register = async (req, res) => {

    try {
        console.log("🚀 ~ hello register ", req.body)

        const salt = await bcrypt.genSalt(SALT_ROUNDS)

        const hashedPass = await bcrypt.hash(req.body.password, salt)
        console.log("register ~ hashedPass", hashedPass)

        req.body.password = hashedPass

        const user = await User.create(req.body)
        console.log("register ~ user", user)

        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '1h'})

        // sendEmail(token)

        res.send({success: true})
        
    } catch (error) {
        console.log("register ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}

module.exports.login = async (req, res) => {

    try {
        console.log("🚀 ~ hello login ", req.body)

        const user = await User.findOne({
            $or: [{username: req.body.emailOrUsername}, {email: req.body.emailOrUsername}]
        }).select('-__v')

        console.log("🚀 ~ login ~ user", user)

        if (!user) return res.send({success: false, errorId: 1})

        const passMatch = await bcrypt.compare(req.body.password, user.password)
        console.log("🚀 ~ login ~ passMatch", passMatch)

        if (!passMatch) return res.send({success: false, errorId: 1})

        const newUser = user.toObject()

        delete newUser.password

        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '1h'})
        console.log("🚀 ~ login ~ token", token)

        res.cookie('e04', token)

        res.send({success: true, user: newUser})
        
    } catch (error) {
        console.log("🚀 ~ login ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}

module.exports.list = async (req, res) => {

    try {
        console.log('Hello from list')

        const users = await User.find().select('-password -__v')
    
        res.send({success: true, users})
    } catch (error) {
        console.log("🚀 ~ list error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.logout = async (req, res) => {

    try {
        console.log('Hello from list')

        const users = await User.find().select('-password -__v')
    
        res.send({success: true, users})
    } catch (error) {
        console.log("🚀 ~ list error", error.message)

        res.send({success: false, error: error.message})
    }
   
}