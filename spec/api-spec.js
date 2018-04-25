import { API } from './../src/api.js';

describe ("API", function() {
  let api = new API(9, "easy");

  it ("should assign results from api call to api properties", function() {
    api.makeCall();
    console.log(api);
    console.log(api.question);
    setTimeout(() => {
      expect(api.question).toBeDefined();
      expect(api.correct).toBeDefined();
      expect(api.options).toBeDefined();
    }, 3000);

  });
});
