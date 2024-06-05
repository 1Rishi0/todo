import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port =4000;

const uri = "mongodb+srv://msrishi:Rishitha20!@cluster0.tv3cy.mongodb.net/";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Connected to Database');
    })
    .catch((err)=>{
        console.log('Error connecting to Database');
    });

    const UserSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
    })

const User = mongoose.model('user', UserSchema);

app.use(express.json());
app.use(cors());

app.post('/register', async(req, res)=>{
    try{
        const{name, password}=req.body;

        const existingUser= await User.findOne({name});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser= new User({name, password});
        await newUser.save();

        res.status(201).json({message: 'User registered successfully'});
    }
    catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
});

app.get('/users' , async(req,res)=>{
    try{
        const users= await User.find({});

        res.json(users);
    }
    catch(error){
        console.error('Error registering users:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
