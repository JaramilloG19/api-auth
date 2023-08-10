import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import router from './src/routes/index.r'
import { dbConnect } from './src/config/mongoose'
const port = process.env.PORT ?? 3000
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is  running on por ${port} 🚀`)
})

void dbConnect()
