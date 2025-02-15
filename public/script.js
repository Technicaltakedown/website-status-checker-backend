async function checkWebsite() {
    const url = document.getElementById("urlInput").value;
    const resultText = document.getElementById("result");
    const loadingText = document.getElementById("loading");

    if (!url) {
        alert("Please enter a website URL");
        return;
    }

    resultText.innerText = "";
    loadingText.style.display = "block"; // Show loading text

    try {
        const response = await fetch(`http://localhost:5000/check?url=${url}`);
        const data = await response.json();
        
        loadingText.style.display = "none"; // Hide loading text
        resultText.innerText = data.message;
    } catch (error) {
        loadingText.style.display = "none";
        resultText.innerText = "Error checking website status!";
 
   }
}
