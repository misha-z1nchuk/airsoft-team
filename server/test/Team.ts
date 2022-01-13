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

describe('Team', ()=> {
    it("[Team]: get all teams players", (done) => {
        requester
            .post("/api/team")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.accessToken).to.be.a('string');
                done();
            });
    });
    it("[Sign-up]: password mismatch", (done) =>  {
        requester
            .post("/api/auth/registration")
            .send({ ...fakeData[1], password: "1" })
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });
    it("[Sign-up]: already exists email", (done) =>  {
        requester
            .post("/api/auth/registration")
            .send(fakeData[0])
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                done();
            })
    });


