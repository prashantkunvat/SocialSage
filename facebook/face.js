let result;

async function fetchVideo() {
	const url = document.getElementById("urlInput").value;
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": "36b217c547mshbf89160bf76fbcep14cc50jsn45e464e420d5",
			"x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
		},
	};

	try {
		// Show loading animation
		document.getElementById("loading-animation").style.display = "block";
		hideElements();

		const videoContainer = document.getElementById("videoContainer");
		videoContainer.innerHTML = ""; // Clear previous videos

		const response = await fetch(
			`https://social-media-video-downloader.p.rapidapi.com/smvd/get/facebook?url=${url}`,
			options
		);

		if (!response.ok) {
			throw new Error("Invalid link or failed to fetch data");
		}

		result = await response.json();
		console.log(result);

		const qualitySelector = document.getElementById("quality-select");

		// Clear previous data
		videoContainer.innerHTML = "";
		qualitySelector.innerHTML = "<option value=''>Select Quality</option>";

		const uniqueQualities = new Set(); // To store unique video qualities

		// Display only the first video and populate quality selector
		const firstLink = result.links[0];
		videoContainer.innerHTML = `<video controls><source src="${firstLink.link}" type="video/mp4">Your browser does not support the video tag.</video>`;

		// Populate quality selector
		result.links.forEach((link, index) => {
			if (!uniqueQualities.has(link.quality)) {
				uniqueQualities.add(link.quality);
				qualitySelector.innerHTML += `<option value="${index}">${link.quality}</option>`;
			}
		});

		// Display download button and quality selector
		document.getElementById("downloadBtn").style.display = "block";
		document.getElementById("quality-select").style.display = "block";

		// Set the first link as download link
		const downloadBtn = document.getElementById("downloadBtn");
		downloadBtn.setAttribute("download", "downloaded_video.mp4");
		downloadBtn.setAttribute("href", firstLink.link);

		// Hide loading animation
		document.getElementById("loading-animation").style.display = "none";
	} catch (error) {
		alert("Invalid URL or failed to fetch video data. Please try again.");
		console.error(error);
	}
}

function hideElements() {
	document.getElementById("videoContainer").innerHTML = "";
	document.getElementById("quality-select").style.display = "none";
	document.getElementById("downloadBtn").style.display = "none";
}

function downloadVideo() {
	const downloadBtn = document.getElementById("downloadBtn");
	const videoUrl = downloadBtn.getAttribute("href");
	const filename = downloadBtn.getAttribute("download");

	const anchor = document.createElement("a");
	anchor.href = videoUrl;
	anchor.download = filename;
	anchor.click();
}

function updateDownloadLink() {
	console.log(result);
	const qualitySelector = document.getElementById("quality-select");
	const selectedQualityIndex = qualitySelector.value;

	const downloadBtn = document.getElementById("downloadBtn");

	if (selectedQualityIndex !== "") {
		const selectedLink = result.links[selectedQualityIndex];
		if (selectedLink) {
			downloadBtn.setAttribute("href", selectedLink.link);
		}
	}
}

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
