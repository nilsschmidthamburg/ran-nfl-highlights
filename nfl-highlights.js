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
"Tampa Bay", "Buccaneers",
"Tennessee", "Titans",
"Washington", "Redskins",
]

function isHighlight(teaser) {
  let text = teaser.querySelector(".teaser-headline").textContent.toLowerCase();
  return text.indexOf("highlight") !== -1 || text.indexOf("preseason:") !== -1;
}

function isNotHighlight(teaser) {
  return !isHighlight(teaser);
}

function isNotRecentVideos(contentArea) {
  return contentArea.querySelector(".container-headline").textContent.toLowerCase().indexOf("aktuell") === -1;
}

function remove(teaser) {
  // teaser.hidden = true;
  teaser.parentNode.removeChild(teaser);
}

function reLabel(teaser) {
// FIXME: Drop all words but teamnames
  let headline =  teaser.querySelector(".teaser-headline");
  headline.textContent = "Highlights: " + wordFiltered(headline);

  let description =  teaser.querySelector(".teaser-description");
  if (description !== null) {
    description.textContent = "Hier gibts die Highlights: " + wordFiltered(description);;
  }
}

function wordFiltered(element) {
  let filteredWords = element.textContent.match(/\b(\w+)\b/g).filter(word => whitelist.indexOf(word) !== -1);
  if (filteredWords.length == 2) {
    return filteredWords[0] + " vs. " + filteredWords[1];
  }
  if (filteredWords.length == 4) {
    return filteredWords[0] + filteredWords[1] + " vs. " + filteredWords[2] + filteredWords[3];
  }
  return element.textContent.match(/\b(\w+)\b/g).filter(word => whitelist.indexOf(word) !== -1).join(" ");
}

// Hide uninteresting sections
Array.from(document.querySelectorAll("section.element.grid-component")).filter(isNotRecentVideos).forEach(remove);

// FIXME Instead of timeout, implement in a way, that we are looking for the loader!!! Once it is invisible, loading is done!
// Now that all boring sections are hidden: Open more videos
document.querySelectorAll(".btn-more").forEach(btn => btn.click());
setTimeout(() => document.querySelectorAll(".btn-more").forEach(btn => btn.click()), 2000);
setTimeout(() => document.querySelectorAll(".btn-more").forEach(btn => btn.click()), 2000);


setTimeout(() => {
  // Good Stuff!
  var teasers = document.querySelectorAll("#mount .main .middle .content .content-area .teaser:not(.multiteaser)");

  // Hide all videos that are not highlights!
  Array.from(teasers).filter(isNotHighlight).forEach(remove)

  // Relabel videos that are highlights
  Array.from(teasers).filter(isHighlight).forEach(reLabel)

  // Display altered descriptions
  document.querySelectorAll(".teaser-headline, .teaser-description").forEach(headline => headline.style.cssText +="color: black !important");
}, 5000);
