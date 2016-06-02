// Utility Functions
function removeChildren(domNode) {
	while (domNode.firstChild) {
	    domNode.removeChild(domNode.firstChild);
	}
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


function containsElt(stringToCheck, substringsArray) {
  var numWords = substringsArray.length;
  while (numWords--) {
    if (stringToCheck.indexOf(substringsArray[numWords]) != -1) {
       return true;
    }
  }
  return false;
}

//Words to be filtered
var dangerousWords = [
'Jon Snow',
'Sansa',
'Arya',
'Tyrion',
'Hodor',
'Ramsey',
'white walker',
'GoT',
'GOT',
'Game Of Thrones',
'GAME OF THRONES',
'Khaleesi',
'Benjen',
'Spoiler',
'SPOILER',
];

console.log('Loaded Blocker');

var hiddenArticles = [];

var hiddenArticles = [];

function constructSpoilerHtml(idx) {

	var replaceThisNodeWithArticle = function (evt) {
		var spoilerButton = evt.target;
		var wrapperDiv = spoilerButton.parentNode;
		replaceNode(wrapperDiv, hiddenArticles[idx]);
	}

	var spoilerWrapperDiv = document.createElement("div");
	spoilerWrapperDiv.setAttribute("style", "text-align:center; padding: 50px 0;");
	var showSpoilerButton = document.createElement("button");
	showSpoilerButton.innerHTML = "Show Potential Spoiler";
	showSpoilerButton.setAttribute("style", "font-size: 20px");
	//showSpoilerButton.setAttribute("id", "bersling-spoiler-button-" + idx);
	showSpoilerButton.addEventListener("click", replaceThisNodeWithArticle);
	spoilerWrapperDiv.appendChild(showSpoilerButton); 
	return spoilerWrapperDiv;
}



function replaceNode(oldNode, newNode) {
	oldNode.parentNode.replaceChild(newNode, oldNode);
}

function checkForSpoilers() {
	var articles = document.getElementsByTagName("ARTICLE");

	for (var i = 0; i < articles.length; i++) {
		var article = articles[i];

		if (!hasClass(article, 'spoiler-scanned')) {
			var inner = article.innerHTML;
			if (containsElt(inner, dangerousWords)) {
				var n = hiddenArticles.length;
				hiddenArticles.push(article);
				replaceNode(article, constructSpoilerHtml(n));
			}
			article.className += " spoiler-scanned"
		}

	}

	setTimeout(checkForSpoilers, 100);
}


checkForSpoilers();

//setTimeout(removeWrapper, 2500);
