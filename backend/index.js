import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port =4000;

// const uri = "mongodb+srv://msrishi:Rishitha20!@cluster0.tv3cy.mongodb.net/";

const uri = "mongodb+srv://msrishitha:Rishitha20!@cluster0.2ylum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
    })

    const TaskSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
        },
        tasks:{
            type: [String],
            required: true,
        },
    })

const User = mongoose.model('user', UserSchema);
const Task = mongoose.model('tasks', TaskSchema);

app.use(express.json());
app.use(cors());

app.post('/register', async(req, res)=>{
    try{
        const{name, email, password}=req.body;

        const existingUser= await User.findOne({name});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser= new User({name, email, password});
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

app.post("/addTask", async(req,res)=>{
    try{
        const{username, tasks } = req.body;
        let user = await Task.findOne({username: username});
        if(!user){
            user = new Task({
            username: username,
            tasks:tasks
        })
    }
        else{
            user.tasks.push(...tasks);
        }
        await user.save();
        res.status(201).json({message: "Tasks added successfully"});
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
})

app.post('/getTasks' , async(req,res)=>{
    try{
        const {username} = req.body;
        const user = await Task.findOne({username: username});
        console.log("User is ", user);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const tasks= user.tasks;
        res.status(200).json(tasks);      
    }
    catch(error){
        console.log('Error getting tasks:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
