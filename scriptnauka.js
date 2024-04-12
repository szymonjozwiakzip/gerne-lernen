document.addEventListener("DOMContentLoaded", function () {
  const listaSlowElement = document.querySelector(".listaSlow ul");
  const searchInput = document.getElementById("search");
  const sortAZPLButton = document.getElementById("sortAZPL");
  const sortZAPLButton = document.getElementById("sortZAPL");
  const sortAZGERButton = document.getElementById("sortAZGER");
  const sortZAGERButton = document.getElementById("sortZAGER");

  let data = [];

  fetch("pytania.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;

      renderWords(data);

      searchInput.addEventListener("input", function () {
        const inputValue = this.value.toLowerCase();
        const filteredWords = data.filter((slowo) => {
          return (
            slowo.polski.toLowerCase().includes(inputValue) ||
            slowo.niemiecki.toLowerCase().includes(inputValue)
          );
        });
        renderWords(filteredWords);
      });
    })
    .catch((error) =>
      console.error("Wystąpił błąd podczas wczytywania danych:", error)
    );

  sortAZPLButton.addEventListener("click", function () {
    const sortedWords = data
      .slice()
      .sort((a, b) => a.polski.localeCompare(b.polski));
    renderWords(sortedWords);
  });

  sortZAPLButton.addEventListener("click", function () {
    const sortedWords = data
      .slice()
      .sort((a, b) => b.polski.localeCompare(a.polski));
    renderWords(sortedWords);
  });

  sortAZGERButton.addEventListener("click", function () {
    const sortedWords = data
      .slice()
      .sort((a, b) => a.niemiecki.localeCompare(b.niemiecki));
    renderWords(sortedWords);
  });

  sortZAGERButton.addEventListener("click", function () {
    const sortedWords = data
      .slice()
      .sort((a, b) => b.niemiecki.localeCompare(a.niemiecki));
    renderWords(sortedWords);
  });

  listaSlowElement.addEventListener("click", function (event) {
    const clickedWord = event.target;
    if (clickedWord.tagName === "LI") {
      clickedWord.classList.toggle("learned");
    }
  });

  function renderWords(words) {
    listaSlowElement.innerHTML = "";
    words.forEach((slowo) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.slowoId = slowo.id;
      checkbox.addEventListener("change", function () {
        slowo.przeczytane = this.checked;
        if (this.checked) {
          li.style.textDecoration = "line-through";
          li.style.fontWeight = "400";
          li.style.color = "#777777";
        } else {
          li.style.textDecoration = "none";
          li.style.fontWeight = "bold";
          li.style.color = "#FFFFFF";
        }
      });
      li.appendChild(checkbox);

      const textNode = document.createTextNode(
        `${slowo.polski} -> ${slowo.niemiecki}`
      );
      li.appendChild(textNode);

      listaSlowElement.appendChild(li);
    });
  }
});
