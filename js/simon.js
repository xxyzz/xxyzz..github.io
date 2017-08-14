document.addEventListener('DOMContentLoaded', function() {
  var power = false,
    start = false,
    strict = false,
    play_array = [],
    user_array = [],
    press_right = true,
    finish_press = true,
    audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    green_button = document.getElementById('green'),
    red_button = document.getElementById('red'),
    yellow_button = document.getElementById('yellow'),
    blue_button = document.getElementById('blue');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function press_green() {
    green_button.style.backgroundColor = "#C8E6C9";
    audio1.play();
    await sleep(200);
    green_button.style.backgroundColor = "#4caf50";
  }

  async function press_red() {
    red_button.style.backgroundColor = "#FFCDD2";
    audio2.play();
    await sleep(200);
    red_button.style.backgroundColor = "#f44336";

  }

  async function press_yellow() {
    yellow_button.style.backgroundColor = "#FFF9C4";
    audio3.play();
    await sleep(200);
    yellow_button.style.backgroundColor = "#ffeb3b";

  }

  async function press_blue() {
    blue_button.style.backgroundColor = "#BBDEFB";
    audio4.play();
    await sleep(200);
    blue_button.style.backgroundColor = "#2196f3";

  }


  document.getElementById('power').addEventListener('click', function() {
    power = !power;
    if (!power) {
      start = false;
    }
    clickable();
  });

  document.getElementById('start').addEventListener('click', function() {
    start = true;
    clickable();
    game();
  });

  document.getElementById('strict').addEventListener('click', function() {
    strict = !strict;
  });

  // User click button effect
  green_button.addEventListener('click', function() {
    if (power && start) {
      press_green();
      user_array.push(0);
      check_right();
      game();
    }
  });
  red_button.addEventListener('click', function() {
    if (power && start) {
      press_red();
      user_array.push(1);
      check_right();
      game();
    }
  });
  yellow_button.addEventListener('click', function() {
    if (power && start) {
      press_yellow();
      user_array.push(2);
      check_right();
      game();
    }
  });
  blue_button.addEventListener('click', function() {
    if (power && start) {
      press_blue();
      user_array.push(3);
      check_right();
      game();
    }
  });

  // Computer plays audio function
  async function play_audio(array) {
    for (let i = 0; i < array.length; i++) {
      switch (array[i]) {
        case 0:
          press_green();
          break;
        case 1:
          press_red();
          break;
        case 2:
          press_yellow();
          break;
        case 3:
          press_blue();
          break;
        default:
      }
      if (i + 1 != array.length) {
        await sleep(500);
      }
    }
  }

  // Add or remove mouse pointer
  function clickable() {
    Array.prototype.forEach.call(document.getElementsByClassName('push'), function(button) {
      if (power && start) {
        button.classList.add("clickable");
      } else {
        button.classList.remove("clickable");
      }
    });
  }

  function check_right() {
    press_right = true;
    for (let i = 0; i < user_array.length; i++) {
      if (user_array[i] != play_array[i]) {
        press_right = false;
      }
    }
    if (user_array.length == play_array.length) {
      finish_press = true;
    }
  }

  async function game() {
    if (power && start) {
      if (press_right && finish_press) {
        play_array.push(Math.floor(Math.random() * 4));
        console.log("play_array: " + play_array);
        console.log("user_array: " + user_array);
        finish_press = false;
        user_array = [];
        await sleep(800);
        play_audio(play_array);
      } else if (!press_right) {
        user_array = [];
        await sleep(800);
        play_audio(play_array);
      }
    }
  }

});
