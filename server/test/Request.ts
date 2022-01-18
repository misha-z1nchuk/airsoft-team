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

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;


describe("Request actions", () => {
    before((done) => {
        Promise.all([
            requester
                .post("/api/auth/login")
                .send({email: adminEmail, password:  adminPassword})
                .then((res) => {
                    adminToken = res.body.accessToken;
                    return;
                }),
            requester
                .post("/api/auth/registration")
                .send(fakeData[2])
                .then((res) => {
                    userToken = res.body.accessToken;
                    return;
                }),
            requester
                .post("/api/auth/registration")
                .send(fakeData[3])
                .then((res) => {
                    requestId = res.body.request.id;
                    return
                }).then( async () => {
                await requester
                    .post(`/api/request/accept/${requestId}`)
                    .set({ "Authorization": `Bearer ${adminToken}` })
                    .then((res) => {
                        return
                    })
                }),
        ]).then(async () => {
            await requester
                .post("/api/auth/login")
                .send({email: fakeData[3].email, password: fakeData[3].password} )
                .then((res) => {
                    managerToken = res.body.accessToken;
                    done();
                })
        });
    });

    it("[User Request]:  join team ", (done) => {
        requester
            .post(`/api/request/join-team`)
            .set({"Authorization": `Bearer ${userToken}`})
            .send({teamId: 1})
            .end((err, res) => {
                requestId = res.body.id;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[User Request]:  join team one more time", (done) => {
        requester
            .post(`/api/request/join-team`)
            .set({"Authorization": `Bearer ${userToken}`})
            .send({teamId: 1})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });
    it("[Manager Request]:  accept req", (done) => {
        requester
            .post(`/api/request/accept/${requestId}`)
            .set({"Authorization": `Bearer ${managerToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[User Request]:  change team", (done) => {
        requester
            .post(`/api/request/change-team`)
            .set({"Authorization": `Bearer ${userToken}`})
            .send({new_team: 2})
            .end((err, res) => {
                requestId = res.body.request.id;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });
    it("[User Request]:  decline req", (done) => {
        requester
            .post(`/api/request/decline/${requestId}`)
            .set({"Authorization": `Bearer ${userToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[User Request]:  decline req one more time", (done) => {
        requester
            .post(`/api/request/decline/${requestId}`)
            .set({"Authorization": `Bearer ${userToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
    it("[User Request]: quit team", (done) => {
        requester
            .post(`/api/request/quit-team`)
            .set({"Authorization": `Bearer ${userToken}`})
            .send({new_team: 1})
            .end((err, res) => {
                requestId = res.body.request.id;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[User Request]:  Accept change team req req", (done) => {
        requester
            .post(`/api/request/accept/${requestId}`)
            .set({"Authorization": `Bearer ${managerToken}`})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
})




