import chai, { expect } from 'chai';
import chaiHttp = require('chai-http')
import {fakeData} from "../utils/constants";
const server = require("../index")

chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

let userToken = "";
let managerToken = "";
let requestId: number | null = null;


describe("Request actions", () => {
    before((done) => {
        Promise.all([
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
                    managerToken = res.body.accessToken;
                    return
                })
        ]).then(() => {
            done();
        });
    });

    it("[User Request]:  join team query", (done) => {
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
    it("[User Request]:  decline req", (done) => {
        requester
            .post(`/api/request/decline/${requestId}`)
            .set({"Authorization": `Bearer ${userToken}`})
            .end((err, res) => {
                console.log(res)
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
})



// Decline Request


//Switch team request

// Decline Request



//quit team request

// Decline Request

//Manager accept request
//Manager decline request