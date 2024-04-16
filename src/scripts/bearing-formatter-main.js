(() => {
    const inputTextArea = document.querySelector("#bearing-formatter-input");
    const outputTextArea = document.querySelector("#bearing-formatter-output");

    const convertBearing = (inputStr) => {
        inputStr = inputStr.trim();
        if (!inputStr) {
            return "";
        }

        var input = parseFloat(inputStr);
        input = parseInt((input * 10000).toFixed(0));
        if (isNaN(input)) {
            return "Error Format";
        }

        let increment = 0;
        let second = input % 100;
        if (second >= 60) {
            increment = parseInt(second / 60);
            second = second % 60;
        }
        input = parseInt(input / 100);
        input += increment;

        increment = 0;
        let minute = input % 100;
        if (minute >= 60) {
            increment = parseInt(minute / 60);
            minute = minute % 60;
        }
        input = parseInt(input / 100);
        input += increment;

        return `${input}%%d${(minute < 10 ? "0" + minute : minute)}'${(second < 10 ? "0" + second : second)}"`;
    };

    const convert = () => {
        const inputText = inputTextArea.value;
        const inputs = inputText.split("\n");
        const outputs = inputs.map((inputRow) => {
            return convertBearing(inputRow);
        });

        const outputText = outputs.join("\n");
        outputTextArea.value = outputText;
    }
    inputTextArea.addEventListener("input", convert);

    let toastTimer = null;
    let enlargeTimer = null;
    const showToast = (message) => {
        const toast = document.querySelector("#toast");
        toast.innerText = message;
        toast.classList.add("shown");
        toast.classList.add("enlarge");

        if (toastTimer) {
            clearTimeout(toastTimer);
        }
        if (enlargeTimer) {
            clearTimeout(enlargeTimer);
        }
        toastTimer = setTimeout(() => {
            toast.classList.remove("shown");
        }, 3000);
        enlargeTimer = setTimeout(() => {
            toast.classList.remove("enlarge");
        }, 100);
    }

    const copyButton = document.querySelector("#copy-btn");
    copyButton.addEventListener("click", () => {
        const outputText = outputTextArea.value;
        if (!outputText) {
            showToast("No output to copy");
            return;
        }

        outputTextArea.select();
        document.execCommand("copy");
        showToast("Copied");
    });
})();
