(() => {
    console.log("bearing-formatter-main.js loaded");
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

    setInterval(() => {
        const inputText = inputTextArea.value;
        const inputs = inputText.split("\n");
        const outputs = inputs.map((inputRow) => {
            return convertBearing(inputRow);
        });

        const outputText = outputs.join("\n");
        outputTextArea.value = outputText;
    }, 100);
})();
