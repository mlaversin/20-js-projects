const form = document.querySelector('.form-quizz');
let arrayResults = [];
const answers = ['c', 'a', 'b', 'a', 'c'];
const emojis = ['✔️', '✨', '👀', '😭', '👎'];
const titleResult = document.querySelector('.results h2');
const noteResult = document.querySelector('.note');
const helpResult = document.querySelector('.help');
const allQuestions = document.querySelectorAll('.question-block');
let arrayVerif = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(document.querySelector('input[name="q1"]:checked').value);

  for (i = 1; i < 6; i++) {
    arrayResults.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }
  // console.log(arrayResults);
  verifFunc(arrayResults);
  arrayResults = [];
});

function verifFunc(arrResults) {
  for (let a = 0; a < 5; a++) {
    if (arrResults[a] === answers[a]) {
      arrayVerif.push(true);
    } else {
      arrayVerif.push(false);
    }
  }
  // console.log(arrayVerif);
  displayResults(arrayVerif);
  colorsFunc(arrayVerif);
  arrayVerif = [];
}

function displayResults(arrcheck) {
  const nbWrong = arrcheck.filter((el) => el !== true).length;
  // console.log(nbWrong);
  switch (nbWrong) {
    case 0:
      titleResult.innerText = "✔️ Bravo, c'est un sans faute ! ✔️";
      helpResult.innerText = '';
      noteResult.innerText = '5/5';
      break;
    case 1:
      titleResult.innerText = '✨ Vous y êtes presque ! ✨';
      helpResult.innerText =
        'Retentez une autre réponse dans la case rouge, puis re-validez !';
      noteResult.innerText = '4/5';
      break;
    case 2:
      titleResult.innerText = '✨ Encore un petit effort ... 👀';
      helpResult.innerText =
        'Retentez une autre réponse dans les cases rouges, puis re-validez !';
      noteResult.innerText = '3/5';
      break;
    case 3:
      titleResult.innerText = '👀 Il reste quelques erreurs. 😭';
      helpResult.innerText =
        'Retentez une autre réponse dans les cases rouges, puis re-validez !';
      noteResult.innerText = '2/5';
      break;
    case 4:
      titleResult.innerText = '😭 Peut mieux faire ! 😭';
      helpResult.innerText =
        'Retentez une autre réponse dans les cases rouges, puis re-validez !';
      noteResult.innerText = '1/5';
      break;
    case 5:
      titleResult.innerText = '👎 Peut mieux faire ! 👎';
      helpResult.innerText =
        'Retentez une autre réponse dans les cases rouges, puis re-validez !';
      noteResult.innerText = '0/5';
      break;
    default:
      'Oops, cas inattendu... 😵';
  }
}

function colorsFunc(arrValBool) {
  for (let i = 0; i < arrValBool.length; i++) {
    if (arrValBool[i] === true) {
      allQuestions[i].style.background = 'lightgreen';
    } else {
      allQuestions[i].style.background = '#ffb8b8';
      allQuestions[i].classList.add('fail');
      setTimeout(() => {
        allQuestions[i].classList.remove('fail');
      }, 500);
    }
  }
}

allQuestions.forEach((item) => {
  item.addEventListener('click', () => {
    item.style.background = 'white';
  });
});
