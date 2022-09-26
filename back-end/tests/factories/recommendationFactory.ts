import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";

async function createAtLeastTenRecomendations() {
  let recomendationsArray = [];
  for (let i = 0; i < 11; i++) {
    const recommendation = await prisma.recommendation.create({
      data: {
        name: faker.name.firstName(),
        youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
      },
    });
    recomendationsArray.push(recommendation);
  }

  return recomendationsArray;
}

function createOneVideo() {
  const video = {
    name: faker.name.firstName(),
    youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
  };
  return video;
}

async function createRecomendation() {
  const recomendation = await prisma.recommendation.create({
    data: {
      name: faker.name.firstName(),
      youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
    },
  });

  return recomendation;
}

async function createCompleteRecommendation() {
  const recomendation = await prisma.recommendation.create({
    data: {
      id: parseInt(faker.finance.amount(0, 5, 0)),
      name: faker.name.firstName(),
      youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
      score: 0,
    },
  });
  return recomendation;
}

async function createRecomendationsWithRandomScores(amount: number) {
  let recomendationsArray = [];
  for (let i = 1; i <= amount + 10; i++) {
    const recommendation = await prisma.recommendation.create({
      data: {
        name: faker.random.words(i),
        youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
        score: parseInt(faker.finance.amount(0, 200, 0)),
      },
    });
    recomendationsArray.push(recommendation);
  }
  const sortedRecommendations = sortByGreaterScores(recomendationsArray);

  return sortedRecommendations;
}

function sortByGreaterScores(recommendations: Recommendation[]) {
  return recommendations.sort((a, b) => (a.score < b.score ? 1 : -1));
}
export {
  createAtLeastTenRecomendations,
  createOneVideo,
  createRecomendation,
  createRecomendationsWithRandomScores,
  createCompleteRecommendation,
};

afterAll(async () => {
  await prisma.$disconnect();
});
