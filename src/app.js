/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  const suit = ["♠", "♣", "♦", "♥"];
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  function randomize(array) {
    return Math.floor(Math.random() * array.length);
  }

  function generateCard(cardElement, numero, suit) {
    cardElement.innerHTML = `
        <div class="top-left">${suit}</div>
        <div class="numero">${convertToStringNumber(numero)}</div>
        <div class="bottom-right">${suit}</div>
    `;
    const color = suit === "♦" || suit === "♥" ? "red" : "black";
    cardElement.querySelector(".top-left").style.color = color;
    cardElement.querySelector(".bottom-right").style.color = color;
    cardElement.querySelector(".numero").style.color = color;
  }

  let cards = []; //para almacenar las cartas generadas en draw
  let draw = document.getElementById("draw");
  draw.addEventListener("click", processDraw);

  function processDraw() {
    const number = document.getElementById("numberInput").value; //el numero de cartas del user
    const numericValue = parseInt(number);

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // should clear previous cards

    cards = []; //reiniciar cards

    if (numericValue > 0) {
      cardContainer.style.display = "flex"; // Mostrar contenedor solo si se generan cartas
    } else {
      cardContainer.style.display = "none"; // Ocultar si no hay cartas
    }

    for (let i = 0; i < numericValue; i++) {
      // Create a card element for each card
      let cardElement = document.createElement("div");
      cardElement.classList.add("card");

      let randomSuit = suit[randomize(suit)];
      let randomNumero = numeros[randomize(numeros)];

      cards.push({ numero: randomNumero, suit: randomSuit });

      // Append the card element to the container
      cardContainer.appendChild(cardElement);

      // generar carta y render it
      generateCard(cardElement, randomNumero, randomSuit);
    }
    console.log(cards);
  }

  let sort = document.getElementById("sort");
  sort.addEventListener("click", () => {
    let cardLogs = document.getElementById("log"); // Seleccionar el contenedor para el log
    let sortedSteps = bubbleSort(cards);
    cardLogs.innerHTML = "";

    // Renderizar cada paso del sort
    sortedSteps.forEach((step, index) => {
      let stepDiv = document.createElement("div");
      stepDiv.classList.add("step"); // Clase para mantener las cartas en una fila horizontal

      let stepNumber = document.createElement("div");
      stepNumber.classList.add("step-number"); // Clase para el número de paso
      stepNumber.textContent = index;

      stepDiv.appendChild(stepNumber);

      // Renderizar las cartas en el paso actual
      step.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        generateCard(cardElement, card.numero, card.suit);

        stepDiv.appendChild(cardElement);
      });

      cardLogs.appendChild(stepDiv);
    });
  });

  function bubbleSort(arr) {
    let steps = [];
    let wall = arr.length - 1;
    steps.push([...arr]);

    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        if (arr[index].numero > arr[index + 1].numero) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
          steps.push([...arr]);
        }
        index++;
      }
      wall--; //decrease the wall for optimization
    }
    return steps;
  }

  function convertToStringNumber(num) {
    switch (num) {
      case "A":
        return 1;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      default:
        return parseInt(num);
    }
  }
};
