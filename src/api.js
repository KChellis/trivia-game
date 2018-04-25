class API {
  constructor(category, level) {
    this.category = category;
    this.level = level;
    this.question;
    this.correct;
    this.options;
  }
  makeCall() {
    let promise - new Promise (function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://opentdb.com/api.php?amount=1&category=${this.category}&difficulty=${this.level}&type=multiple`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      body = JSON.parse(response);
      this.question = body.results.question;
      this.correct = body.results.correct_answer;
      this.options = body.results.incorrect_answers;
    });
  }
}
