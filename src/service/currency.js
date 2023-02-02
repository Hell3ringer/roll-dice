const currency = function(amount, locality) {
  let currencyMap = new Map();
  // Intl.supportedValuesOf("currency").forEach((currency) => {
  // "ADP", "AED", "AFA", "AFN", "ALK", "ALL", "AMD", etc.
  // console.log("currency" , currency);
  currencyMap.set("USD", {
    localeID: "en-US",
    currency: "USD",
  });
  currencyMap.set("INR", {
    localeID: "en-IN",
    currency: "INR",
  });
  currencyMap.set("JPY", {
    localeID: "jp-JP",
    currency: "JPY",
  });

  // });

  const localeID = currencyMap.get(locality).localeID;
  const currency = currencyMap.get(locality).currency;
  const newAmount = new Intl.NumberFormat(localeID, {
    style: "currency",
    currency: currency,
    currencyDisplay : "narrowSymbol",
    maximumFractionDigits : 0,
  }).format(amount);
//   console.log(typeof newAmount);
  return newAmount;
}
export default currency;

// currency(123456789 , "USD");
