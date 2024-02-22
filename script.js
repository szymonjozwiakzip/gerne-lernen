document.addEventListener("DOMContentLoaded", function () {
  const pytaniaDiv = document.getElementById("pytania");
  const sprawdzButton = document.getElementById("sprawdz");
  const wynikDiv = document.getElementById("wynik");
  const wylosujButton = document.getElementById("wylosuj");
  const wyswietlCzasButton = document.getElementById("wyswietl");
  const iloscZadanInput = document.getElementById("iloscZadan");
  const jezykSelect = document.getElementById("jezyk");
  const pytaniaKontener = document.querySelector(".pytaniaKontener");
  const czasDiv = document.getElementById("czas");
  const wyswietlOdpButton = document.getElementById("wyswietlOdp");
  const odpDiv = document.getElementById("odp");

  const buttons = document.querySelectorAll("button");

  // Znajdź najszerszy przycisk
  let maxWidth = 0;
  buttons.forEach((button) => {
    const buttonWidth = button.offsetWidth;
    if (buttonWidth > maxWidth) {
      maxWidth = buttonWidth;
    }
  });

  // Ustaw najszerszą szerokość dla wszystkich przycisków
  buttons.forEach((button) => {
    button.style.width = maxWidth + "px";
  });

  let czasPozostaly = 0;
  let timerInterval;
  czasDiv.style.display = "none";
  pytaniaKontener.style.display = "none";
  odpDiv.style.display = "none";

  wyswietlOdpButton.textContent = "Wyświetl odpowiedzi";
  let odp = 0;
  let sprawdz = 0;
  wyswietlCzasButton.textContent = "Wyświetl czas";
  document.body.appendChild(wyswietlCzasButton);

  wylosujButton.parentNode.insertBefore(wyswietlCzasButton, wylosujButton);

  fetch("pytania.json")
    .then((response) => response.json())
    .then((data) => {
      wyswietlOdpButton.addEventListener("click", function () {
        if (odp === 0) {
          wyswietlOdpButton.textContent = "Ukryj odpowiedzi";
          odp = 1;
        } else {
          wyswietlOdpButton.textContent = "Wyświetl odpowiedzi";
          odp = 0;
        }
      });

      wyswietlCzasButton.addEventListener("click", function () {
        // Zmiana widoczności czasu w zależności od obecnej wartości
        if (czasDiv.style.display === "none") {
          czasDiv.style.display = "block";
          wyswietlCzasButton.textContent = "Ukryj czas";
        } else {
          czasDiv.style.display = "none";
          wyswietlCzasButton.textContent = "Wyświetl czas";
        }
      });
      wylosujButton.addEventListener("click", function () {
        const iloscZadan = parseInt(iloscZadanInput.value);
        sprawdz = 0;
        if (iloscZadan <= 0) {
          alert("Podaj liczbę większą od zera!");
          return;
        }
        if (iloscZadan > data.length) {
          alert(`Dostępne są tylko ${data.length} pytań!`);
          return;
        }

        const jezyk = jezykSelect.value;

        // Losowanie zadań
        const randomIndices = generateRandomIndices(data.length, iloscZadan);
        const wybranePytania = randomIndices.map((index) => data[index]);

        // Czyszczenie poprzednich pytań
        pytaniaDiv.innerHTML = "";

        pytaniaKontener.style.display = "block";

        // Resetuj timer przy wylosowaniu nowych pytań
        czasPozostaly = 0;
        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
          czasPozostaly++;
          czasDiv.textContent = formatujCzas(czasPozostaly);
        }, 1000);

        // Wyświetlanie wybranych zadań
        wybranePytania.forEach((pytanie, index) => {
          const pytanieContainer = document.createElement("div");
          pytanieContainer.classList.add("pytanie-container");

          const pytanieElement = document.createElement("p");
          pytanieElement.textContent = `${index + 1}. ${
            jezyk === "polski" ? pytanie.polski : pytanie.niemiecki
          }`;
          pytanieContainer.appendChild(pytanieElement);

          const inputOdpowiedzi = document.createElement("input");
          inputOdpowiedzi.type = "text";
          inputOdpowiedzi.classList.add("odpowiedz-input");
          inputOdpowiedzi.dataset.correctAnswer =
            jezyk === "polski"
              ? pytanie.niemiecki.toLowerCase()
              : pytanie.polski.toLowerCase();
          pytanieContainer.appendChild(inputOdpowiedzi);

          const poprawnaOdpowiedzDiv = document.createElement("div");
          poprawnaOdpowiedzDiv.style.display = "none";
          poprawnaOdpowiedzDiv.textContent = `Poprawnie: ${inputOdpowiedzi.dataset.correctAnswer}`;
          if (odp === 1 && sprawdz === 1) {
            poprawnaOdpowiedzDiv.style.display = "block";
          } else if (odp === 0) {
            poprawnaOdpowiedzDiv.style.display = "none";
          }
          pytanieContainer.appendChild(poprawnaOdpowiedzDiv);

          pytaniaDiv.appendChild(pytanieContainer);
        });
      });
    })
    .catch((error) =>
      console.error("Wystąpił błąd podczas wczytywania danych:", error)
    );

  sprawdzButton.addEventListener("click", function () {
    const inputOdpowiedzi = document.querySelectorAll(".odpowiedz-input");
    let poprawneOdpowiedzi = 0;
    sprawdz = 1;
    inputOdpowiedzi.forEach((input) => {
      const wpisanaOdpowiedz = input.value.trim().toLowerCase();
      const poprawnaOdpowiedz = input.dataset.correctAnswer;

      if (wpisanaOdpowiedz === poprawnaOdpowiedz) {
        input.style.backgroundColor = "green";
        input.style.color = "#FFFFFF";
        input.style.fontWeight = "bold";
        poprawneOdpowiedzi++;
      } else {
        input.style.backgroundColor = "red";
        input.style.color = "#FFFFFF";
        input.style.fontWeight = "bold";
        if (odp === 1) {
          const poprawnaOdpowiedzDiv = input.parentNode.querySelector("div");
          poprawnaOdpowiedzDiv.style.display = "block";
          poprawnaOdpowiedzDiv.textContent = `Poprawnie: ${poprawnaOdpowiedz}`;
        } else {
          const poprawnaOdpowiedzDiv = input.parentNode.querySelector("div");
          poprawnaOdpowiedzDiv.style.display = "none";
        }
      }
    });

    wynikDiv.textContent = `Poprawne odpowiedzi: ${poprawneOdpowiedzi}/${
      inputOdpowiedzi.length
    } - ${(poprawneOdpowiedzi / inputOdpowiedzi.length) * 100}%`;

    // Zatrzymaj timer po sprawdzeniu odpowiedzi
    clearInterval(timerInterval);
  });

  // Funkcja do generowania losowych indeksów
  function generateRandomIndices(maxRange, count) {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * maxRange);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }

  // Funkcja do formatowania czasu
  function formatujCzas(sekundy) {
    const godziny = Math.floor(sekundy / 3600);
    const minuty = Math.floor((sekundy % 3600) / 60);
    const sekundyReszta = sekundy % 60;

    return `${godziny
      .toString()
      .padStart(
        2,
        "0"
      )}:${minuty.toString().padStart(2, "0")}:${sekundyReszta.toString().padStart(2, "0")}`;
  }
});
