const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const bookRoutes = require("./routes/bookRoutes")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

dotenv.config()
connectDB() // Connect MongoDB

const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

app.use(express.json())

// Routes
app.use("/api/books", bookRoutes)

// Error Handling Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

