document.addEventListener("DOMContentLoaded", () => {
	function getYouTubeVideoId(url) {
		const regex =
			/(?:youtube\.com\/(?:[^\/\n\s]+\/(?:\S+\/|\S*?v=)|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
		const match = url.match(regex);
		return match ? match[1] : null;
	}

	async function fetchVideoData(videoId) {
		const url = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "36b217c547mshbf89160bf76fbcep14cc50jsn45e464e420d5",
				"X-RapidAPI-Host": "yt-api.p.rapidapi.com",
			},
		};

		try {
			hideElements();
			document.getElementById("loading-animation").style.display = "block";
			const response = await fetch(url, options);
			const result = await response.json();
			console.log(result);
			document.getElementById("loading-animation").style.display = "none";

			resetDisplay();

			displayVideoInfo(result);
			populateQualitySelector(result.formats, result.adaptiveFormats);
		} catch (error) {
			console.error(error);
			document.getElementById("loading-animation").style.display = "none";
		}
	}

	function hideElements() {
		document.querySelector(".video-player").style.display = "none";
		document.getElementById("quality-selector").style.display = "none";
	}

	function resetDisplay() {
		document.getElementById("quality-select").innerHTML =
			'<option value="">Select Quality</option>';
		document.getElementById("quality-selector").style.display = "none";
	}

	function displayVideoInfo(data) {
		const videoUrl = data.adaptiveFormats[0].url;

		const videoPlayer = document.getElementById("video-player");
		const videoSource = document.getElementById("video-source");

		// Set the video URL as the source
		videoSource.src = videoUrl;
		videoPlayer.load();

		// Show the video player
		document.querySelector(".video-player").style.display = "block";
	}

	function populateQualitySelector(formats, adaptiveFormats) {
		const qualitySelect = document.getElementById("quality-select");
		qualitySelect.innerHTML = '<option value="">Select Quality</option>';

		const addOption = (format) => {
			const option = document.createElement("option");
			option.value = format.url;

			const qualityLabel =
				format.qualityLabel || format.quality || "Unknown Quality";
			const fps = format.fps ? `${format.fps}fps` : "";
			const mimeType = format.mimeType.startsWith("video") ? "Video" : "Audio";

			option.text = `${qualityLabel} ${fps} (${mimeType})`;
			qualitySelect.appendChild(option);
		};

		formats.forEach(addOption);
		adaptiveFormats.forEach(addOption);

		document.getElementById("quality-selector").style.display = "block";
	}

	document.getElementById("fetch-button").addEventListener("click", () => {
		const videoLink = document.getElementById("video-link").value;
		const videoId = getYouTubeVideoId(videoLink);
		if (videoId) {
			fetchVideoData(videoId);
		} else {
			console.error(alert("Invalid YouTube URL"));
		}
	});

	document.getElementById("download-button").addEventListener("click", () => {
		const qualitySelect = document.getElementById("quality-select");
		const selectedUrl = qualitySelect.value;
		if (selectedUrl) {
			window.location.href = selectedUrl;
		} else {
			console.error("No quality selected");
		}
	});
});

// hamburger

function toggleMenu() {
	const hamburger = document.querySelector(".hamburger");
	const mobileMenu = document.querySelector(".mobile-menu");
	const menuItems = document.querySelectorAll("#mobile-header-list li");

	hamburger.classList.toggle("active");
	mobileMenu.classList.toggle("active");

	if (mobileMenu.classList.contains("active")) {
		menuItems.forEach((item, index) => {
			setTimeout(() => {
				item.style.opacity = "1";
				item.style.transform = "translateY(0)";
			}, index * 100); // Delay each item by 100ms
		});
	} else {
		menuItems.forEach((item, index) => {
			setTimeout(() => {
				item.style.opacity = "0";
				item.style.transform = "translateY(20px)";
			}, index * 100); // Delay each item by 100ms
		});
	}
}
