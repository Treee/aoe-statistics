const SECRETS = require("../../secrets");
const request = require('request');
describe('API Server', () => {

    const server = require("./api");
    const mongoose = require('mongoose');
    const database = require("../db/db-connector")(mongoose, SECRETS.testUserName, SECRETS.testUserPassword);


    beforeAll(() => {
        database.startServer('test');
        server.startServer(3000, database);
    });

    it('does something', () => {
        expect(true).toBe(true);
    });

    describe('/api/players', () => {
        it('returns a list of players in the DB', (done) => {
            const dbgetAllPlayersSpy = spyOn(database, 'getAllPlayers').and.callThrough();
            request.get("http://localhost:3000/api/players", (error, response) => {
                expect(response.statusCode).toEqual(200);
                expect(dbgetAllPlayersSpy).toHaveBeenCalled();
                expect(response.body.length).toBeGreaterThan(0);
                done();
            });
        });

    });

})
