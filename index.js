import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import bdd from './config/db.js';
import userRoutes from './routes/user.routes.js'

// création de l'application express 
const app = express();

// middleware 
app.use(cors()); 
app.use(express.json());
// utilisation de dotenv pour charger les variables d'environnement 
dotenv.config();

// utilisation des routes 
app.use('/api', userRoutes)

// démarrage du rserver sur le port défini dans le fichier .env 
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    if(bdd){
        console.log('Database connection established');
    }
});