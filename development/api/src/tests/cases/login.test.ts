import request from "supertest";
import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../../app";
import * as faker from "faker";

const user = {
  email: "koviid@mail.ee",
  password: "Koviid",
};
const regularUser = {
  email: "krispi@mail.ee",
  password: "Krispi",
};
const fakeUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const wrongUserPassword = {
  email: "koviid@mail.ee",
  password: "Koviid1",
};

let firstname: string = faker.name.firstName();
let lastname: string = faker.name.lastName();
let password: string = faker.internet.password();
let email: string = faker.internet.email();
let token: string;
let userToken: string;
let fakeToken: string = faker.internet.password();
let userId: number;
let id: number = 9999;

describe("Login controller", () => {
  describe("POST /login", () => {
    it("responds with code 200 and token after login", async () => {
      const response = await request(app).post("/login").send(user);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });
    it("responds with code 200 and token after login", async () => {
      const response = await request(app).post("/login").send(regularUser);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      userToken = response.body.token;
    });
    it("responds with code 401 and users information", async () => {
      const response = await request(app).post("/login").send(fakeUser);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Check credentials");
    });
    it("responds with code 401 and users information", async () => {
      const response = await request(app)
        .post("/login")
        .send(wrongUserPassword);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Check password");
    });
  });
});
