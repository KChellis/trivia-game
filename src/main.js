import { API } from "./api.js";
import { User } from "./user.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';



$(function() {
  let user;
  let api;
  let category;

  $("#nameForm").submit(function(event) {
    event.preventDefault();
    $("#nameForm").hide();
    $("#score").prepend("Score: ");
    $(".score").text("0");
    $("#timer").prepend("Time: ");
    $(".timer").text(30);
    $(".result").show();
    $("#gameTitle").hide();
    let name = $("#name").val();
    category = parseInt($("#category").val());
    user = new User(name);
    api = new API(category);
    api.callback("easy");
    setTimeout(() => {
      api.callQuestions("medium");
    }, 5000);
    setTimeout(() => {
      api.callQuestions("hard");
      console.log(api);
    }, 10000);
    $(".user").text(name);
  });

  $("#next").click(function() {
    $(".result").hide();
    $(".correct").hide();
    $(".incorrect").hide();
    $(".timeUp").hide();
    $("#next").text("Next Question");
    api.time = 30;
    $(".timer").text(api.time);
    user.checkLevel();
    api.getQuestion(user.difficulty);
    api.shuffleArray();
    $("#question").text("");
    $("#question").append(api.question);
    for (var i = 0; i < 4; i++) {
      let array = ["#optionA", "#optionB","#optionC","#optionD"];
      $(array[i]).text("");
      $(array[i]).append(api.options[i]);
    }
    $(".question-container").show().addClass("box-shadow");
    let timer = setInterval(() => {
      api.time--;
      $(".timer").text(api.time);
      if (api.time === 0) {
        $(".result").show();
        $(".correct").hide();
        $(".incorrect").hide();
        $(".timeUp").show();
        $(".question-container").hide().removeClass("box-shadow");
        user.level--;
        user.score -= 50;
        $(".score").text(user.score);
        user.wrong++;
        clearInterval(timer);
      }
    }, 1000);
    $(".option").click(function() {
      clearInterval(timer);
    });
  });

  $(".option").click(function() {
    let choice = $(this).val();
    let answer = api.setAnswer(choice);

    $(".result").show();
    $(".question-container").hide().removeClass("box-shadow");
    let correct = api.checkAnswer(answer);
    if (correct) {
      $(".correct").show();
      $(".incorrect").hide();
      $(".timeUp").hide();
      user.level++;
      user.addScore();
      $(".score").text(user.score);
    }else {
      $(".correct").hide();
      $(".incorrect").show();
      $(".timeUp").hide();
      user.level--;
      user.score -= 50;
      $(".score").text(user.score);
      user.wrong++;
    }
    setTimeout(() => {
      if (user.wrong === 10) {
        $(".loss").show();
        $(".result").hide();
      }
    }, 500);
  });

  $("#reload").click(function() {
    location.reload();
  });

});
