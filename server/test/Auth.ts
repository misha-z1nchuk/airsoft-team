import chai, { expect } from 'chai';
import chaiHttp = require('chai-http')
import {fakeData} from "../utils/constants";
const server = require("../index")

chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

describe('Auth', ()=> {
    it("[Sign-up]: register user", (done) => {
        requester
            .post("/api/auth/registration")
            .send(fakeData[0])
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
    describe("[Sign-up]: without params", () => {
        it("Email", (done) => {
            requester
                .post("/api/auth/registration")
                .send({ ...fakeData[2], email: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it("Password", (done) => {
            requester
                .post("/api/auth/registration")
                .send({ ...fakeData[2], password: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                });
        });
    });


})


