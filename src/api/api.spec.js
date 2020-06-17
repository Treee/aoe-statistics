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

        it('adds a player to the DB', (done) => {
            const dbCreatePlayerSpy = spyOn(database, 'createPlayer').and.callThrough();
            const expectedPlayerPayload = {
                name: "testTeam",
                team: "Test Team 1"
            };
            const opts = {
                url: "http://localhost:3000/api/player",
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                json: true,
                body: { name: expectedPlayerPayload.name, team: expectedPlayerPayload.team }
            };
            request.post(opts, (error, response) => {
                expect(response.statusCode).toEqual(200);
                expect(dbCreatePlayerSpy).toHaveBeenCalledWith(expectedPlayerPayload.name, expectedPlayerPayload.team);
                expect(response.body.name).toBe(expectedPlayerPayload.name);
                expect(response.body.team).toBe(expectedPlayerPayload.team);
                done();
            });
        });
    });

    describe('/api/tournaments', () => {
        it('returns a list of tournaments in the DB', (done) => {
            const dbGetAllTournamentsSpy = spyOn(database, 'getAllTournaments').and.callThrough();
            request.get("http://localhost:3000/api/tournaments", (error, response) => {
                expect(response.statusCode).toEqual(200);
                expect(dbGetAllTournamentsSpy).toHaveBeenCalled();
                expect(response.body.length).toBeGreaterThan(0);
                done();
            });
        });

    });

});
