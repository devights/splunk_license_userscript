// ==UserScript==
// @name         Splunk License Convert to GB
// @namespace    https://github.com/devights/splunk_license_userscript
// @version      0.1
// @description  Converts Splunk license usage data into GB for easier consumption
// @author       Stephen De Vight
// @match        *://*/en-US/manager/system/licensing
// @grant        none
// @require https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

function process_part(part){
    var processed = part.replace("MB", "");
    processed = processed.replace(",", "");
    processed = processed.trim();
    return processed;
}

function convert_gb(value){
    var gb = value/1024;
    return Math.round(gb*1000)/1000;
}


$(document).ready(function() {
    'use strict';
    var tds = $("td");
    $.each(tds, function(idx, td){
        if($(td).html().indexOf("MB /") > 0){
            var usage_string = $(td).clone().children().remove().end().text();
            var parts = usage_string.split("/");
            var used = process_part(parts[0]);
            var total = process_part(parts[1]);
            var string = convert_gb(used) + "GB / " + convert_gb(total) + "GB";
            var td_children = $(td).clone().children();
            $(td).html(td_children);
            $(td).append(" &nbsp; " + string);
        }
    });
});
