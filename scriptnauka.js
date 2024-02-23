document.addEventListener("DOMContentLoaded", function () {
  const listaSlowElement = document.querySelector(".listaSlow ul");
  const searchInput = document.getElementById("search");

  fetch("pytania.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((slowo) => {
        // Utwórz element listy
        const li = document.createElement("li");
        // Ustaw tekst elementu listy jako słowo w formacie "polskie słowo - niemieckie tłumaczenie"
        li.textContent = `${slowo.polski} -> ${slowo.niemiecki}`;
        // Dodaj utworzony element listy do elementu <ul>
        listaSlowElement.appendChild(li);
      });

      // Dodaj zdarzenie na pole wyszukiwania
      searchInput.addEventListener("input", function () {
        const inputValue = this.value.toLowerCase();
        const words = document.querySelectorAll(".listaSlow ul li");

        words.forEach((word) => {
          const text = word.textContent.toLowerCase();
          if (text.includes(inputValue)) {
            word.style.display = "block";
          } else {
            word.style.display = "none";
          }
        });
      });
    })
    .catch((error) =>
      console.error("Wystąpił błąd podczas wczytywania danych:", error)
    );
});
