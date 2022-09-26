import { jest } from "@jest/globals";
import { prisma } from  "../../src/database"
import { deleteAllData } from "../factories/deleteData.js";
import { faker } from "@faker-js/faker";
import { recommendationService }  from "../../src/services/recommendationsService.js";
import { recommendationRepository }  from "../../src/repositories/recommendationRepository.js";
import * as recommendationFactory from "../factories/recommendationFactory.js"


beforeEach(async() => {
    await deleteAllData();
});


describe("create recommendation", ()=>{

    it("should insert a recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {});
        const video = recommendationFactory.createOneVideo()
        await recommendationService.insert(video);
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();

    })

    it("should not create a recommendation with the same name", async ()=>{
        const video = recommendationFactory.createOneVideo()       
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {
            return video
        });
        const promise = recommendationService.insert(video);
        expect(promise).rejects.toEqual({ message: "Recommendations names must be unique", type: "conflict" });
    });    

})

describe("upvote recommendation ",()=>{

    it("should upvote a recommendation" , async ()=>{
        const video = await recommendationFactory.createCompleteRecommendation()  
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(video);
        await recommendationService.upvote(video.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();

    })

    it("should not upvote an invalid recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);        
        const promise = recommendationService.upvote(0);
        expect(promise).rejects.toEqual({ message: "",type: "not_found" });

    })  
})

describe("downvote recommendation ",()=>{

    it("should downvote a recommendation" , async ()=>{
        const video = await recommendationFactory.createCompleteRecommendation() 
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(video);
        await recommendationService.downvote(video.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();

    })

    it("should not downvote an invalid recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);        
        const promise = recommendationService.downvote(0);
        expect(promise).rejects.toEqual({ message: "",type: "not_found" });

    })

    it("should downvote a recommendation with score less than -5" , async ()=>{
        const video = await recommendationFactory.createCompleteRecommendation() 
        video.score = -6
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(video);
        jest.spyOn(recommendationRepository,"remove").mockImplementationOnce(null)
        await recommendationService.downvote(video.id)
        expect(recommendationRepository.remove).toHaveBeenCalled();
    })

})

describe("get recommendation by Id", ()=>{

    it("should return a recommendation" , async ()=>{
        const video = await recommendationFactory.createCompleteRecommendation() 
        jest.spyOn(recommendationRepository,"find").mockResolvedValueOnce(video)
        await recommendationService.getById(video.id)
        expect(recommendationRepository.find).toHaveBeenCalled()
    })

    it("should not return a recommendation" , async ()=>{
        const video = await recommendationFactory.createCompleteRecommendation() 
        jest.spyOn(recommendationRepository,"find").mockResolvedValueOnce(undefined)
        const promise = recommendationService.getById(0)
        expect(promise).rejects.toEqual({ message: "",type: "not_found" })
    })

})

describe("get top recommendations", ()=>{

    it("should return all recommendations" , async ()=>{
        const amount = parseInt(faker.finance.amount(0,15,0))
        const video = await recommendationFactory.createRecomendationsWithRandomScores(amount)
        jest.spyOn(recommendationRepository,"getAmountByScore").mockResolvedValueOnce(video)
        await recommendationService.getTop(amount)
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    })   

})

describe("get random recommendations", ()=>{

    it("should return random recommendations" , async ()=>{
        const video = await recommendationFactory.createRecomendationsWithRandomScores(10)
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce(video)
        await recommendationService.getRandom()
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    }) 
    
    it("should not return random recommendations" , async ()=>{        
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce([])
        const promise = recommendationService.getRandom()
        expect(promise).rejects.toEqual({ message: "",type: "not_found" })
    }) 

    it("should return random recommendations with scores" , async ()=>{        
        const video = await recommendationFactory.createRecomendationsWithRandomScores(10)
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce(video)
        await recommendationService.getRandom()
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    })

})

afterAll(async()=>{
    await prisma.$disconnect()
})



