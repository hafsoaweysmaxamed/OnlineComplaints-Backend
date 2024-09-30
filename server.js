
const express = require("express")

const mongoose= require("mongoose")
const cors = require("cors")
const app = express()

app.use(express.json())

app.use(cors())

  mongoose.connect("mongodb://localhost:27017/OnlineComplaint").then(()=>{
    console.log("the database is connected successfuly")

}).catch((error)=>{
    console.log(error)
})

// insert

const complaintModel = require("./model/complaintSchema");
app.post("/complaint", async (req, res) => {
        const result = complaintModel(req.body);
        const saveResult = await result.save();

        if (saveResult) {
            res.send("complain has been registered successfully");
        }
    
});

// read

app.get("/complaint/management", async (req,res)=>{
const getAllResults = await complaintModel.find()
if(getAllResults){
        res.send(getAllResults)
    }
})


//update

app.put("/complaint/update/:id",async (req,res)=>{
  const updated= await complaintModel.updateOne(
        {_id: req.params.id},
        {$set: req.body} 
  )
   if(updated){
  res.send("complain has been updated succesfully")
  }
    
})

//delete

app.delete("/complaint/delete/:id", async (req,res)=>{
    const deleted = await complaintModel.deleteOne(
        {_id: req.params.id}
    )
    if(deleted){
        res.send("complain has been deleted successfully")
    }
})



 app.listen  (5000,   ()=>{
    console.log("the server port is running on port 5000")
})
