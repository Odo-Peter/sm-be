const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: String,
  checked: Boolean,
});

todoSchema.set('toJSON', {
  transform: (document, returnedTodo) => {
    returnedTodo.id = returnedTodo._id.toString();
    delete returnedTodo._id;
    delete returnedTodo.__v;
  },
});

module.exports = mongoose.model('Todo', todoSchema);
