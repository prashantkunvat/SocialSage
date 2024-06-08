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
		// Display loading animation
		const loadingAnimation = document.getElementById("loading-animation");
		loadingAnimation.style.display = "block";

		hideElements();

		const response = await fetch(
			`https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram?url=${url}`,
			options
		);

		if (!response.ok) {
			throw new Error("Invalid link or failed to fetch data");
		}

		const result = await response.json();
		console.log(result);

		// Display loading animation

		result.links.forEach((link) => {
			// Display video
			videoContainer.innerHTML += `<video controls><source src="${link.link}" type="video/mp4">Your browser does not support the video tag.</video>`;
		});

		// Display download button
		const downloadBtn = document.getElementById("downloadBtn");
		downloadBtn.style.display = "block";
		downloadBtn.setAttribute("download", "downloaded_video.mp4");
		downloadBtn.setAttribute("href", result.links[0].link); // Assuming the first link is the video link

		// Hide loading animation after fetching data
		loadingAnimation.style.display = "none";
	} catch (error) {
		alert("Invalid URL or failed to fetch video data. Please try again.");
		console.error(error);
	}
}

function hideElements() {
	document.getElementById("videoContainer").innerHTML = "";
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
