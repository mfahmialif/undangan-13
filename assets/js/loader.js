window.onload = function () {
  let loader = document.getElementById("loader");
  let progressText = document.getElementById("progress-text");

  const images = document.querySelectorAll("img");
  const videos = document.querySelectorAll("video");
  const totalResources = images.length + videos.length;

  let loadedResources = 0;

  const updateProgress = () => {
    let percent = Math.round((loadedResources / totalResources) * 100);
    progressText.innerText = `Preparing the big day... ${percent}%`;

    if (loadedResources >= totalResources) {
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 500);
    }
  };

  const handleResourceLoaded = () => {
    loadedResources++;
    updateProgress();
  };

  // Handle empty state (tidak ada gambar/video)
  if (totalResources === 0) {
    progressText.innerText = "Preparing the big day... 100%";
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
    return;
  }

  // Check images
  images.forEach((img) => {
    if (img.complete) {
      handleResourceLoaded();
    } else {
      img.addEventListener("load", handleResourceLoaded);
      img.addEventListener("error", handleResourceLoaded);
    }
  });

  // Check videos
  videos.forEach((vid) => {
    if (vid.readyState >= 3) {
      handleResourceLoaded();
    } else {
      vid.addEventListener("loadeddata", handleResourceLoaded);
      vid.addEventListener("error", handleResourceLoaded);
    }
  });
};