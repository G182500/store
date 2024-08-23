const formatToCurrency = (price: number, locale = "pt-br") => {
  return price.toLocaleString(locale, {
    minimumFractionDigits: 2,
  });
};

export default formatToCurrency;
