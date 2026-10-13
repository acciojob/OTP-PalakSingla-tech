//your JS code here. If required.

const codes = document.querySelectorAll(".code");

codes.forEach((code, index) => {
    code.addEventListener("input", (e) => {
        // Keep only numeric digits
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value.slice(-1);

        // Move to the next input after entering a digit
        if (e.target.value !== "" && index < codes.length - 1) {
            codes[index + 1].focus();
        }
    });

    code.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
            if (code.value !== "") {
                // Clear current digit and move back
                code.value = "";
                e.preventDefault();

                if (index > 0) {
                    codes[index - 1].focus();
                }
            } else if (index > 0) {
                // If current field is empty, move back
                codes[index - 1].focus();
            }
        } else if (
            e.key === "ArrowLeft" &&
            index > 0
        ) {
            codes[index - 1].focus();
        } else if (
            e.key === "ArrowRight" &&
            index < codes.length - 1
        ) {
            codes[index + 1].focus();
        }
    });

    // Support pasting an OTP
    code.addEventListener("paste", (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, codes.length);

        pastedData.split("").forEach((digit, i) => {
            if (codes[index + i]) {
                codes[index + i].value = digit;
            }
        });

        const nextIndex = Math.min(
            index + pastedData.length,
            codes.length - 1
        );

        codes[nextIndex].focus();
    });
});
