class API {
  constructor(category) {
    this.category = category;
    this.count = [];
    this.resultsHard;
    this.resultsMedium;
    this.resultsEasy;
    this.question;
    this.correct;
    this.options;
  }
  callCount() {
    return new Promise ((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://opentdb.com/api_count.php?category=${this.category}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  callQuestions(difficulty) {
    let promise = new Promise ((resolve, reject) => {
      let request = new XMLHttpRequest();
      let count;
      if (difficulty === "hard") {
        count = this.count[2];
      }else if (difficulty === "medium") {
        count = this.count[1];
      }else if (difficulty === "easy") {
        count = this.count[0];
      }

      let url = `https://opentdb.com/api.php?amount=${count-1}&category=${this.category}&difficulty=${difficulty}&type=multiple`;
      console.log(url);
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
    promise.then((response) => {
      if (difficulty === "hard") {
        this.resultsHard = JSON.parse(response);
      }else if (difficulty === "medium") {
        this.resultsMedium = JSON.parse(response);
      }else if (difficulty === "easy") {
        this.resultsEasy = JSON.parse(response);
      }
    });
  }

  callback(difficulty) {
    this.callCount()
      .then((response) => {
        let body = JSON.parse(response);
        let easy =body.category_question_count.total_easy_question_count
        let medium = body.category_question_count.total_medium_question_count
        let hard =body.category_question_count.total_hard_question_count
        if(easy <= 50) {
          this.count.push(easy);
        }else {
          this.count.push(50);
        }
        if(medium <= 50) {
          this.count.push(medium);
        }else {
          this.count.push(50);
        }
        if(hard <= 50) {
          this.count.push(hard-7);
        }else {
          this.count.push(50);
        }
        return this.callQuestions(difficulty);
      });

  }

  getQuestion(difficulty) {
    let array;
    if (difficulty === "hard") {
      array = this.resultsHard.results;
    }else if (difficulty === "medium") {
      array = this.resultsMedium.results;
    }else if (difficulty === "easy") {
      array = this.resultsEasy.results;
    }
    let max = array.length - 1;
    let index = Math.floor(Math.random() * (max + 1));
    this.question = array[index].question;
    this.correct = array[index].correct_answer;
    this.options = array[index].incorrect_answers;
    this.options.push(this.correct);
    array.splice(index, 1);
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
