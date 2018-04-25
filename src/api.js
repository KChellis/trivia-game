class API {
  constructor(category, level) {
    this.category = category;
    this.level = level;
    this.question;
    this.correct;
    this.options;
  }
  makeCall() {
    let promise = new Promise ((resolve, reject) => {
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

    promise.then((response) => {
      let body = JSON.parse(response);
      this.question = body.results[0].question;
      this.correct = body.results[0].correct_answer;
      this.options = body.results[0].incorrect_answers;
    });
  }
}
export { API };
