import chai, { expect } from 'chai';
import chaiHttp = require('chai-http')
import {fakeData} from "../utils/constants";
const server = require("../index")

chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

let userToken = "";
let adminToken = "";
let managerToken = "";
let requestId: number | null = null;
let userId: number | null = null;

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

describe('Team', ()=> {
    before((done) => {
        Promise.all([
            requester
                .post("/api/auth/login")
                .send({email: adminEmail, password: adminPassword})
                .then((res) => {
                    adminToken = res.body.accessToken;
                    return;
                }),
            requester
                .post("/api/auth/registration")
                .send(fakeData[4])
                .then((res) => {
                    userToken = res.body.accessToken;
                    userId = res.body.user.id
                    return;
                })
        ]).then(() => {
            requester
                .post("/api/request/join-team")
                .set({"Authorization": `Bearer ${userToken}`})
                .send({"teamId": 1})
                .then((res) => {
                    requestId = res.body.id;
                    requester
                        .post(`/api/request/accept/${requestId}`)
                        .set({"Authorization": `Bearer ${adminToken}`})
                        .then((res) => {
                            console.log(res)
                            done();
                        })
                })
        });
    });
    it("[Team]: get all teams players", (done) => {
        requester
            .get("/api/team")
            .set({"Authorization": `Bearer ${userToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.teamA).to.be.a('Array');
                done();
            });
    });
    it("[Team]: get all  players from specific team", (done) => {
        requester
            .get("/api/team/1")
            .set({"Authorization": `Bearer ${userToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
})

