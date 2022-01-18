import chai, {expect} from 'chai';
import chaiHttp = require('chai-http')
import {fakeData} from "../utils/constants";

const server = require("../index")

chai.use(chaiHttp);
const uuid = require('uuid')
const requester = chai.request(server).keepOpen();
let adminToken = "";
let userToken = "";
let reqId : number | null= null;
let userId : number | null= null;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

describe("Admin actions", () => {
    before( (done) => {
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
                .send(fakeData[5])
                .then((res) => {
                    userToken = res.body.accessToken;
                    userId = res.body.user.id
                    return;
                })
        ]).then(() => {
            requester
                .post("/api/request/join-team")
                .set({ "Authorization": `Bearer ${ userToken }` })
                .send({ "teamId": 1 })
                .then((res) => {

                    reqId = res.body.id;
                    done();
                });
            });
        });
    it("[Admin]: accept join team query", (done) => {
        requester
            .post(`/api/request/accept/${reqId}`)
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[Admin]: block player", (done) => {
        requester
            .post("/api/user/block-unblock")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "userId": userId,
                "reason": "Banned"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });
    it("[Admin]: unblock player", (done) => {
        requester
            .post("/api/user/block-unblock")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "userId": userId,
                "reason": "Banned"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });
    it("[User]: get player info by id", (done) => {
        requester
            .get(`/api/user/${userId}`)
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });

    it("[User]: change email ", (done) => {
        requester
            .post(`/api/user/change-email`)
            .set({ "Authorization": `Bearer ${ userToken }` })
            .send({"new_email": `somemail${uuid.v4()}@gmail.com`})
            .end((err, res) => {
                console.log(res.body)
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });
})



