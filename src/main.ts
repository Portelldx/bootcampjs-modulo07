import "./style.css";

interface Group {
  name: string;
  year: number;
  isActive: boolean;
  genre: string;
}

let group1: Group = {
  name: "The Beatles",
  year: 1960,
  isActive: true,
  genre: "🎵 Pop Rock",
};
let group2: Group = {
  name: "Queen",
  year: 1970,
  isActive: false,
  genre: " 🎸 Rock",
};
let group3: Group = {
  name: "AC DC",
  year: 1973,
  isActive: true,
  genre: "🤘 Hard Rock",
};
let group4: Group = {
  name: "Ludwig van Beethoven",
  year: 1770,
  isActive: false,
  genre: " 🎼 Clásica",
};
let group5: Group = {
  name: "The Rolling Stones",
  year: 1962,
  isActive: true,
  genre: " 🎸 Rock",
};

const estiloTitulo = "background-color:green; font-size:18px; font-weight:bold";

console.log(
  `%c${group1.name}, ${group2.name}, ${group3.name}, ${group4.name}, ${group5.name}.`,
  estiloTitulo
);
