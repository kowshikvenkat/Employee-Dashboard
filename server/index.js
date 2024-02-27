const express = require("express"),
  app = express(),
  port = 5000,
  cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://kowshik:Kowshik333*@cluster0.fvvraey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      connectionParams
    );
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
    console.log("couldn't connect database");
  }
});

database();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

const Userschema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  joining_date: String,
  role: String,
});
Userschema.index({ name: 1, address: 1 });
const RegisterSchema = mongoose.model("users", Userschema);

app.post("/createUser", (req, res) => {
  var user = {
    name: req.body.name.toLowerCase(),
    age: req.body.age,
    address: req.body.address.toLowerCase(),
    joining_date: req.body.joiningDate,
    role: req.body.role,
  };

  RegisterSchema.create(user)
    .then((result) => {
      res.status(200).send("Successfully added user");
      console.log("New user added");
    })
    .catch((err) => {
      res.status(400).send("Can't add user now with the credentials");
      console.log("Can't add user", err);
    });
});

app.post("/find", (req, res) => {
  if (req.body.name.length > 0 && req.body.address.length > 0) {
    RegisterSchema.find(
      {
        $and: [
          { name: { $regex: req.body.name.toLowerCase() } },
          { address: { $regex: req.body.address.toLowerCase() } },
        ],
      },
      function (err, docs) {
        if (docs) {
          res.status(200).send({ docs: docs });
        } else {
          res.status(400).send("No record found");
        }
      }
    );
  } else if (req.body.name.length > 0) {
    RegisterSchema.find(
      { name: { $regex: req.body.name.toLowerCase() } },
      function (err, docs) {
        if (docs) {
          res.status(200).send({ docs: docs });
        } else {
          res.status(400).send("No record found");
        }
      }
    );
  } else if (req.body.address.length > 0) {
    RegisterSchema.find(
      { address: { $regex: req.body.address.toLowerCase() } },
      function (err, docs) {
        if (docs) {
          res.status(200).send({ docs: docs });
        } else {
          res.status(400).send("No record found");
        }
      }
    );
  }
});

app.post("/updateUser", (req, res) => {
  RegisterSchema.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    joining_date: req.body.joiningDate,
    role: req.body.role,
  })
    .then((result) => res.status(200).send("Successfully updated data"))
    .catch((err) => res.statusMessage(400).send("failed to update data"));
});

app.post("/deleteUser", (req, res) => {
  RegisterSchema.findByIdAndDelete(req.body.id,function(err,docs){
    if(err)
    res.status(400).send("error")
else
res.status(200).send("Deleted successfully")
  })
});
