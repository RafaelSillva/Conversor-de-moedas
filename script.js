const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const apiKey = "0f2e204c871c451842892ef9";

async function fetchExchangeRates() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao obter cotações da API", error);
    return null; // Retorna nulo em caso de erro
  }
}

async function convertValues() {
  const inputCurrencyValue =
    parseFloat(document.querySelector(".input-currency").value) || 0;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );
  const currencyValueConverted = document.querySelector(".currency-value");

  console.log(currencySelect.value);

  const data = await fetchExchangeRates();
  if (!data) return;

  const dolarToday = 6;
  const euroToday = 0.163;
  const libraToday = 0.7679;
  const bitcoinToday = 0;

  switch (currencySelect.value) {
    case "bitcoin":
      currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BTC",
      }).format(inputCurrencyValue / bitcoinToday);
      break;

    case "libra":
      currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(inputCurrencyValue / libraToday);
      break;

    case "dolar":
      currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(inputCurrencyValue / dolarToday);
      break;

    case "euro":
      currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(inputCurrencyValue / euroToday);
      break;

    default:
      console.error("Moeda não suportada");
      return;
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);
}
function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.getElementById("currency-img");

  switch (currencySelect.value) {
    case "dolar":
      currencyName.innerHTML = "Dólar";
      currencyImage.src = "./assets/estados-unidos (1) 1.png";
      break;

    case "euro":
      currencyName.innerHTML = "Euro";
      currencyImage.src = "./assets/Euro.png";
      break;

    case "libra":
      currencyName.innerHTML = "Libra";
      currencyImage.src = "./assets/libra 1.png";
      break;

    case "bitcoin":
      currencyName.innerHTML = "Bitcoin";
      currencyImage.src = "./assets/bitcoin 1.png";
      break;

    default:
      console.error("Moeda não suportada");
  }
  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
