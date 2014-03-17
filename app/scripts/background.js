/**
 * S.I.R - Kevin Smith's SModcast Internet Radio
 * Unofficial Chrome Extension
 * @author       Kevin Coughlin <kevintcoughlin@gmail.com>
 * @copyright    2014 Kevin Coughlin
 * @license      MIT License
 */
(function() {
    'use strict';

    /**
     * @namespace SIR
     */
    var SIR = SIR || {
        streamURL: "http://68.168.101.146:8518/;stream.nsv&type=mp3",
        badge: {
            text: 'OFF'
        },
        toggleStream: _toggleStream,
        init: _init,
        handleBrowserAction: _handleBrowserAction
    };

    function _init() {
        SIR.player = new Audio();
        SIR.player.autoplay = true;
        SIR.player.src = SIR.streamURL
    };

    function _toggleStream() {
        if (!SIR.player) {
            SIR.init();
        }

        if (SIR.player.paused) {
            SIR.player.src = SIR.streamURL
            SIR.player.play();
            SIR.badge.text = "ON"
        } else {
            SIR.player.src = ''
            SIR.player.pause();
            SIR.badge.text = "OFF";
        }
    }

    function _handleBrowserAction() {
        SIR.toggleStream();
        chrome.browserAction.setBadgeText(SIR.badge);
    }

    chrome.browserAction.setBadgeText(SIR.badge);
    chrome.browserAction.onClicked.addListener(SIR.handleBrowserAction);

})();
