document.addEventListener("DOMContentLoaded", function () {
    const originalText = document.getElementById("originalText");
    const wordsToRedact = document.getElementById("wordsToRedact");
    const replacementChar = document.getElementById("replacementChar");
    const redactButton = document.getElementById("redactButton");
    const copyButton = document.getElementById("copyButton");
    const redactedText = document.getElementById("redactedText");
    const stats = document.getElementById("stats");

    redactButton.addEventListener("click", function () {
        const text = originalText.value;
        const words = wordsToRedact.value.split(" ");
        const replacement = replacementChar.value || "*"; // Use * by default if user doesn't specify

        const startTime = new Date().getTime(); // Start measuring time

        let redactedTextContent = text;

        words.forEach(word => {
            // Create a regular expression to match the whole word and replace each letter with the replacement character
            const regex = new RegExp("\\b" + word + "\\b", "gi");
            const replacementWord = replacement.repeat(word.length);
            redactedTextContent = redactedTextContent.replace(regex, replacementWord);
        });

        const endTime = new Date().getTime(); // Stop measuring time
        const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds

        redactedText.textContent = redactedTextContent;
        copyButton.classList.remove("hidden");

        // Calculate and display stats
        const wordCount = words.length;
        const charCount = text.length;
        stats.innerHTML = `
            <p>Words Scanned: ${wordCount}</p>
            <p>Characters Scrambled: ${charCount}</p>
            <p>Time Taken: ${elapsedTime} seconds</p>
        `;
    });

    copyButton.addEventListener("click", function () {
        const textToCopy = redactedText.textContent;
        const tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Redacted text copied to clipboard!");
    });
});
