/// <reference types="cypress" />
import * as videosFactory from "../factories/videoFactory.js";

const URL = "http://localhost:3000/";
const URLrandom = "http://localhost:3000/random";
const URLtop = "http://localhost:3000/top";

describe("E2E tests, Route recommendations/",(()=>{
  beforeEach(() => {
    cy.request("POST", "http://localhost:4000/delete-all", {});
  })
  it("should post a video", () =>{
    const recommendation = videosFactory.createVideo()
    cy.visit(URL);
    cy.get("#name").type(recommendation.name);
    cy.get("#link").type(recommendation.youtubeLink)
    cy.get("#submmit-button").click();

    cy.url().should("equal", URL)

})
}))

describe("should create recommendations and show the top scores recommendation at /top", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:4000/delete-all", {});
  });
  const recommendation =  videosFactory.createVideo()

  it("should upvote a recommendation", () => {
    cy.visit(URL);
    cy.get("#name").type(recommendation.name);
    cy.get("#link").type(recommendation.youtubeLink);
    cy.get("#submmit-button").click();
    cy.visit(URL);
    cy.get("article div svg").eq(0).click();
    cy.visit(URLtop);
    cy.get("#row").should("have.text", 1);
  });
});

describe("should upvote a recommendation", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:4000/delete-all", {});
  });
  const recommendation = videosFactory.createVideo();
  it("should upvote a recommendation", () => {
    cy.visit(URL);
    cy.get("#name").type(recommendation.name);
    cy.get("#link").type(recommendation.youtubeLink);
    cy.get("#submmit-button").click();

    cy.visit(URL);
    cy.get("article div svg").eq(1).click();

    cy.url().should("equal", URL);
    cy.get("#row").should("have.text", -1);
  });
});



describe("should show a random recommendation ", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:4000/delete-all", {});
  });

  const recommendation = videosFactory.createVideo();
  it("ramdom recommendation", () => {
    videosFactory.createTenVideo()
    cy.visit(URLrandom);
    const video1 = cy.get("article div").eq(0)
    cy.visit(URL)
    cy.visit(URLrandom);
    cy.get("article div").eq(0).should("be.visible").and("not.equal",video1)
  });
});
