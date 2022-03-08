var e = require("./questionStorage.js"), r = require("./guiHelper.js"), t = require("./consts.js");

module.exports = {
    newByMode: function(t) {
        var o = !1, s = e.extract(t);
        return 0 === s.items.length ? r.toast({
            message: "抱歉，无法获取谜题，请稍后重试或向开发者反馈异常。",
            duration: 1500,
            image: "../../images/icon_error.png"
        }) : o = this.save(s), o;
    },
    newByCode: function(t, o) {
        var s = !1, a = e.select(t, o);
        return 0 === a.items.length ? r.toast({
            message: "抱歉，无法获取谜题，请稍后重试或向开发者反馈异常。",
            duration: 1500,
            image: "../../images/icon_error.png"
        }) : s = this.save(a), s;
    },
    read: function() {
        var e;
        try {
            (e = wx.getStorageSync(t.KEY_QUESTION_CURRENT)) || (e = {});
        } catch (e) {
            r.toast({
                message: "抱歉，获取本地缓存数据失败，请稍后重试或向开发者反馈异常。",
                duration: 1500,
                image: "../../images/icon_error.png"
            }), console.log("获取本地缓存数据时发生错误。");
        }
        return e;
    },
    save: function(e) {
        var o = !1;
        try {
            wx.setStorageSync(t.KEY_QUESTION_CURRENT, e), o = !0;
        } catch (e) {
            r.toast({
                message: "抱歉，谜题存储异常，请稍后重试或向开发者反馈异常。",
                duration: 1500,
                image: "../../images/icon_error.png"
            }), console.log("将抽取的题目存储于本地时发生错误。"), console.log(e);
        }
        return o;
    }
};