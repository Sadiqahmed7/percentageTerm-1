// Function to calculate attendance percentages
function calculate() {
    const inputs = [];
    for (let i = 1; i <= 7; i++) {
        const value = parseFloat(document.getElementById(`jun` + (i === 1 ? '' : String.fromCharCode(74 + i))).value);
        if (isNaN(value) || value < 0) {
            alert("Please fill all fields correctly!");
            return;
        }
        inputs.push(value);
    }

    // Calculate percentages for attendance
    const results = [
        (inputs[0] / 14) * 100,  // JUN
        (inputs[1] / 23) * 100,  // JUL
        (inputs[2] / 22) * 100,  // AUG
        (inputs[3] / 20) * 100,  // SEP
        (inputs[4] / 16) * 100,  // OCT
        (inputs[5] / 24) * 100,  // NOV
        (inputs[6] / 119) * 100  // TOTAL
    ];

    // Display attendance percentage below each month
    document.getElementById("junResult").innerText = `${sanitizeHTML(results[0].toFixed(2))}%`;
    document.getElementById("julResult").innerText = `${sanitizeHTML(results[1].toFixed(2))}%`;
    document.getElementById("augResult").innerText = `${sanitizeHTML(results[2].toFixed(2))}%`;
    document.getElementById("sepResult").innerText = `${sanitizeHTML(results[3].toFixed(2))}%`;
    document.getElementById("octResult").innerText = `${sanitizeHTML(results[4].toFixed(2))}%`;
    document.getElementById("novResult").innerText = `${sanitizeHTML(results[5].toFixed(2))}%`;
    document.getElementById("totalResult").innerText = `${sanitizeHTML(results[6].toFixed(2))}%`;
}

// Function to sanitize HTML content (to prevent XSS)
function sanitizeHTML(str) {
    const element = document.createElement('div');
    if (str) {
        element.innerText = str;
        element.textContent = str;
    }
    return element.innerHTML;
}

// Validate input to ensure only numbers are entered
function validateInput(event) {
    const value = event.target.value;
    if (value < 0 || isNaN(value)) {
        event.target.value = '';
    } else {
        // Automatically calculate after the last month input
        const lastInput = document.getElementById("total");
        if (lastInput.value !== '') {
            calculate();
        }
    }
}

// Attach "Enter" key behavior
document.querySelectorAll("input").forEach((input, index, array) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (index < array.length - 1) {
                // Move to the next input field
                array[index + 1].focus();
            } else {
                // Calculate when the last input is filled
                calculate();
            }
        }
    });
});
