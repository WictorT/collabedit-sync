// ==UserScript==
// @name     CollabEdit File Sync
// @author   Victor Timoftii
// @match    *://collabedit.com/*
// @version  2.0
// @grant    none
// ==/UserScript==

window.onload = function() {
    // Initialization
    var reader = new FileReader();
    var $input = $('<input id="local_file" type="file">');
    var lastModified = 0;

    // Adding needed elements
    $('#sidebar_div').prepend('<div style="margin-bottom: 10px"> <p class="chat_label">File to sync with:</p> </div>');
    $('#sidebar_div > div:nth-child(1)').append($input);

    // Copy file to element
    reader.onload = function (event) {
        var fileContent = event.target.result.toString();
        $('#frame_the_input').contents().find("#textarea").val(fileContent);
    };

    // Sync
    setInterval(function () {
        if ($input.prop('files').length === 1) {
            var file = $input.prop('files')[0];
            if (file.lastModified !== lastModified) {
                reader.readAsText(file);
                lastModified = file.lastModified;
            }
        }
    }, 500);
};
