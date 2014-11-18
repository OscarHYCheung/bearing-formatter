$(function() {
    console.log("bearing-formatter-main.js loaded");
    var inputTextArea = $("#bearing-formatter-input");
    var outputTextArea = $("#bearing-formatter-output");

    var convertBearing = function(inputStr) {
        inputStr = inputStr.trim();
        if (!inputStr) {
            return "";
        }

        var input = parseFloat(inputStr);
        input = parseInt((input * 10000).toFixed(0));
        if (isNaN(input)) {
            return "Error Format";
        }

        var increament = 0;
        var second = input % 100;
        if (second >= 60) {
            increament = parseInt(second / 60);
            second = second % 60;
        }
        input = parseInt(input / 100);
        input += increament;

        increament = 0;
        var minute = input % 100;
        if (minute >= 60) {
            increament = parseInt(minute / 60);
            minute = minute % 60;
        }
        input = parseInt(input / 100);
        input += increament;

        return input + "%%" + (minute < 10 ? "0" + minute : minute) + "'" + (second < 10 ? "0" + second : second) + "\"";
    };

    setInterval(function() {
        var inputText = inputTextArea.val();
        var inputs = inputText.split("\n");
        var outputText = "";

        for (var i = 0; i < inputs.length; i++) {
            outputText += convertBearing(inputs[i]) + "\n";
        }
        outputTextArea.val(outputText);
    }, 100);
});
