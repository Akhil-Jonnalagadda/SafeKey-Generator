document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const copyBtn = document.getElementById("copyBtn");
    const generateBtn = document.getElementById("generateBtn");
    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");
    const includeUppercase = document.getElementById("includeUppercase");
    const includeNumbers = document.getElementById("includeNumbers");
    const includeSymbols = document.getElementById("includeSymbols");
    const strengthText = document.getElementById("strengthText");

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener("click", () => {
        let characters = lowercaseChars;
        if (includeUppercase.checked) characters += uppercaseChars;
        if (includeNumbers.checked) characters += numberChars;
        if (includeSymbols.checked) characters += symbolChars;

        let password = "";
        for (let i = 0; i < lengthSlider.value; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        passwordField.value = password;
        evaluateStrength(password);
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordField.value).then(() => {
            alert("Password copied to clipboard!");
        });
    });

    function evaluateStrength(password) {
        let strength = "Weak";
        let hasUpper = /[A-Z]/.test(password);
        let hasNumber = /\d/.test(password);
        let hasSymbol = /[!@#$%^&*]/.test(password);

        if (password.length >= 12 && hasUpper && hasNumber && hasSymbol) {
            strength = "Strong";
        } else if (password.length >= 8 && (hasUpper || hasNumber || hasSymbol)) {
            strength = "Medium";
        }

        strengthText.textContent = strength;
        strengthText.style.color = strength === "Strong" ? "green" : strength === "Medium" ? "orange" : "red";
    }
});
