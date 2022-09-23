/// <reference types="cypress" />
import * as videosFactory from "../factories/videoFactory.js";
import {faker} from "@faker-js/faker"


describe("E2E TEST - Route recommendations/", () => {
  it("should post a video",  () => {
    const video =  videosFactory.createVideo();
    cy.intercept({
      method: "GET",
      url: "/recommendations",
    }).as("get_videos");
    cy.visit("http://localhost:3000"); 
    cy.wait("@get_videos");
    cy.get("#name").type(video.name);
    cy.get("#link").type(video.link);
    cy.intercept({
      method: "POST",
      url: "/recommendations",
    }).as("post_video");
    cy.get("#submmit-button").click();
    cy.wait("@post_video").then((interception) => {
      cy.log("LOGO DE INTERCEPTION ", interception);
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("should load videos ", () => {
    let videoNum = 0;
    cy.intercept({
      method: "GET",
      url: "/recommendations",
    }).as("get_videos");
    cy.visit("http://localhost:3000");
    cy.wait("@get_videos").then((intercept) => {
      const arr = intercept.response.body;
      videoNum = arr.length;
      cy.log("VIDEOS", intercept);
    });
    cy.get("article").then((articles) => {
      expect(articles.length).to.equals(videoNum);
    });
  });
});
