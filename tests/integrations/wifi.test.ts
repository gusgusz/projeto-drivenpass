import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { createWifi }  from "../factories/wifi.factory";
import supertest from "supertest";

beforeAll(async () => {
    await cleanDb();
});

let u = {};

describe(" /wifi", () => {

   describe("POST /wifi", () => {
    it("should respond with 401 if no token is provided", async () => {
        const response = await supertest(app).post("/wifi");
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with 403 if invalid token is provided", async () => {

        const token = faker.internet.userName();
        const response = await supertest(app)
            .post("/wifi")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.FORBIDDEN);


    });

  


    it("should respond with 401 if valid token is provided but body is not correct  " , async () => {

        const token = await generateValidToken();
        const response = await supertest(app)
            .post("/wifi")
            .set("Authorization", `Bearer ${token}`).send({
                name: faker.internet.userName(),
                password: faker.internet.password(10),
                url: faker.internet.url(),
                username: faker.internet.userName(),

            });
           

           
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);


    });

    it("should respond with 200 if valid token is provided and body is correct  " , async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const response = await supertest(app)
            .post("/wifi")
            .set("authorization", `Bearer ${token}`)
            .send({
                title: faker.internet.userName(),
                password: faker.internet.password(10),
                network: faker.internet.url(),

            });
        
           
        expect(response.status).toBe(httpStatus.OK);
   });
    });


    describe("GET /wifi", () => {

        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).get("/wifi");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

     

        it("should respond with 403 if invalid token is provided", async () => {

            const token = faker.internet.userName();
            const response = await supertest(app)
                .get("/wifi")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });

      
        it("should respond with 200 if valid token is provided and body is correct  " , async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
           
          
            const response = await supertest(app)
                .get("/wifi")
                .set("authorization", `Bearer ${token}`);
               
            expect(response.status).toBe(httpStatus.OK);

        });
    });

    describe("GET /wifi/:id", () => {

        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).get("/wifi/1");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with 403 if invalid token is provided", async () => {

            const token = faker.internet.userName();
            const response = await supertest(app)
                .get("/wifi/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });

        it("should respond with 401 if valid token is provided but wifi dont belong to user  " , async () => {
            const user = await createUser();
            const user2 = await createUser();
            const token = await generateValidToken(user);
            const token2 = await generateValidToken(user2);
            const wifi = await createWifi(user.id);
            const response = await supertest(app)
                .get(`/wifi/${wifi.id}`)
                .set("authorization", `Bearer ${token2}`);
                expect(response.status).toBe(httpStatus.UNAUTHORIZED);

        });


        it("should respond with 404 if valid token is provided but id is not correct  " , async () => {
                
                const token = await generateValidToken();
                const response = await supertest(app)
                    .get("/wifi/1")
                    .set("Authorization", `Bearer ${token}`);
                
                expect(response.status).toBe(httpStatus.NOT_FOUND);
            });

        // it("should respond with 200 if valid token is provided and id is correct  " , async () => {
        //     const user = await createUser();
        //     const token = await generateValidToken(user);
        //     const wifi = await createWifi(user.id);
        //     const response = await supertest(app)
        //         .get(`/wifi/${wifi.id}`)
        //         .set("authorization", `Bearer ${token}`);
            
        //     expect(response.status).toBe(httpStatus.O);
        // });

   
        });
   

       
    

    describe("DELETE /wifi/:id", () => {
        it("should respond with 401 if no token is provided", async () => {
            const response = await supertest(app).delete("/wifi/1");
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with 403 if invalid token is provided", async () => {
                
                const token = faker.internet.userName();
                const response = await supertest(app)
                    .delete("/wifi/1")
                    .set("Authorization", `Bearer ${token}`);
                expect(response.status).toBe(httpStatus.FORBIDDEN);
            });

      

        it("should respond with 404 if valid token is provided but id is not correct  " , async () => {
                
                const token = await generateValidToken();
                const response = await supertest(app)
                    .delete("/wifi/1")
                    .set("Authorization", `Bearer ${token}`);
                
                expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it("should respond with 200 if valid token is provided and id is correct  " , async () => {

            const user = await createUser();
            const wifi = await createWifi(user.id);
            const token = await generateValidToken(user);
            const response = await supertest(app)
                .delete(`/wifi/${wifi.id}`)
                .set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.OK);
        }
        );

    });
    
});