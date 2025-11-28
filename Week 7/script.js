// Task 17: Gallery with event delegation
const mainImage = document.getElementById('main-image');
const thumbnailsContainer = document.getElementById('thumbnail-container');

thumbnailsContainer.addEventListener('click', e => {
  const target = e.target;
  if (target && target.classList.contains('thumbnail')) {
    // Update main image src and alt
    const newSrc = target.getAttribute('data-large');
    const newAlt = target.getAttribute('alt');
    
    mainImage.src = newSrc;
    mainImage.alt = newAlt;

    // Update selected thumbnail styling
    document.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.classList.remove('selected');
    });
    target.classList.add('selected');
  }
});

// Task 18: Simulate fetching data using Promises and setTimeout
const fetchBtn = document.getElementById('fetchBtn');
const fetchOutput = document.getElementById('fetchOutput');

function simulateFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        message: "Hello from the simulated server!",
        timestamp: new Date().toLocaleString(),
        status: "success",
        items: [1, 2, 3, 4, 5]
      };
      resolve(data);
    }, 2000);
  });
}

fetchBtn.addEventListener('click', async () => {
  fetchOutput.textContent = "Fetching data...";
  try {
    const data = await simulateFetch();
    fetchOutput.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    fetchOutput.textContent = "Error fetching data.";
  }
});
