describe("E2E /TEST - RECOMMENDATIONS/", () => {
  it("should load videos ", () => {
    let video= 0
    cy.intercept({
      method: "GET",
      url: "/recommendations",
    }).as("get_videos");
    cy.visit("http://localhost:3000");
    cy.wait("@get_videos").then((intercept) => {
      const arr = intercept.response.body;
       video = arr.length
      cy.log("VIDEOS",arr)
    });
    cy.get("article").then((articles) => {
      expect(articles.length).to.equals(video);
    });
  });
});
