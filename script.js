document.addEventListener("DOMContentLoaded", function() {
  const pytaniaDiv = document.getElementById("pytania");
  const sprawdzButton = document.getElementById("sprawdz");
  const wynikDiv = document.getElementById("wynik");
  const wylosujButton = document.getElementById("wylosuj");
  const iloscZadanInput = document.getElementById("iloscZadan");
  
  fetch('pytania.json')
    .then(response => response.json())
    .then(data => {
      wylosujButton.addEventListener("click", function() {
        const iloscZadan = parseInt(iloscZadanInput.value);
        if (iloscZadan <= 0) {
          alert("Podaj liczbę większą od zera!");
          return;
        }
        if (iloscZadan > data.length) {
          alert(`Dostępne są tylko ${data.length} pytań!`);
          return;
        }

        // Losowanie zadań
        const randomIndices = generateRandomIndices(data.length, iloscZadan);
        const wybranePytania = randomIndices.map(index => data[index]);

        // Czyszczenie poprzednich pytań
        pytaniaDiv.innerHTML = "";

        // Wyświetlanie wybranych zadań
        wybranePytania.forEach((pytanie, index) => {
          const pytanieContainer = document.createElement("div");
          pytanieContainer.classList.add("pytanie-container");

          const pytanieElement = document.createElement("p");
          pytanieElement.textContent = `${index + 1}. ${pytanie.polski}`;
          pytanieContainer.appendChild(pytanieElement);

          const inputOdpowiedzi = document.createElement("input");
          inputOdpowiedzi.type = "text";
          inputOdpowiedzi.classList.add("odpowiedz-input");
          inputOdpowiedzi.dataset.correctAnswer = pytanie.niemiecki.toLowerCase();
          pytanieContainer.appendChild(inputOdpowiedzi);

          pytaniaDiv.appendChild(pytanieContainer);
        });
      });
    })
    .catch(error => console.error('Wystąpił błąd podczas wczytywania danych:', error));

  sprawdzButton.addEventListener("click", function() {
    const inputOdpowiedzi = document.querySelectorAll(".odpowiedz-input");
    let poprawneOdpowiedzi = 0;

    inputOdpowiedzi.forEach(input => {
      const wpisanaOdpowiedz = input.value.trim().toLowerCase();
      const poprawnaOdpowiedz = input.dataset.correctAnswer;

      if (wpisanaOdpowiedz === poprawnaOdpowiedz) {
        input.style.backgroundColor = "green";
        poprawneOdpowiedzi++;
      } else {
        input.style.backgroundColor = "red";
      }
    });

    wynikDiv.textContent = `Poprawne odpowiedzi: ${poprawneOdpowiedzi}/${inputOdpowiedzi.length}`;
  });
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
