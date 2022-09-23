import supertest from "supertest";
import app from "../../src/app.js";
import {deleteAllData} from "./factories/deleteData.js"
import {prisma}  from "../../src/database.js"
import * as recommendationFactory from "./factories/recommendationFactory.js"

beforeEach(async()=>{
    await deleteAllData()
})

describe("GET /recommendation",()=>{
     it("should return video list", async ()=>{
        await recommendationFactory.createAtLeastTenRecomendations()
        const {body} = await supertest(app).get("/recommendations")
        console.log(body)
        expect(body).toHaveLength(10)
    })
})
describe("POST recommendation /recommendation ",()=>{
    it("it should return 201 after user post ", async () => {
        const video = recommendationFactory.createOneVideo()
        const result = await supertest(app).post("/recommendations").send(video);
        expect(result.status).toEqual(201);
      });
})

// describe("POST /recommendations/:id/upvote", ()=>{
//     it("should return ", async()=>{

//     })
// })
// describe("POST /recommendations/:id/downvote", ()=>{
//     it("should return ", async()=>{

//     })
// })

// describe("GET /recommendations/:id", ()=>{
//     it("should return ", async()=>{

//     })
// })

// describe("GET /recommendations/random", ()=>{
//     it("should return ", async()=>{

//     })
// })



afterAll(async () => {
    await prisma.$disconnect();
  });

