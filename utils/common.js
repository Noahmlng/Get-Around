var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    getUrlParameter: function(t, r) {
        if (0 == r.length) return "";
        var e = r.split("?");
        if (e.length < 2) return "";
        if (0 == (r = e[1]).length) return "";
        for (var n = r.split("&"), a = 0; a < n.length; a++) {
            var u = n[a].split("=", 2);
            if (u[0] == t) return u.length < 2 || void 0 === u[1] || "undefined" == u[1] || "null" == u[1] ? "" : u[1];
        }
        return "";
    },
    formatTime: function(r) {
        var e = r.getFullYear(), n = r.getMonth() + 1, a = r.getDate(), u = r.getHours(), i = r.getMinutes(), o = r.getSeconds();
        return [ e, n, a ].map(t).join("/") + " " + [ u, i, o ].map(t).join(":");
    },
    randomNum: function(t, r) {
        var e = 0;
        switch (arguments.length) {
          case 1:
            e = parseInt(Math.random() * t + 1, 10);
            break;

          case 2:
            e = parseInt(Math.random() * (r - t + 1) + t, 10);
            break;

          default:
            e = 0;
        }
        return e;
    },
    getInterpolation: function(t, r, e, n, a) {
        var u = 0;
        return e == t ? MinY : (100 == (u = Math.round((n - r) / (e - t) * (a - t) + r)) && (u = 99), 
        0 == u && (u = 1), u);
    }
};