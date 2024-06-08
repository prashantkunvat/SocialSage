const fetchButton = document.getElementById("fetch-button");
const downloadButton = document.getElementById("download-button");
const videoLinkInput = document.getElementById("video-link");
const downloadLink = document.getElementById("download-link");
const loadingAnimation = document.getElementById("loading-animation");

const url = "https://all-video-downloader1.p.rapidapi.com/spotifydl";

const options = {
	method: "POST",
	headers: {
		"x-rapidapi-key": "36b217c547mshbf89160bf76fbcep14cc50jsn45e464e420d5",
		"x-rapidapi-host": "all-video-downloader1.p.rapidapi.com",
	},
};

async function download() {
	try {
		const data = new FormData();
		data.append("url", videoLinkInput.value); // Update with the value from the input field
		options.body = data; // Update the body with the new FormData object

		loadingAnimation.style.display = "block"; // Show loading animation
		downloadButton.style.display = "none"; // Hide the download button

		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error("Invalid link or failed to fetch data");
		}

		const result = await response.json();
		console.log(result);

		// Check if the fetch was successful and result contains a download link
		if (result.result) {
			downloadLink.href = result.result; // Set the href attribute of the download link
			downloadButton.style.display = "block"; // Display the download button
		} else {
			console.error("Fetch failed or no download link available.");
			downloadButton.style.display = "none"; // Hide the download button if there's no download link
		}

		loadingAnimation.style.display = "none"; // Hide loading animation
	} catch (error) {
		alert("Invalid URL or failed to fetch video data. Please try again.");
		console.error("Error:", error);
		loadingAnimation.style.display = "none"; // Hide loading animation on error
	}
}

function initiateDownload() {
	// Simulate click on the download link
	downloadLink.click();
}

fetchButton.addEventListener("click", download);
downloadButton.addEventListener("click", initiateDownload);

// hamburger

// hamburger
document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".hamburger");
	const headerList = document.querySelector("#header-list");

	hamburger.addEventListener("click", () => {
		headerList.classList.toggle("active");
		hamburger.classList.toggle("active");
	});
});

const docWidth = document.documentElement.offsetWidth;
[].forEach.call(document.querySelectorAll("*"), function (el) {
	if (el.offsetWidth > docWidth) {
		console.log(el);
	}
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
