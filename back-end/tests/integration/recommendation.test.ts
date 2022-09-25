import supertest from "supertest";
import app from "../../src/app.js";
import { deleteAllData } from "./factories/deleteData.js";
import { prisma } from "../../src/database.js";
import * as recommendationFactory from "./factories/recommendationFactory.js";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await deleteAllData();
});

// describe("GET /recommendation", () => {
//   it("should return video list", async () => {
//     await recommendationFactory.createAtLeastTenRecomendations();
//     const { body } = await supertest(app).get("/recommendations");
//     console.log(body);
//     expect(body).toHaveLength(10);
//   });
// });

// describe("GET /recommendations/:id", () => {
//   it("should return a specific recomendation ", async () => {
//     const { id } = await recommendationFactory.createRecomendation();
//     const { body } = await supertest(app).get(`/recommendations/${id}`);
//     expect(body).not.toBe(null);
//   });
//   it("should return 404 to invalid recommendation ", async () => {
//     const id = -10;
//     const { status } = await supertest(app).get(`/recommendations/${id}`);
//     expect(status).toBe(404);
//   });
// });

// describe("GET recommendations /recommendations/top/:amount", () => {
//   it("should return the amount of recommendations sort by greater scores ", async () => {
//     const amount = parseInt(faker.finance.amount(1, 10, 0));

//     const recomendations =
//       await recommendationFactory.createRecomendationsWithRandomScores(amount);
//     const greaterScoreRecommendation = recomendations.slice(0, amount);

//     const { body } = await supertest(app).get(`/recommendations/top/${amount}`);

//     expect(body[0]).toStrictEqual(greaterScoreRecommendation[0]);
//     expect(body[amount - 1]).toStrictEqual(
//       greaterScoreRecommendation[amount - 1]
//     );
//   });

//   it("should return 404 to invalid recommendation ", async () => {
//     const id = -10;
//     const { status } = await supertest(app).get(`/recommendations/${id}`);
//     expect(status).toBe(404);
//   });
// });

// describe("POST recommendation /recommendation ", () => {
//   it("it should return 201 after user post ", async () => {
//     const video = recommendationFactory.createOneVideo();
//     const result = await supertest(app).post("/recommendations").send(video);
//     expect(result.status).toEqual(201);
//   });
// });

// describe("POST /recommendations/:id/upvote", ()=>{
//     it('should return 200 when upvoting', async ()=>{     
        
//         const recommendation = await recommendationFactory.createRecomendation()  
//         const {id,score} = await prisma.recommendation.findFirst({
//             where:{
//                 name: recommendation.name
//             }
//         })
        
        
//         const response = await supertest(app).post(`/recommendations/${id}/upvote`)
//         expect(response.status).toBe(200)

//         const verifyScore = await prisma.recommendation.findFirst({
//             where:{
//                 name: recommendation.name
//             }
//         })        
//         expect(verifyScore.score).toBeGreaterThan(score)
//     })
//     const number = faker.finance.amount(0,10,0)

//     it('should return 404 when upvoting an unexisting recommendation', async ()=>{    
                        
//         const response = await supertest(app).post(`/recommendations/${number}/upvote`)
//         expect(response.status).toBe(404)
      
//     })
// })

 describe("POST /recommendations/:id/downvote", ()=>{
     it('should return 200 when downvoting', async ()=>{     
        
    const recommendation = await recommendationFactory.createRecomendation()  
    const {id,score} = await prisma.recommendation.findFirst({
        where:{
            name: recommendation.name
        }
    })          
            
    const response = await supertest(app).post(`/recommendations/${id}/downvote`)
    expect(response.status).toBe(200)

    const verifyScore = await prisma.recommendation.findFirst({
        where:{
            name: recommendation.name
        }
    })        
    expect(verifyScore.score).not.toBeGreaterThanOrEqual(score)
 })
 it('should return 200 when downvoting an recommendation wich has -5 points score', async ()=>{     
        
    const recommendation = await recommendationFactory.createRecomendation()  

    const {id} = await prisma.recommendation.findFirst({
        where:{
            name: recommendation.name
        }
    })
    
    await prisma.recommendation.update({
        where:{id},
        data:{
            score:-5
        }
    })
            
    const response = await supertest(app).post(`/recommendations/${id}/downvote`)
    expect(response.status).toBe(200)

    const verifyRecommendation = await prisma.recommendation.findFirst({
        where:{
            id,
        }
    })        
    expect(verifyRecommendation).toBe(null)
})
it('should return 404 when downvoting an unexisting recommendation', async ()=>{    
        
    const number = faker.finance.amount(0,10,0)
    const response = await supertest(app).post(`/recommendations/${number}/downvote`)
    expect(response.status).toBe(404)
  
})

})

describe("GET /recommendations/random", () => {
  it("should return a 10 length array when get recommendations ", async () => {
    await recommendationFactory.createAtLeastTenRecomendations();

    const { body, status } = await supertest(app).get(
      "/recommendations/random"
    );
    expect(body).toBeTruthy();
    expect(status).toBe(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
