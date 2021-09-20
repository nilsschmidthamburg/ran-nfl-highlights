let whitelist = [
    "Arizona", "Cardinals",
    "Atlanta", "Falcons",
    "Baltimore", "Ravens",
    "Buffalo", "Bills",
    "Carolina", "Panthers",
    "Chicago", "Bears",
    "Cincinnati", "Bengals",
    "Cleveland", "Browns",
    "Dallas", "Cowboys",
    "Denver", "Broncos",
    "Detroit", "Lions",
    "Green Bay", "Packers",
    "Houston", "Texans",
    "Indianapolis", "Colts",
    "Jacksonville", "Jaguars",
    "Kansas City", "Chiefs",
    "Los Angeles", "Chargers",
    "Los Angeles", "Rams",
    "Miami", "Dolphins",
    "Minnesota", "Vikings",
    "New England", "Patriots",
    "New Orleans", "Saints",
    "New York", "Giants",
    "New York", "Jets",
    "Oakland", "Raiders",
    "Philadelphia", "Eagles",
    "Pittsburgh", "Steelers",
    "San Francisco", "49ers",
    "Seattle", "Seahawks",
    "Tampa Bay", "Buccaneers", "Bucs",
    "Tennessee", "Titans",
    "Washington", "Redskins",
    "#ranNFLsüchtig", "#ranNFL-Webshow"
]

function isHighlight(teaser) {
    let text = teaser.querySelector(".teaser-headline").textContent.toLowerCase();
    return text.indexOf("highlight") !== -1 || text.indexOf("preseason:") !== -1;
}

function isRelive(teaser) {
    let text = teaser.querySelector(".teaser-headline").textContent.toLowerCase();
    return text.indexOf("relive") !== -1;
}

function isNeitherHighlightNorRelive(teaser) {
    return !isHighlight(teaser) && !isRelive(teaser);
}

function isUninterestingSection(contentArea) {
    let containerHeadline = contentArea.querySelector(".container-headline").textContent.toLowerCase();
    return containerHeadline.indexOf("highlights") === -1 && containerHeadline.indexOf("aktuell") === -1 && containerHeadline.indexOf("relive") === -1;
}

function remove(teaser) {
    // teaser.hidden = true;
    teaser.parentNode.removeChild(teaser);
}

function reLabel(teaser, type) {
    let headline = teaser.querySelector(".teaser-headline");
    let newTitle = type + ": " + wordFiltered(headline);
    headline.textContent = newTitle;

    let clickableBoxLink = teaser.querySelector(".clickable-box-link")
    clickableBoxLink.title = newTitle

    let description = teaser.querySelector(".teaser-description");
    if (description !== null) {
        description.textContent = newTitle;
    }
}

function reLabelHighlights(teaser) {
    reLabel(teaser, "Highlights")
}

function reLabelRelive(teaser) {
    reLabel(teaser, "Relive")
}


function wordFiltered(element) {
    let filteredWords = element.textContent.match(/\b(\w+)\b/g).filter(word => whitelist.indexOf(word) !== -1);
    if (filteredWords.length === 2) {
        return filteredWords[0] + " vs. " + filteredWords[1];
    }
    if (filteredWords.length === 4) {
        return filteredWords[0] + " " + filteredWords[1] + " vs. " + filteredWords[2] + " " + filteredWords[3];
    }
    if (filteredWords.length > 0) {
        return element.textContent.match(/\b(\w+)\b/g).filter(word => whitelist.indexOf(word) !== -1).join(" ");
    }
    return "---"
}

// Hide uninteresting sections
Array.from(document.querySelectorAll("section.element.grid-component")).filter(isUninterestingSection).forEach(remove);

// FIXME Instead of timeout, implement in a way, that we are looking for the loader!!! Once it is invisible, loading is done!
// Now that all boring sections are hidden: Open more videos
document.querySelectorAll(".btn-more").forEach(btn => btn.click());
setTimeout(() => document.querySelectorAll(".btn-more").forEach(btn => btn.click()), 2000);
setTimeout(() => document.querySelectorAll(".btn-more").forEach(btn => btn.click()), 2000);
setTimeout(() => document.querySelectorAll(".btn-more").forEach(btn => btn.click()), 2000);


setTimeout(() => {
    // Find teasers
    var teasers = document.querySelectorAll("#mount .main .middle .content .content-area .teaser");

    // Hide all videos that are not interesting
    Array.from(teasers).filter(isNeitherHighlightNorRelive).forEach(remove)

    // Relabel videos that are highlights or relive
    Array.from(teasers).filter(isHighlight).forEach(reLabelHighlights)
    Array.from(teasers).filter(isRelive).forEach(reLabelRelive)

    // Display altered descriptions
    document.querySelectorAll(".teaser-headline, .teaser-description").forEach(headline => headline.style.cssText += "color: black !important");
}, 5000);
