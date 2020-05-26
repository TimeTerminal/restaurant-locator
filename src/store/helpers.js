const stringComparator = (originalString, comparisonString) => {
  const formattedOriginal = originalString.toLowerCase();
  const formattedComparison = comparisonString.toLowerCase();

  if (formattedOriginal.indexOf(formattedComparison) != -1) {
    return true;
  };

  return false;
}

module.exports = { stringComparator };