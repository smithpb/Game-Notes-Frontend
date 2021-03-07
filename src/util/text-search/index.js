/**
 * Function to create single RegEx designed to match from list of Characters starting at minimum of 4 letters
 * @param {array} arr - An list of Character names as partial RegEx
 * @returns {regex}
 */
export const combineRegEx = (arr) => {
  return new RegExp("\\b(?:" + arr.join("|") + ")\\b", "gi");
};

/**
 * Function that makes an array of RegEx values to help sort out Characters as they are added to a Note.
 * @param {array} charArr - An array of character names that will be converted to RegEx
 * @returns {array}
 */
export const makeRegExArr = (charArr) => {
  return charArr.map((char_name) => {
    // set the first 4 characters of the name aside as they will be minimum requirement to return a match
    const minStr = char_name.substring(0, 4);
    // wrap each remaining letter in RegEx selectors to make them optional
    const remainingStr = char_name.slice(4).split("");
    const remainingRegex = remainingStr.map((ch) => `(?:|${ch})`).join("");
    // return full RegEx for a character
    // ex Johnny => "John(?:|n)(?:|y)"
    return minStr + remainingRegex;
  });
};
