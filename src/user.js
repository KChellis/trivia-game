class User {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.level = 0;
    this.wrong = 0;
    this.difficulty;
  }
  checkLevel() {
    if(this.level < 0) {
      this.level = 0;
    }
    if(this.level > 14) {
      this.difficulty = "hard";
    } else if (this.level > 4) {
      this.difficulty = "medium";
    }else {
      this.difficulty = "easy";
    }
  }
  addScore() {
    if(this.difficulty === "easy"){
      this.score += 50;
    }else if (this.difficulty === "medium") {
      this.score += 100;
    }else if (this.difficulty === "hard") {
      this.score += 200;
    }
  }

  removeScore() {
    if(this.difficulty === "easy"){
      this.score -= 50;
    }else if (this.difficulty === "medium") {
      this.score -= 100;
    }else if (this.difficulty === "hard") {
      this.score -= 200;
    }
  }
}
export { User };
