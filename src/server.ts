import express from 'express'
import userRoutes from './routes/user.routes'
import { dbConnection } from './config/database';
import { uptime } from 'process';

const app=express()
const port=3000;

app.use(express.json());
app.use('/api/users',userRoutes);
app.get('/',(req,res)=>{
    res.json({status:'ok',
    uptime:process.uptime()})
})

dbConnection().then(()=>app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})).catch(err=>{console.error('Failed to connect to the database', err)})

export default app;