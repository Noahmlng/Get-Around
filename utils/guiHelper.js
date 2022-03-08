module.exports = {
    toast: function(o) {
        var e = o.message, c = o.duration;
        c || (c = 1500);
        var n = o.icon;
        n || (n = "success");
        var s = o.success;
        wx.showToast({
            title: e,
            duration: c,
            icon: n,
            success: s
        });
    },
    alert: function(o) {
        var e = o.message, c = o.success, n = o.failure;
        wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            confirmText: "确定",
            success: c,
            fail: n
        });
    },
    config: function(o) {
        var e = o.message, c = o.yes, n = o.no, s = o.confirmText;
        s || (s = "是");
        var t = o.cancelText;
        t || (t = "否");
        var a = o.title;
        wx.showModal({
            title: a,
            content: e,
            showCancel: !0,
            confirmText: s,
            cancelText: t,
            success: function(o) {
                o.confirm ? c && "function" == typeof c && c() : o.cancel && n && "function" == typeof n && n();
            }
        });
    },
    audioPlay: function(o) {
        var e = wx.createInnerAudioContext();
        e.autoplay = !1, e.src = 0 == o ? "/audio/key.mp3" : 1 == o ? "/audio/key.mp3" : 2 == o ? "/audio/success.mp3" : 3 == o ? "/audio/error.mp3" : 4 == o ? "/audio/summary.mp3" : 99 == o ? "/audio/mascot.mp3" : "/audio/key.mp3", 
        e.onPlay(function() {}), e.onError(function(o) {
            console.log(o);
        }), e.play();
    }
};