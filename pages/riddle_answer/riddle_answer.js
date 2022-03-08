function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = require("./../../utils/common.js"), a = require("./../../utils/guiHelper.js"), s = require("./../../utils/questionHandler.js"), i = require("./../../utils/questionStorage.js"), n = 0;

Page({
    data: {
        showSummary: !1,
        showTips: !1,
        showShare: !1,
        numContinuousRight: 0
    },
    onShareAppMessage: function(e) {
        return {
            title: this.data.puzzle + "(" + this.data.ans_scope + ")，快来猜猜看！",
            path: "/pages/index/index?from=" + e.from + "&code=" + this.data.code + "&mode=" + this.data.mode,
            imageUrl: "/images/applets_guessing_logo.png"
        };
    },
    onShareTimeline: function(e) {
        return {
            title: this.data.puzzle + "(" + this.data.ans_scope + ")，快来猜猜看！",
            query: "/pages/riddle_answer/riddle_answer?from=share&a=1",
            imageUrl: "/images/applets_guessing_logo.png"
        };
    },
    onLoad: function(e) {
        var t = 0;
        e.index && (t = parseInt(e.index)), this.refreshData(t);
    },
    bind_mascot: function() {
        a.audioPlay(99);
    },
    bind_close_share: function() {
        var e = {
            showShare: !1
        };
        this.setData(e), a.audioPlay(0);
    },
    bind_open_tips: function() {
        var e = this.data.numPrompt - 1;
        if (e < 0) {
            t = {
                showShare: !0,
                numPrompt: -1
            };
            this.setData(t), a.audioPlay(3);
        } else {
            var t = {
                showTips: !0,
                numPrompt: e,
                isCallHelp: !0
            };
            this.setData(t), a.audioPlay(0);
        }
    },
    bind_close_tips: function() {
        var e = {
            showTips: !1
        };
        this.setData(e), a.audioPlay(0);
    },
    bind_nextQuestion: function() {
        var e = this;
        this.data.currentQuestion == this.data.numQuestion ? (a.audioPlay(4), e.goNextQuestion("", 2)) : (a.audioPlay(0), 
        a.config({
            message: "hi , 不再好好想想 ?",
            confirmText: "想不出来",
            cancelText: "再想想吧",
            title: "跳过",
            yes: function() {
                e.goNextQuestion("", 2);
            }
        }));
    },
    bind_onemoregame: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    goNextQuestion: function(e, t) {
        var a = this.data.index, i = s.read();
        if (i.items) {
            var n = a + 1;
            i.currentIndex = n;
            var r = i.items[a];
            if (r) {
                r.callHelp = !!this.data.isCallHelp, r.user_answer = e, r.user_result = t;
                var o = new Date(), u = this.data.startTime, l = o.getTime() - u.getTime();
                r.user_duration = Math.floor(l / 1e3);
            }
            s.save(i), n == this.data.numQuestion ? this.showAchievement() : this.refreshData(n);
        }
    },
    showAchievement: function() {
        i.setNextIndex(this.data.mode);
        var e = s.read();
        if (e.items) {
            for (var a = 0, n = 0, r = 0, o = 0, u = 3, l = "", d = 0; d < e.items.length; d++) {
                var m = e.items[d];
                m.user_duration && (a += m.user_duration), 1 == m.user_result ? (r += 1, m.user_duration <= 15 ? n += 100 : m.user_duration > 15 && m.user_duration <= 60 ? n += 80 : n += 60, 
                m.callHelp && (n -= 20)) : 2 == m.user_result && (o += 1);
            }
            var c = Math.round(n / parseInt(this.data.numQuestion));
            if (100 == c) u = 1, l = "一根油条,两个鸡蛋"; else if (c > 80) u = 1, l = "优于 " + (h = t.getInterpolation(80, 90, 100, 100, c)) + "% 的猜谜人"; else if (c <= 80 && c > 60) u = 2, 
            l = "优于 " + (h = t.getInterpolation(60, 30, 80, 90, c)) + "% 的猜谜人"; else if (c <= 60 && c > 0) {
                u = 3;
                var h = t.getInterpolation(0, 5, 60, 30, c);
                l = "优于 " + h + "% 的猜谜人";
            } else u = 3, l = "吃了个瓜蛋...";
            var g = {};
            g.sumTime = this.getFormatDuringTime(a), g.sumScore = c, g.sumRigntNum = r, g.sumSkipNum = o, 
            g.sumBg = "../../images/img_summary_bg" + u + ".png", g.sumDescribe = l, g.showSummary = !0, 
            this.setData(g);
        }
    },
    getFormatDuringTime: function(e) {
        var t = parseInt(e), a = 0, s = 0;
        t > 60 && (a = parseInt(t / 60), t = parseInt(t % 60), a > 60 && (s = parseInt(a / 60), 
        a = parseInt(a % 60)));
        var i = parseInt(t) + "秒";
        return a > 0 && (i = parseInt(a) + "分" + i), s > 0 && (i = parseInt(s) + "小时" + i), 
        i;
    },
    refreshData: function(e) {
        var t = this.getTitle(e);
        "" == t && (a.alert({
            message: "谜题索引错误，请重新选题。"
        }), wx.reLaunch({
            url: "../index/index"
        }));
        var i = s.read();
        (!i.code || !i.items || 0 == i.items.length || i.items.length < e + 1) && (s.newByMode(this.data.mode) ? (i = s.read(), 
        e = 0) : (a.alert({
            message: "谜题错误，请重新选题。"
        }), wx.reLaunch({
            url: "../index/index"
        })));
        var n = this.data.numPrompt;
        0 != e || n || (n = 1 == i.mode ? 3 : 5);
        var r = {
            index: e,
            title: t,
            mode: i.mode,
            code: i.code,
            numQuestion: i.items.length,
            currentQuestion: e + 1,
            startTime: new Date(),
            numPrompt: n
        }, o = i.items[e];
        r.puzzle = o.puzzle, r.ans_scope = o.ans_scope, r.ans_result = o.ans_result, r.ans_analyze = o.ans_analyze, 
        r.isCallHelp = !1, r.ans_items = this.getAns_items(i.mode, o.ans_prompt), r.choose_items = this.getChoose_items(o.choose), 
        this.setData(r);
    },
    bind_nochangresult: function(e) {
        a.audioPlay(3);
    },
    bind_changresult: function(e) {
        var t = this, s = e.currentTarget.dataset.from;
        if (-1 != s) {
            var i = e.currentTarget.dataset.index, n = e.currentTarget.dataset.text;
            t.setResultBack(s, i, n), a.audioPlay(0);
        } else a.audioPlay(1);
    },
    bind_choose: function(e) {
        var t = this, s = e.currentTarget.dataset.to, i = e.currentTarget.dataset.index, n = e.currentTarget.dataset.text;
        if (s >= 0) {
            var r = this.data.ans_items[s];
            if (r) {
                a.audioPlay(0);
                var o = r.text;
                t.setResultBack(i, s, o);
            }
        } else {
            var u = t.getNextResultInputIndex();
            if (-1 == u) return void a.audioPlay(3);
            if (t.fillResult(i, n, u), -1 == (u = t.getNextResultInputIndex())) {
                if (t.checkRsultIsRight()) t.data.currentQuestion == t.data.numQuestion ? (a.audioPlay(4), 
                t.goNextQuestion("", 1)) : (a.audioPlay(2), a.toast({
                    message: t.getAnswerIsCorrect(),
                    icon: "success",
                    success: function() {
                        t.goNextQuestion("", 1);
                    }
                })); else if (a.audioPlay(3), a.toast({
                    message: t.getAnswerIsWrong(),
                    icon: "fail"
                }), this.data.ans_items) for (var l = 0; l < this.data.ans_items.length; l++) {
                    var d = this.data.ans_items[l];
                    d.editable && d.from >= 0 && t.setResultBack(d.from, l, d.text);
                }
            } else a.audioPlay(0);
        }
    },
    getAnswerIsCorrect: function() {
        return n < 0 && (n = 0), 1 == (n += 1) ? "正确" : 2 == n ? "真厉害" : n > 2 ? "你太牛了" : void 0;
    },
    getAnswerIsWrong: function() {
        return n > 0 && (n = 0), -1 == (n -= 1) ? "不对哦" : -2 == n ? "再想想呗" : n < -2 ? "燃烧吧大脑" : void 0;
    },
    setResultBack: function(t, a, s) {
        var i, n = "ans_items[" + a + "]", r = "choose_items[" + t + "]";
        this.setData((i = {}, e(i, n, {
            text: "",
            from: -1,
            editable: !0
        }), e(i, r, {
            text: s,
            to: -1
        }), i));
    },
    fillResult: function(t, a, s) {
        var i, n = "ans_items[" + s + "]", r = "choose_items[" + t + "]";
        this.setData((i = {}, e(i, n, {
            text: a,
            from: t,
            editable: !0
        }), e(i, r, {
            text: "",
            to: s
        }), i));
    },
    checkRsultIsRight: function() {
        var e = "";
        if (this.data.ans_items) for (var t = 0; t < this.data.ans_items.length; t++) e += this.data.ans_items[t].text;
        return e == this.data.ans_result;
    },
    getNextResultInputIndex: function() {
        var e = -1;
        if (this.data.ans_items) for (var t = 0; t < this.data.ans_items.length; t++) if ("" == this.data.ans_items[t].text) {
            e = t;
            break;
        }
        return e;
    },
    getChoose_items: function(e) {
        var t = [], a = e.split("");
        a.sort(function() {
            return Math.random() - .5;
        });
        for (var s = 0; s < a.length; s++) {
            var i = a[s];
            t.push({
                to: -1,
                text: i
            });
        }
        return t;
    },
    getAns_items: function(e, t) {
        for (var a = [], s = t.split(""), i = 0; i < s.length; i++) {
            var n = s[i];
            1 == e || "*" == n ? a.push({
                editable: !0,
                from: -1,
                text: ""
            }) : a.push({
                editable: !1,
                from: -1,
                text: n
            });
        }
        return a;
    },
    getTitle: function(e) {
        var t = "";
        switch (e) {
          case 0:
            t = "一";
            break;

          case 1:
            t = "二";
            break;

          case 2:
            t = "三";
            break;

          case 3:
            t = "四";
            break;

          case 4:
            t = "五";
            break;

          case 5:
            t = "六";
            break;

          case 6:
            t = "七";
            break;

          case 7:
            t = "八";
            break;

          case 8:
            t = "九";
            break;

          case 9:
            t = "十";
            break;

          case 10:
            t = "十一";
            break;

          case 11:
            t = "十二";
        }
        return t;
    }
});