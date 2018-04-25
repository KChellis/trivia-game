import { User } from './../src/user.js';
 describe ("User", function() {
   let user = new User("Tod");

   it("should store name and score in user", function() {
     expect(user.name).toEqual("Tod");
     expect(user.score).toEqual(0);
   });
   it("should determine difficulty of question", function() {
     user.checkLevel();
     expect(user.difficulty).toEqual("easy");
   });
 });
