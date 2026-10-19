document.addEventListener("DOMContentLoaded", () => {
    // --- LANGUAGE SWITCHING LOGIC ---
    const btnEn = document.getElementById("btn-en");
    const btnMl = document.getElementById("btn-ml");
    const greetingEn = document.getElementById("greeting-en");
    const greetingMl = document.getElementById("greeting-ml");

    // Function to switch to English
    btnEn.addEventListener("click", () => {
        btnEn.classList.add("active");
        btnMl.classList.remove("active");
        
        greetingEn.classList.remove("hidden");
        greetingEn.classList.add("fade-in");
        greetingMl.classList.add("hidden");
        
        document.documentElement.lang = "en";
    });

    // Function to switch to Malayalam
    btnMl.addEventListener("click", () => {
        btnMl.classList.add("active");
        btnEn.classList.remove("active");
        
        greetingMl.classList.remove("hidden");
        greetingMl.classList.add("fade-in");
        greetingEn.classList.add("hidden");
        
        document.documentElement.lang = "ml";
    });


    // --- VIDEO PLAYBACK LOGIC ---
    const playBtn = document.getElementById("play-video-btn");
    const videoWrapper = document.getElementById("video-wrapper");
    const videoElement = document.getElementById("welcome-video");
    const videoError = document.getElementById("video-error");
    const closingMessage = document.getElementById("closing-message");
    
    // New references for the image replacement feature
    const heroImage = document.getElementById("hero-image");
    const imageFallback = document.getElementById("image-fallback");

    playBtn.addEventListener("click", () => {
        // Hide the play button
        playBtn.classList.add("hidden");
        
        // Hide the static image and fallback (if showing)
        heroImage.classList.add("hidden");
        imageFallback.classList.add("hidden");

        // Show the video player in that same spot
        videoWrapper.classList.remove("hidden");
        videoWrapper.classList.add("fade-in");

        // Smoothly scroll the screen back to the top so they can watch the video
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Attempt to play the video
        const playPromise = videoElement.play();

        // Check if the video actually started playing
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // If it fails (e.g., file not found because it's not uploaded yet)
                console.log("Video playback failed: File may be missing.");
                videoError.classList.remove("hidden");
                // Still show the warm closing message even if video fails
                closingMessage.classList.remove("hidden");
                closingMessage.classList.add("fade-in");
            });
        }
    });

    // When the video naturally finishes, show the closing message at the bottom
    videoElement.addEventListener("ended", () => {
        closingMessage.classList.remove("hidden");
        closingMessage.classList.add("fade-in");
        
        // Exit fullscreen on mobile if the phone forced it
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
});