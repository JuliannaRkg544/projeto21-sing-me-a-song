import { faker } from "@faker-js/faker";
import axios from "axios";

function createVideo() {
  const video = {
    name: faker.music.songName(),
    youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`,
  };
  return video;
}

async function createTenVideo() {
  for (let i = 0; i < 10; i++) {
    let video = createVideo();
    axios
      .post("http://localhost:4000/recommendations", video)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }
}
export { createVideo, createTenVideo };
