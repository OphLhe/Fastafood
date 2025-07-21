import request from 'supertest';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import app from '../index.js';

let token;
let emailToDelete = [];

describe('test user routes', () => {
    // test et récupération du token
    beforeAll(async () => {
        // arrange : préparation de données valides
        const firstName = 'John';
        const lastName = 'Doe';
        const password = 'abc123'

        // act : envoi de la requête de connexion avec les données
        const result = await request(app)
            // envoi de la requête de connexion avec les données
            .post('/api/login')
            // execution de la requête
            .send({ firstName, lastName, password });

            // assertion : vérification du statut de la réponse et du token
            expect(result.statusCode).toBe(201);
            expect(result.body.token).toBeDefined();
            token = result.body.token; // sauvegarde du token pour les tests suivants
    });

    // supprime tout les employés crées pendant les tests
    afterEach (async ()=> {
        
         // si le tableau n'est pas vide, on supprime les employés
        // dont les emails sont dans le tableau
        if (emailToDelete.length > 0){
        //on récupère tous les employés
        //et on supprime ceux dont l'email est dans le tableau emailToDelete
            const findEmployee = await request(app)
            .get('/api/employee')
            .set ('Authorization', `${token}`)

            const allUser = findEmployee.body
            // on parcourt le tableau emailToDelete
            // et on supprime les employés dont les emails sont dans le tableau
            for (const mail of emailToDelete){
                // on cherche l'utilisateur dans la liste des employés
                // et on le supprime si il existe
                const user = allUser.find((index) => index.mail === mail)
                if(user){
                    await request(app)
                    .delete(`/api/employee/${user.id}`)
                    .set('Authorization', `${token}`)  
                }          
            }

        }      
    })

    // test récupération de tout les employés
    it('should get all user', async () => {
        // act : envoi de la requête pour récupérer les employés
        const allUser = await request(app)
            .get('/api/employee')
            .set('Authorization', `${token}`);
        // assertion : vérification du statut de la réponse et du type de données
        expect(allUser.statusCode).toBe(200);
        expect(typeof allUser.body).toBe('object');
    })

    // test création d'un employé
    it(' should create an employee', async () => {
        // arrange
        const newEmployee = {
            firstName: 'John',
            lastName: 'Doe',
            mail: 'john@do',
            password: 'abc123',
            role: 'manager'
        }
        // act
        const  createUser = await request(app)
            .post('/api/register')
            .send(newEmployee);
            // assertion
            expect(createUser.statusCode).toBe(201);
            // ajout de l'email à la liste pour la suppression
            emailToDelete.push(newEmployee.mail); // sauvegarde de l'email pour la suppression
    })

});