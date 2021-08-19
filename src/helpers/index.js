/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @return {number} - Number of letters matched between guessed word and secret word
 */

export function getLetterMatchCount(guessedWord, secretWord) {
    const secretLetters = secretWord.split('')
    const guessedLetterSet = new Set(guessedWord)
    return secretLetters.filter(letter => guessedLetterSet.has(letter)).length
}