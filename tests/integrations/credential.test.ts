import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { createCredential } from "../factories/credential.factory";
import supertest from "supertest";

beforeEach(async () => {
    await cleanDb();
});



describe(" /credentials", () => {

   describe("POST /credential", () => {
    it("should respond with 401 if no token is provided", async () => {
        const response = await supertest(app).post("/credentials");
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with 403 if invalid token is provided", async () => {

        const token = faker.internet.userName();
        const response = await supertest(app)
            .post("/credential")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.FORBIDDEN);


   });

   

    it("should respond with 200 if valid token is provided and body is correct  " , async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createCredential(user.id);
        const response = await supertest(app)
            .post("/credential")
            .set("Authorization", `Bearer ${token}`).send({
                title: faker.internet.userName(),
                password: faker.internet.password(10),
                url: faker.internet.url(),
                username: faker.internet.userName(),

            });
           
        expect(response.status).toBe(httpStatus.OK);



   });
   });
    describe("GET /credential", () => {
        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).get("/credentials");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with 403 if invalid token is provided", async () => {

            const token = faker.internet.userName();
            const response = await supertest(app)
                .get("/credential")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN);

        });

        it("should respond with 404 if there is no credential for this user", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await supertest(app)
                .get("/credential")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);

        });

    });

    describe("GET /credential/:id", () => {
        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).get("/credentials/1");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with 403 if invalid token is provided", async () => {

            const token = faker.internet.userName();
            const response = await supertest(app)
                .get("/credential/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN);

        });

        it("should respond with 404 if credential does not exist", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await supertest(app)
                .get("/credential/0")
                .set("authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);

        });

        it("should respond with 200 if valid token is provided", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const credential = await createCredential(user.id);
            const response = await supertest(app)
                .get(`/credential/${credential.id}`)
                .set("authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);

        });

    

        
        



    });

    describe("DELETE /credential/:id", () => {
        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).delete("/credentials/1");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with 403 if invalid token is provided", async () => {

            const token = faker.internet.userName();
            const response = await supertest(app)
                .delete("/credential/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN);

        });

   

        it("should respond with 200 if token is given and credential belongs to user", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const credential = await createCredential(user.id);
            const response = await supertest(app)
                .delete(`/credential/${credential.id}`)
                .set("authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);

        });
    });



});