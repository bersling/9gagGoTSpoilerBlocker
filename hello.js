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


// this function takes a dom node and applies a callback
// function when the dom node changes
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();


//Words to be filtered
var dangerousWords = [
'Jon Snow',
'Sansa',
'Arya',
'Tyrion',
'Hodor',
'Ramsey',
'Hodor',
'Bran',
'Stark',
'white walker',
'GoT',
'GOT',
'THRONES',
'Thrones',
'thrones',
'throne',
'Khaleesi',
'Benjen',
'spoiler',
'Spoiler',
'SPOILER',
'Jorah',
'Daario',
'Daenerys',
'Targaryen',
'Cersei',
'Baratheon'
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
	console.log('checking for spoilers...');
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
}

// Execution
checkForSpoilers();
var wrapperSection = document.getElementById("list-view-2");
observeDOM( wrapperSection , checkForSpoilers);
