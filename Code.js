
/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onMessage(event) {
    return getAcronym(event);
}

function findMeaning(message) {
    const acronyms = getAcronyms();

    const meaning = acronyms[message.toUpperCase()];

    return meaning || false;
}

/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onAddToSpace(event) {
    var message = "";

    if (event.space.type == "DM") {
        message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
    } else {
        message = "Thank you for adding me to " + event.space.displayName;
    }

    if (event.message) {
        message = getAcronym(event);
    }


    return { "text": message };
}

function getAcronym(event) {
    var acronym = cleanText(event.message.text);

    const meaning = findMeaning(acronym);

    var message = "";
    if (meaning) {
        message = acronym + ": " + meaning;
    } else {
        message = "Sorry, I don't know what " + acronym + " means!";
    }

    return { "text": message };
}

/**
 * Removed bot name, extra spaces, and returns back the important part of the
 * text sent.
 * @param {String} text
 * @return {String}
 */
function cleanText(text) {
    return text
        .toLowerCase()
        .replace('@acrobot ', '');
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
    console.info("Bot removed from ", event.space.name);
}

function getAcronyms() {
    return {
        "A&I": "Assets & Integration",
        "PTO": "Paid time off",
        "WFH": "Working from home"
    }
}

const msg = 'hello';
