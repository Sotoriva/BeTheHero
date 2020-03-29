const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();//Limpa o banco antes da inicialização do teste
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "DSAD",
                email: "test@test.com.br",
                whatsapp: "44585858966",
                city: "SDAD",
                uf: "RE",
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});