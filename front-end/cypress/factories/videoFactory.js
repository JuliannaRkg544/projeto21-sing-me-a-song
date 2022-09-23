import { faker } from "@faker-js/faker";
import axios from "axios";

function createVideo() {
  const video = {
    name: faker.music.songName(),
    link: faker.internet.url(),
  };
  return video;
}

// async function postVideo() {
//   const video = createVideo();
//   axios
//     .post("http://localhost:4000/recommendations", video)
//     .then(res => console.log(res.data))
//     .catch(err=> console.log(err.response));
// }

export { createVideo };
