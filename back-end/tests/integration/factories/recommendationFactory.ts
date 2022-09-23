import {prisma} from "../../../src/database.js"
import {faker} from "@faker-js/faker"

 async function createAtLeastTenRecomendations() {
    let recomendationsArray =[]
    for(let i=0;i<11;i++){
      const recommendation = await prisma.recommendation.create({
        data: {
          name: faker.name.firstName(),
          youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        }
      });
      // recomendationsArray.push(recommendation)
    }
  
    return recomendationsArray;
  }

 function createOneVideo(){
  const video = {
    name: faker.name.firstName(),
    youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
  }
  return video

 }
  export {
    createAtLeastTenRecomendations, createOneVideo
  }