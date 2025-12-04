// Shared text normalization and pattern matching for Foreshadow Puzzle
// Used by both game.html and test_triggers.html

// Normalize text for matching (lowercase, remove punctuation, collapse spaces)
// Note: In game.html this takes a location parameter, but here we accept text directly
function normalizeTextFromString(text) {
    // Remove punctuation and convert to lowercase
    const normalized = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, '').toLowerCase();
    // Collapse multiple spaces
    return normalized.replace(/\s+/g, ' ').trim();
}

// Check if text matches a pattern (supports * wildcard and [optional] text)
function matchesPattern(text, pattern) {
    // First, extract optional sections [text] and replace with placeholders
    // Use a placeholder that won't be affected by normalization (no punctuation/underscores)
    const optionalSections = [];
    let patternWithPlaceholders = pattern.replace(/\[([^\]]+)\]/g, (match, content) => {
        optionalSections.push(content);
        return `XOPTIONALX${optionalSections.length - 1}X`;
    });

    // Normalize the pattern the same way text is normalized
    // Remove punctuation and convert to lowercase, but preserve * and placeholders
    const normalizedPattern = patternWithPlaceholders
        .replace(/[.,\/#!$%\^&\;:{}=\-_`~()'"]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

    // Replace spaces with a marker before escaping
    let regexPattern = normalizedPattern.replace(/ /g, 'XSPACEX');

    // Escape special regex characters except * and our markers
    regexPattern = regexPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

    // Replace placeholders with optional regex groups
    // The optional word should include the space AFTER it
    optionalSections.forEach((content, index) => {
        const normalizedContent = content
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, '')
            .toLowerCase()
            .trim();
        const escapedContent = normalizedContent.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

        // Pattern: word [optional] word
        // Becomes: wordXSPACEX(?:optional\s+)?word
        // This matches both "word word" and "word optional word"
        regexPattern = regexPattern.replace(
            `xoptionalx${index}xXSPACEX`,
            `(?:${escapedContent}\\s+)?`
        );
        // If no space after optional, just make the word optional
        regexPattern = regexPattern.replace(
            `xoptionalx${index}x`,
            `(?:${escapedContent})?`
        );
    });

    // Replace remaining space markers with \s+
    regexPattern = regexPattern.replace(/XSPACEX/g, '\\s+');

    // Replace * with .* (match unescaped asterisk)
    regexPattern = regexPattern.replace(/\*/g, '.*');

    const regex = new RegExp('^' + regexPattern + '$', 'i');
    const result = regex.test(text);

    return result;
}

// NLP helper functions
function getNLPHelpers() {
    return {
        simple(doc) {
            return doc.delete('#Determiner').delete('#Adjective').delete('#Adverb').delete("her").delete("Tessa").delete("she");
        },

        // Check if text has negation
        hasNegation(doc) {
            // Get the raw text to check for both contracted and non-contracted forms
            const text = doc.text().toLowerCase();

            // Check for common negation words and their normalized forms (without apostrophes)
            const negationWords = [
                'not', 'never', 'no',
                "doesn't", "doesnt", "don't", "dont",
                "won't", "wont", "can't", "cant",
                "isn't", "isnt", "aren't", "arent",
                "wasn't", "wasnt", "weren't", "werent",
                "hasn't", "hasnt", "haven't", "havent",
                "shouldn't", "shouldnt", "wouldn't", "wouldnt",
                "couldn't", "couldnt"
            ];

            // Check if any negation word appears in the text
            for (let neg of negationWords) {
                const regex = new RegExp('\\b' + neg + '\\b');
                if (regex.test(text)) {
                    return true;
                }
            }

            // Also check compromise's built-in negation detection
            return doc.has('#Negative');
        },

        // Check if doc has verb with specific root
        hasVerb(doc, verb) {
            const verbLower = verb.toLowerCase();

            // First check if the full document's verbs contain or match the target
            const allVerbs = doc.verbs();
            const verbTexts = allVerbs.out('array');

            // Direct match or contains
            for (let v of verbTexts) {
                const vLower = v.toLowerCase();
                if (vLower === verbLower || vLower.includes(verbLower)) {
                    return true;
                }
            }

            // Check infinitive forms of all verbs in the document
            const infinitives = allVerbs.toInfinitive().out('array');
            for (let inf of infinitives) {
                if (inf.toLowerCase() === verbLower) {
                    return true;
                }
            }

            // Fallback: check each word individually
            // This is needed for cases where compromise doesn't detect verbs in context
            const words = doc.terms().out('array');
            for (let word of words) {
                const wordLower = word.toLowerCase();

                // Direct word match
                if (wordLower === verbLower) {
                    const wordDoc = nlp(word);
                    if (wordDoc.has('#Verb')) {
                        return true;
                    }
                }

                // Check if individual word is a verb form of target
                const wordDoc = nlp(word);
                if (wordDoc.has('#Verb')) {
                    const inf = wordDoc.verbs().toInfinitive().text().toLowerCase().trim();
                    if (inf === verbLower) {
                        return true;
                    }

                    // Also check if word contains the verb (for "goes" contains "go")
                    if (wordLower.startsWith(verbLower)) {
                        return true;
                    }
                }
            }

            return false;
        },

        // Check if doc has any of the direction words
        hasDirection(doc, ...directions) {
            const text = doc.text().toLowerCase();
            return directions.some(dir => {
                const dirLower = dir.toLowerCase();
                // Match as whole word using word boundaries
                const regex = new RegExp('\\b' + dirLower + '\\b');
                return regex.test(text);
            });
        }
    };
}

// Check if text matches an NLP function
function nlpMatchesFunction(text, matchFunction) {
    if (typeof window !== 'undefined' && !window.nlp) {
        console.warn('nlpMatch used but compromise.js not loaded');
        return false;
    }

    if (typeof matchFunction !== 'function') {
        console.error('nlpMatch must be a function, got:', typeof matchFunction);
        return false;
    }

    try {
        const doc = nlp(text);
        const result = matchFunction(doc, getNLPHelpers());
        return Boolean(result);
    } catch (error) {
        console.error('nlpMatch function error:', error);
        return false;
    }
}

// Export for use in both files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        normalizeTextFromString,
        matchesPattern,
        getNLPHelpers,
        nlpMatchesFunction
    };
}
