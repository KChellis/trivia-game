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
    $(".result").show();
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
    $("#next").text("Next Question");
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
      user.level++;
      user.addScore();
      $(".score").text(user.score);
    }else {
      $(".correct").hide();
      $(".incorrect").show();
      user.level--;
      user.removeScore();
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
