var e = require("./../../utils/guiHelper.js"), n = require("./../../utils/questionHandler.js");

getApp();

Page({
    data: {},
    onShareAppMessage: function(e) {
        return {
            title: "一钩残月带三星(打一字)，快来猜猜看！",
            path: "/pages/index/index?from=" + e.from + "&code=" + this.data.code + "&mode=" + this.data.mode,
            imageUrl: "/images/applets_guessing_logo.png"
        };
    },
    onShareTimeline: function() {
        return {
            title: "园中观夜景(打一节日)，快来猜猜看！",
            query: "/pages/index/index",
            imageUrl: "/images/applets_guessing_logo.png"
        };
    },
    onLoad: function(e) {},
    bind_easymode_startup: function() {
        e.audioPlay(), n.newByMode(0) && this.goto_answer();
    },
    bind_hardmode_startup: function() {
        e.audioPlay(), n.newByMode(1) && this.goto_answer();
    },
    bind_code_startup: function(e, i) {
        n.newByCode(e, i) && this.goto_answer();
    },
    goto_answer: function() {
        wx.navigateTo({
            url: "../riddle_answer/riddle_answer?index=0"
        });
    }
});