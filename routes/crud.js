var express = require('express');
var router = express.Router();
const User = require('./users');

router.post('/create', async function(req, res){
  const {name, email, age} = req.body;
  try {
    const user = new User({name, email, age});
    const savedUser = await user.save();
    res.status(201).json(savedUser); // Sending back the saved user as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sending error message as JSON
  }
});

router.get('/find', async function(req, res){
  try {
    const users = await User.find({});
    res.status(200).json(users); // Sending back the found users as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sending error message as JSON
  }
});

router.put('/users/:id', async function(req, res){
  const {id} = req.params;
  const {name, email, age} = req.body;
 
  try {
    const updateUser = await User.findByIdAndUpdate(id, {name, email, age}, {new: true});
    if (!updateUser) {
      return res.status(404).json({ error: 'User not found' }); // Sending error message as JSON
    }
    res.status(200).json(updateUser); // Sending back the updated user as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sending error message as JSON
  }
});

router.delete("/users/:id", async function(req, res){
  const {id} = req.params;
  try {
    const userDelete = await User.findByIdAndDelete(id);
    res.status(200).json(userDelete); // Sending back the deleted user as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sending error message as JSON
  }
});

module.exports = router;
