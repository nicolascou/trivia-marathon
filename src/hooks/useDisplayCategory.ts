export const normalizeCategory = (str: string) => {
  return str.replace("and", " & ").split("_").map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}