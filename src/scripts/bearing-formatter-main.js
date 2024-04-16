(() => {
    const inputTextArea = document.querySelector("#bearing-formatter-input");
    const outputTextArea = document.querySelector("#bearing-formatter-output");
    const inputLineNumbers = document.querySelector("#input-line-numbers");
    const outputLineNumbers = document.querySelector("#output-line-numbers");

    const inputRegex = /^\s*(\d+|\.\d+|\d+\.\d*)\s*$/;
    let currentLineCount = 1;
    const convertBearing = (inputStr) => {
        inputStr = inputStr.trim();
        if (!inputStr) {
            return "";
        }

        if (!inputRegex.test(inputStr)) {
            return "Invalid Input Format";
        }

        var input = parseFloat(inputStr);
        input = parseInt((input * 10000).toFixed(0));
        if (isNaN(input)) {
            return "Invalid Input Format";
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

    const alignLineNumbers = () => {
        const lineNumberWidth = inputLineNumbers.clientWidth;
        inputTextArea.style.paddingLeft = `${lineNumberWidth}px`;
        outputTextArea.style.paddingLeft = `${lineNumberWidth}px`;
    }
    alignLineNumbers();

    const convert = () => {
        const inputText = inputTextArea.value;
        const inputs = inputText.split("\n");
        const outputs = inputs.map((inputRow) => {
            return convertBearing(inputRow);
        });
        const newLineCount = inputs.length;
        if (newLineCount > currentLineCount) {
            const fragment = document.createDocumentFragment();
            for (let i = currentLineCount; i < newLineCount; i++) {
                const lineNumberSpan = document.createElement("span");
                lineNumberSpan.innerHTML = `${i + 1}:`;
                fragment.appendChild(lineNumberSpan);
            }
            inputLineNumbers.appendChild(fragment.cloneNode(true));
            outputLineNumbers.appendChild(fragment);
        } else if (newLineCount < currentLineCount) {
            const inputParent = inputLineNumbers.parentNode;
            const outputParent = outputLineNumbers.parentNode;
            inputParent.removeChild(inputLineNumbers);
            outputParent.removeChild(outputLineNumbers);
            for (let i = currentLineCount; i > newLineCount; i--) {
                inputLineNumbers.removeChild(inputLineNumbers.lastChild);
                outputLineNumbers.removeChild(outputLineNumbers.lastChild);
            }
            inputParent.appendChild(inputLineNumbers);
            outputParent.appendChild(outputLineNumbers);
        }
        currentLineCount = newLineCount;
        alignLineNumbers();

        const outputText = outputs.join("\n");
        outputTextArea.value = outputText;
    }
    inputTextArea.addEventListener("input", convert);

    inputTextArea.addEventListener("scroll", () => {
        requestAnimationFrame(() => {
            inputLineNumbers.scrollTop = inputTextArea.scrollTop;
            outputLineNumbers.scrollTop = outputTextArea.scrollTop;
            outputTextArea.scrollTop = inputTextArea.scrollTop;
        });
    }, { passive: true });
    outputTextArea.addEventListener("scroll", () => {
        requestAnimationFrame(() => {
            inputLineNumbers.scrollTop = outputTextArea.scrollTop;
            inputTextArea.scrollTop = outputTextArea.scrollTop;
            outputLineNumbers.scrollTop = outputTextArea.scrollTop;
        });
    }, { passive: true });

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
