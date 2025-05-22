const mongoose = require('mongoose')// schema yo anusar form banauni 
const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the book title"],
        },
        author: {
            type: String,
            required: [true, "Please enter the book author"],
        },
        description: {
            type: String,
            required: [true, "Please enter the book description"],
        },
        genre: {
            type: String,
            required: [true, "Please enter the book genre"],
        },
  },
  {
    timestamps: true,
  }
)
const Book = mongoose.model("Book", BookSchema)
module.exports = Book

















