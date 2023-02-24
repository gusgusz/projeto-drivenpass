import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import httpStatus from "http-status";
import { cleanDb } from "../helpers";
import supertest from "supertest";




const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("POST sign-up", () => {
  it("should respond with 401 if no email is given", async () => {
    const response = await supertest(app).post("/sign-up").send({
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with 401 if no password is given", async () => {
    const response = await supertest(app).post("/sign-up").send({
      email: faker.internet.email(),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with 401 when given password has less then 10 characters", async () => {
    const response = await supertest(app).post("/sign-up").send({
      email: faker.internet.email(),
      password: faker.internet.password(9),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with 401 when given email is not valid", async () => {
    const response = await supertest(app).post("/sign-up").send({
      email: faker.internet.userName(),
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });




  it("should respond with 201 when given email and password are valid", async () => {
    
    const response = await supertest(app).post("/sign-up").send({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.CREATED);
  });

});

describe("POST sign-in", () => {
  it("should respond with 401 if no email is given", async () => {
    const response = await supertest(app).post("/sign-in").send({
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with 401 if no password is given", async () => {
    const response = await supertest(app).post("/sign-in").send({
      email: faker.internet.email(),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with 401 when given password has less then 10 characters", async () => {
    const response = await supertest(app).post("/sign-in").send({
      email: faker.internet.email(),
      password: faker.internet.password(9),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with 401 when given email is not valid", async () => {
    const response = await supertest(app).post("/sign-in").send({
      email: faker.internet.userName(),
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
 it("it should respond with 200 when given email and password are valid", async () => {

    const user = await createUser();
    const response = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.password,
    });
    expect(response.status).toBe(httpStatus.OK);
    expect(typeof response.body).toBe("string");
  
  });
});
