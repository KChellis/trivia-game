class API {
  constructor(category, difficulty) {
    this.category = category;
    this.difficulty = difficulty;
    this.question;
    this.correct;
    this.options;
  }
  makeCall() {
    let promise = new Promise ((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://opentdb.com/api.php?amount=1&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;
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
      this.options.push(this.correct);
    });
  }
  checkAnswer(answer) {
    if (answer === this.correct) {
      return true;
    }else {
      return false;
    }
  }
  shuffleArray() {
    console.log(this.options);
    for (var i = 3; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.options[i];
      this.options[i] = this.options[j];
      this.options[j] = temp;
    }
  }
  setAnswer(choice) {
    let answer;
    if (choice === "A") {
      answer = this.options[0];
    }else if (choice === "B") {
      answer = this.options[1];
    }else if (choice === "C") {
      answer = this.options[2];
    }else if (choice === "D") {
      answer = this.options[3];
    }
    return answer;
  }
}
export { API };
