var hashCode = function (value) {
	var hash = 0,
		i, chr;
	if (value.length === 0) return hash;
	for (i = 0; i < value.length; i++) {
		chr = value.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash.toString();
};

var hash = hashCode(document.location.href);

var addOverlay = function () {
	var videoContainer = document.getElementById("video-container");
	const overlay = document.createElement('div');
	overlay.id = "watched";
	overlay.className = 'overlay-desc';
	overlay.innerText = 'WATCHED';

	overlay.onclick = function () {
		removeOverlay();
	};

	videoContainer.appendChild(overlay);
}

var removeOverlay = function () {
	chrome.storage.sync.set({
		[hash]: 'false'
	}, function () {
		document.getElementById("watched").remove();
	});
}

chrome.storage.sync.get(hash, function (result) {
	if (result && result[hash] == "true") {
		addOverlay();
	}

	var video = document.getElementById("videoElement_html5_api");

	video.onended = function () {
		chrome.storage.sync.set({
			[hash]: 'true'
		}, function () {
			addOverlay();
		});
	};

});