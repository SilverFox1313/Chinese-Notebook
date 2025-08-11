const charts = [
  { word: "我", sound: "Wǒ" },
  { word: "你", sound: "Nǐ" },
  { word: "好", sound: "Hǎo" },
  { word: "再", sound: "Zài" },
  { word: "見", sound: "Jiàn" },
  { word: "是", sound: "Shì" },
  { word: "人", sound: "Rén" },
  { word: "美", sound: "Měi" },
  { word: "国", sound: "Guó" },
  { word: "中", sound: "Zhōng" },
  { word: "吗", sound: "Ma" },
  { word: "不", sound: "Bù" },
  { word: "呢", sound: "Ne" },
  { word: "妈", sound: "Mā" },
  { word: "爸", sound: "Bà" },
  { word: "哥", sound: "Gē" },
  { word: "姐", sound: "Jiě" },
  { word: "的", sound: "De" },
  { word: "手", sound: "Shǒu" },
  { word: "机", sound: "Jī" },
  { word: "这", sound: "Zhè" },
  { word: "儿", sound: "Ér" },
  { word: "子", sound: "Zǐ" },
  { word: "女", sound: "Nǚ" },
  { word: "他", sound: "Tā" },
  { word: "她", sound: "Tā" },
];

const section = document.getElementById("chart-section");
const input = document.getElementById("search-input");
const phraseBox = document.getElementById("phrase-box");

function renderCards(data) {
  section.innerHTML = "";

  data.forEach(({ word, sound }) => {
    const flipCard = document.createElement("div");
    flipCard.className = `
            card-flip w-full h-40 sm:h-48 md:h-52 relative cursor-pointer
            transition-transform duration-300 ease-in-out hover:scale-105
        `;

    const inner = document.createElement("div");
    inner.className = "card-inner w-full h-full";

    const front = document.createElement("div");
    front.className = `
            card-front bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center
        `;

    const wordEl = document.createElement("div");
    wordEl.className = "text-7xl text-gray-800 mb-2";
    wordEl.textContent = word;

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select";
    selectBtn.className = `
            text-sm px-6 py-1.5 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition
        `;
    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita el flip

      const char = document.createElement("span");
      char.textContent = word;
      char.className = `
        inline-block h-10 text-2xl px-2 py-1 bg-white rounded shadow text-gray-700 cursor-pointer
        hover:bg-red-100 transition
    `.trim();

      // ✅ Eliminar al hacer clic
      char.onclick = () => {
        char.remove();
      };

      phraseBox.appendChild(char);
    });

    front.appendChild(wordEl);
    front.appendChild(selectBtn);

    const back = document.createElement("div");
    back.className = `
            card-back bg-blue-100 shadow-md rounded-lg p-4 flex items-center justify-center
            text-4xl text-blue-700 font-semibold
        `;
    back.textContent = sound;

    inner.appendChild(front);
    inner.appendChild(back);
    flipCard.appendChild(inner);
    section.appendChild(flipCard);

    flipCard.addEventListener("click", () => {
      flipCard.classList.toggle("flipped");
    });
  });
}

// Inicializar
renderCards(charts);

function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Filtrar
input.addEventListener("input", (e) => {
  const query = removeDiacritics(e.target.value.trim().toLowerCase());

  const filtered = charts.filter(({ sound }) => {
    const normalizedSound = removeDiacritics(sound.toLowerCase());
    return normalizedSound.includes(query);
  });

  renderCards(filtered);
});
