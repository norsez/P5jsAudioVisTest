! function(r, t) { "function" == typeof define && define.amd ? define("p5.func", ["p5"], function(r) { t(r) }) : t("object" == typeof exports ? require("../p5") : r.p5) }(this, function(p5) {
    p5.Gen = function() { this.version = .01 }, p5.Gen.prototype.harmonics = function(r, t) {
        var e = !0;
        Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], e = !1), Array.isArray(t) || (t = [t]);
        var a;
        Array.isArray(r) ? a = new Array(r.length) : r.constructor === Float32Array ? a = new Float32Array(r.length) : r.constructor === Float64Array && (a = new Float64Array(r.length));
        for (var s in r) {
            var i = t.length;
            for (a[s] = 0; i--;)
                if (0 != t[i]) {
                    var n = TWO_PI * r[s] * (i + 1);
                    a[s] += sin(n) * t[i]
                }
        }
        return e ? a : a[0]
    }, p5.Gen.prototype.triples = function(r, t) {
        var e = !0;
        if (Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], e = !1), t.length < 2) return console.log("p5.Gen : we need at least 3 arguments!"), 0;
        t.length % 3 != 0 && console.log("p5.Gen : incomplete <partial, amp, phase> triplet!");
        var a;
        Array.isArray(r) ? a = new Array(r.length) : r.constructor === Float32Array ? a = new Float32Array(r.length) : r.constructor === Float64Array && (a = new Float64Array(r.length));
        for (i in r) {
            a[i] = 0;
            for (var s = t.length - 1; s > 0; s -= 3)
                if (0 != t[s - 1]) {
                    var n;
                    n = 0 == t[s - 2] ? 1 : sin(TWO_PI * (r[i] / (1 / t[s - 2]) + t[s] / 360)), a[i] += n * t[s - 1]
                }
        }
        return e ? a : a[0]
    }, p5.Gen.prototype.chebyshev = function(r, t) {
        var e = !0;
        Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], e = !1), Array.isArray(t) || (t = [t]);
        var a;
        Array.isArray(r) ? a = new Array(r.length) : r.constructor === Float32Array ? a = new Float32Array(r.length) : r.constructor === Float64Array && (a = new Float64Array(r.length));
        for (var s in r) {
            var i = 2 * r[s] - 1;
            a[s] = 0;
            for (var n = 1, o = i, p = 0; p < t.length; p++) a[s] += t[p] * o, Tn2 = n, o = 2 * i * (n = o) - Tn2
        }
        return e ? a : a[0]
    }, p5.Gen.prototype.bpf = function(r, t) {
        var e = !0;
        if (Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], e = !1), t.length % 2 != 0) return console.log("p5.Gen : incomplete <time, value> pair!"), 0;
        var a = t[t.length - 2],
            s = t[0];
        if (a - s <= 0) return console.log("p5.Gen : bpf times must be in ascending order!"), 0;
        var n, o = 1 / (a - s),
            p = 0,
            l = 0,
            c = 0,
            u = 0;
        Array.isArray(r) ? n = new Array(r.length) : r.constructor === Float32Array ? n = new Float32Array(r.length) : r.constructor === Float64Array && (n = new Float64Array(r.length));
        for (i in r)
            for (var h = 1; h < t.length; h += 2) {
                if (p = t[h - 1] * o, c = t[h], h < t.length - 1 ? (l = t[h + 1] * o, u = t[h + 2]) : (l = p, u = c), l - p < 0) return console.log("p5.Gen : bpf times music be in ascending order!"), 0;
                if (r[i] >= p && r[i] <= l) {
                    t[h + 1];
                    n[i] = map(r[i], p, l, c, u);
                    break
                }
            }
        return e ? n : n[0]
    }, p5.Gen.prototype.random = function(r, t) {
        var e = !0;
        r ? "string" != typeof r ? Array.isArray(arguments[0]) || arguments[0].constructor === Float32Array || arguments[0].constructor === Float64Array || (r = [r], e = !1) : (t = r, r = [millis()], e = !1) : (t = "linear", r = [millis()], e = !1);
        var a;
        Array.isArray(r) ? a = new Array(r.length) : r.constructor === Float32Array ? a = new Float32Array(r.length) : r.constructor === Float64Array && (a = new Float64Array(r.length)), -1 === r[0] && randomSeed(1e5 * millis());
        for (var s in r) switch (-1 != r[s] && randomSeed(1e5 * r[s]), t) {
            case "linear":
            case "even":
                a[s] = random();
                break;
            case "low":
                a[s] = min(random(), random());
                break;
            case "high":
                a[s] = max(random(), random());
                break;
            case "triangle":
                a[s] = (random() + random()) / 2;
                break;
            case "gaussian":
                for (var i = 0, n = 0; n < 12; n++) i += random();
                a[s] = .166666 * (i - 6) + .5;
                break;
            case "cauchy":
                do {
                    do { a[s] = random() } while (.5 == a[s]);
                    a[s] = .00628338 * tan(a[s] * PI) + .5
                } while (a[s] < 0 || a[s] > 1);
                break;
            default:
                a[s] = random()
        }
        return e ? a : a[0]
    }, p5.Gen.prototype.window = function(r, t, e) {
        var a = !0;
        Array.isArray(e) || (e = [e]), Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], a = !1);
        var s;
        Array.isArray(r) ? s = new Array(r.length) : r.constructor === Float32Array ? s = new Float32Array(r.length) : r.constructor === Float64Array && (s = new Float64Array(r.length));
        switch (t) {
            case 1:
            case "hamming":
                c = .54;
                for (y in r) s[y] = c - .46 * cos(TWO_PI * r[y]);
                break;
            case 2:
            case "hanning":
            case "vonhann":
            case "hann":
            case "hannsolo":
            case "hanningvonhannmeister":
                for (y in r) s[y] = .5 * (1 - cos(TWO_PI * r[y]));
                break;
            case 3:
            case "bartlett":
            case "fejer":
            case "fejér":
            case "triangle":
                for (y in r) s[y] = 1 - abs((r[y] - .5) / .5);
                break;
            case "bartlett-hann":
                var i = .62,
                    n = .48,
                    o = .38;
                for (y in r) s[y] = i - n * abs(r[y] - .5) - o * cos(2 * PI * r[y]);
                break;
            case 4:
            case "blackman":
                var i = 7938 / 18608,
                    n = 9240 / 18608,
                    o = 1430 / 18608;
                for (y in r) s[y] = i - n * cos(2 * PI * r[y]) + o * cos(4 * PI * r[y]);
                break;
            case "generalizedblackman":
                e[0] || (e[0] = .5);
                var i = (1 - (A = e[0])) / 2,
                    n = .5,
                    o = A / 2;
                for (y in r) {
                    var p = PI * r[y];
                    s[y] = i - n * cos(2 * p) + o * cos(4 * p)
                }
                break;
            case 5:
            case "blackman-harris":
                var i = .35875,
                    n = .48829,
                    o = .14128,
                    l = .01168;
                for (y in r) s[y] = i - n * cos(2 * PI * r[y]) + o * cos(4 * PI * r[y]) + l * cos(6 * PI * r[y]);
                break;
            case "blackman-nuttal":
                var i = .3635819,
                    n = .4891775,
                    o = .1365995,
                    l = .0106411;
                for (y in r) s[y] = i - n * cos(2 * PI * r[y]) + o * cos(4 * PI * r[y]) + l * cos(6 * PI * r[y]);
                break;
            case "nuttal":
                var i = .355768,
                    n = .487396,
                    o = .144232,
                    l = .012604;
                for (y in r) s[y] = i - n * cos(2 * PI * r[y]) + o * cos(4 * PI * r[y]) + l * cos(6 * PI * r[y]);
                break;
            case 6:
            case "gaussian":
                e[0] || (e[0] = .4);
                v = e[0];
                for (y in r) s[y] = exp((r[y] - .5) / (.5 * v) * -.5 * ((r[y] - .5) / (.5 * v)));
                break;
            case 7:
            case "kaiser":
                var c = 3;
                for (y in r) {
                    var u = PI * c * sqrt(1 - (2 * r[y] - 1) * (2 * r[y] - 1)),
                        h = PI * c;
                    s[y] = besselI0(u) / besselI0(h)
                }
                break;
            case 8:
            case "rectangle":
            case "boxcar":
            case "dirichlet":
                for (y in r) s[y] = 1;
                break;
            case "cosine":
                for (y in r) s[y] = sin(PI * r[y]);
                break;
            case 9:
            case "sinc":
            case "sync":
            case "lanczos":
                for (y in r) s[y] = sinc(2 * r[y] - 1);
                break;
            case "flattop":
                var i = 1,
                    n = 1.93,
                    o = 1.29,
                    l = .388;
                for (y in r) s[y] = i - n * cos(2 * PI * r[y]) + o * cos(4 * PI * r[y]) - l * cos(6 * PI * r[y]) + .032 * cos(8 * PI * r[y]), s[y] /= i + n + o + l + .032;
                break;
            case "tukey":
                e[0] || (e[0] = .5);
                m = 1 - (b = (A = e[0]) / 2);
                for (y in r) s[y] = 1, r[y] <= b ? s[y] = .5 * (1 + cos(PI * (2 * r[y] / A - 1))) : r[y] > m && (s[y] = .5 * (1 + cos(PI * (2 * r[y] / A - 2 / A + 1))));
                break;
            case "slidinggaussian":
                e[0] || (e[0] = .5), e[1] || (e[1] = .4);
                var f = 2 * (e[0] - .5),
                    v = 2 * e[1];
                for (var y in r) s[y] = exp(0 - sq(2 * r[y] - 1 - f) / (2 * v * v));
                break;
            case "adjustablecosine":
                e[0] || (e[0] = .5);
                var b = (A = e[0]) / 2,
                    m = 1 - b;
                for (y in r) s[y] = 1, r[y] <= A ? s[y] = .5 * (1 + cos(PI * (r[y] / A - 1))) : s[y] = .5 * (1 + cos(PI * ((r[y] - A) / (1 - A))));
                break;
            case "elliptic":
                e[0] || (e[0] = .5);
                var A = e[0],
                    _ = 0 + Number.EPSILON,
                    g = 1 - Number.EPSILON;
                A = constrain(A, _, g);
                for (y in r) s[y] = 0, r[y] <= A ? s[y] = 1 / A * sqrt(sq(A) - sq(r[y] - A)) : s[y] = 1 / (1 - A) * sqrt(sq(1 - A) - sq(r[y] - A));
                break;
            case "hyperelliptic":
                e[0] || (e[0] = .5), e[1] || (e[1] = 3);
                var A = e[0],
                    w = e[1],
                    _ = 0 + Number.EPSILON,
                    g = 1 - Number.EPSILON;
                A = constrain(A, _, g);
                for (y in r) {
                    s[y] = 0;
                    E = 2 * w;
                    r[y] <= A ? s[y] = 1 / A * pow(pow(A, E) - pow(r[y] - A, E), 1 / E) : s[y] = 1 / (1 - A) * pow(pow(1 - A, E) - pow(r[y] - A, E), 1 / E)
                }
                break;
            case "squircular":
                e[0] || (e[0] = .5), e[1] || (e[1] = 3);
                var A = e[0],
                    w = e[1],
                    _ = 0 + Number.EPSILON,
                    g = 1 - Number.EPSILON;
                A = constrain(A, _, g);
                for (y in r) {
                    s[y] = 0;
                    var E = max(2, 2 * w);
                    r[y] <= A ? s[y] = 1 - A + pow(pow(A, E) - pow(r[y] - A, E), 1 / E) : s[y] = A + pow(pow(1 - A, E) - pow(r[y] - A, E), 1 / E)
                }
                break;
            case "poisson":
                e[0] || (e[0] = .5);
                N = max(e[0], Number.EPSILON);
                for (var y in r) s[y] = exp(0 - abs(r[y] - .5) * (1 / N));
                break;
            case "hann-poisson":
            case "poisson-hann":
            case "hannpoisson":
            case "poissonhann":
                e[0] || (e[0] = .5);
                N = 25 * max(e[0] * e[0] * e[0] * e[0], Number.EPSILON);
                for (y in r) {
                    var d = .5 * (1 - cos(TWO_PI * r[y])),
                        I = exp(0 - abs(r[y] - .5) * (1 / N));
                    s[y] = d * I
                }
                break;
            case "slidinghann-poisson":
            case "slidingpoisson-hann":
            case "slidinghannpoisson":
            case "slidingpoissonhann":
                e[0] || (e[0] = .5), e[1] || (e[1] = .5);
                var N = 25 * max(e[1] * e[1] * e[1] * e[1], Number.EPSILON);
                for (y in r) {
                    var P = constrain(r[y] + (.5 - e[0]), 0, 1),
                        d = .5 * (1 - cos(TWO_PI * P)),
                        I = exp(0 - abs(P - .5) * (1 / N));
                    s[y] = d * I
                }
        }
        return a ? s : s[0]
    }, p5.Gen.prototype.waveform = function(r, t) {
        var e = !0;
        Array.isArray(r) || r.constructor === Float32Array || r.constructor === Float64Array || (r = [r], e = !1);
        var a;
        Array.isArray(r) ? a = new Array(r.length) : r.constructor === Float32Array ? a = new Float32Array(r.length) : r.constructor === Float64Array && (a = new Float64Array(r.length));
        switch (t) {
            case "sine":
            case "sin":
                a = this.harmonics(r, [1]);
                break;
            case "cosine":
            case "cos":
                a = this.triples(r, [1, 1, 90]);
                break;
            case "saw":
            case "sawtooth":
            case "sawup":
                a = this.bpf(r, [0, -1, 1, 1]);
                break;
            case "sawdown":
                a = this.bpf(r, [0, 1, 1, -1]);
                break;
            case "phasor":
                a = this.bpf(r, [0, 0, 1, 1]);
                break;
            case "square":
                a = this.bpf(r, [0, 1, 1, 1, 1, -1, 2, -1]);
                break;
            case "rect":
            case "rectangle":
                a = this.bpf(r, [0, 1, 1, 1, 1, -1, 10, -1]);
                break;
            case "pulse":
                a = this.bpf(r, [0, 1, 1, 1, 1, -1, 100, -1]);
                break;
            case "tri":
            case "triangle":
                a = this.bpf(r, [0, 0, 1, 1, 2, 0, 3, -1, 4, 0]);
                break;
            case "buzz":
                a = this.harmonics(r, [.1, .1, .1, .1, .1, .1, .1, .1, .1, .1])
        }
        return e ? a : a[0]
    }, p5.Gen.prototype.listAlgos = function() { var r = new Array; for (var t in this.__proto__) { var e = !0; "listAlgos" == t ? e = !1 : "fillArray" == t ? e = !1 : "fillFloat32Array" == t ? e = !1 : "fillFloat64Array" == t && (e = !1), e && r.push(t) } return r }, p5.Gen.prototype.fillArray = function(r, t, e, a) {
        var s = new Array(t);
        new Array(t);
        if ("random" === r)
            for (i = 0; i < t; i++) s[i] = a ? i / (t - 1) * 1e4 + a : "-1";
        else
            for (var i = 0; i < t; i++) s[i] = i / (t - 1);
        return this[r](s, e, a)
    }, p5.Gen.prototype.fillFloat32Array = function(r, t, e, a) {
        var s = new Float32Array(t);
        new Float32Array(t);
        if ("random" === r)
            for (i = 0; i < t; i++) s[i] = a ? i / (t - 1) * 1e4 + a : "-1";
        else
            for (var i = 0; i < t; i++) s[i] = i / (t - 1);
        return this[r](s, e, a)
    }, p5.Gen.prototype.fillFloat64Array = function(r, t, e, a) {
        var s = new Float64Array(t);
        new Float64Array(t);
        if ("random" === r)
            for (i = 0; i < t; i++) s[i] = a ? i / (t - 1) * 1e4 + a : "-1";
        else
            for (var i = 0; i < t; i++) s[i] = i / (t - 1);
        return this[r](s, e, a)
    }, p5.Ease = function() { this.version = .01 }, p5.Ease.prototype.linear = function(r) { return r }, p5.Ease.prototype.quadraticIn = function(r) { return r * r }, p5.Ease.prototype.quadraticOut = function(r) { return -r * (r - 2) }, p5.Ease.prototype.quadraticInOut = function(r) { return r < .5 ? 2 * r * r : -2 * r * r + 4 * r - 1 }, p5.Ease.prototype.cubicIn = function(r) { return r * r * r }, p5.Ease.prototype.cubicOut = function(r) { var t = r - 1; return t * t * t + 1 }, p5.Ease.prototype.cubicInOut = function(r) { if (r < .5) return 4 * r * r * r; var t = 2 * r - 2; return .5 * t * t * t + 1 }, p5.Ease.prototype.quarticIn = function(r) { return r * r * r * r }, p5.Ease.prototype.quarticOut = function(r) { var t = r - 1; return t * t * t * (1 - r) + 1 }, p5.Ease.prototype.quarticInOut = function(r) { if (r < .5) return 8 * r * r * r * r; var t = r - 1; return -8 * t * t * t * t + 1 }, p5.Ease.prototype.quinticIn = function(r) { return r * r * r * r * r }, p5.Ease.prototype.quinticOut = function(r) { var t = r - 1; return t * t * t * t * t + 1 }, p5.Ease.prototype.quinticInOut = function(r) { if (r < .5) return 16 * r * r * r * r * r; var t = 2 * r - 2; return .5 * t * t * t * t * t + 1 }, p5.Ease.prototype.sineIn = function(r) { return sin((r - 1) * HALF_PI) + 1 }, p5.Ease.prototype.sineOut = function(r) { return sin(r * HALF_PI) }, p5.Ease.prototype.sineInOut = function(r) { return .5 * (1 - cos(r * PI)) }, p5.Ease.prototype.circularIn = function(r) { return 1 - sqrt(1 - r * r) }, p5.Ease.prototype.circularOut = function(r) { return sqrt((2 - r) * r) }, p5.Ease.prototype.circularInOut = function(r) { return r < .5 ? .5 * (1 - sqrt(1 - r * r * 4)) : .5 * (sqrt(-(2 * r - 3) * (2 * r - 1)) + 1) }, p5.Ease.prototype.exponentialIn = function(r) { return 0 == r ? r : pow(2, 10 * (r - 1)) }, p5.Ease.prototype.exponentialOut = function(r) { return 1 == r ? r : 1 - pow(2, -10 * r) }, p5.Ease.prototype.exponentialInOut = function(r) { return 0 == r || 1 == r ? r : r < .5 ? .5 * pow(2, 20 * r - 10) : -.5 * pow(2, -20 * r + 10) + 1 }, p5.Ease.prototype.elasticIn = function(r) { return sin(13 * HALF_PI * r) * pow(2, 10 * (r - 1)) }, p5.Ease.prototype.elasticOut = function(r) { return sin(-13 * HALF_PI * (r + 1)) * pow(2, -10 * r) + 1 }, p5.Ease.prototype.elasticInOut = function(r) { return r < .5 ? .5 * sin(13 * HALF_PI * (2 * r)) * pow(2, 10 * (2 * r - 1)) : .5 * (sin(-13 * HALF_PI * (2 * r - 1 + 1)) * pow(2, -10 * (2 * r - 1)) + 2) }, p5.Ease.prototype.backIn = function(r) { return r * r * r - r * sin(r * PI) }, p5.Ease.prototype.backOut = function(r) { var t = 1 - r; return 1 - (t * t * t - t * sin(t * PI)) }, p5.Ease.prototype.backInOut = function(r) { if (r < .5) { return .5 * ((t = 2 * r) * t * t - t * sin(t * PI)) } var t = 1 - (2 * r - 1); return .5 * (1 - (t * t * t - t * sin(t * PI))) + .5 }, p5.Ease.prototype.bounceIn = function(r) { return 1 - this.bounceOut(1 - r) }, p5.Ease.prototype.bounceOut = function(r) { return r < 4 / 11 ? 121 * r * r / 16 : r < 8 / 11 ? 9.075 * r * r - 9.9 * r + 3.4 : r < .9 ? 4356 / 361 * r * r - 35442 / 1805 * r + 16061 / 1805 : 10.8 * r * r - 20.52 * r + 10.72 }, p5.Ease.prototype.bounceInOut = function(r) { return r < .5 ? .5 * this.bounceIn(2 * r) : .5 * this.bounceOut(2 * r - 1) + .5 }, p5.Ease.prototype.brycesCubic = function(r, t) { t || (t = 3); var e = pow(r, t - 1); return t * e - (t - 1) * (e * r) }, p5.Ease.prototype.staircase = function(r, t) { t || (t = 3); var e = floor(r * t) / (t - 1); return r >= 1 && (e = 1), e }, p5.Ease.prototype.exponentialSmoothedStaircase = function(r, t, e) { t || (t = .25), e || (e = 3); for (var a = sq(map(t, 0, 1, 5, 30)), s = 0, i = 0; i < e; i++) s += 1 / (e - 1) / (1 + exp(a * ((i + 1) / e - r))); return s = constrain(s, 0, 1) }, p5.Ease.prototype.gompertz = function(r, t) {
        t || (t = .25);
        var e = 0 + Number.EPSILON,
            a = 0 - 16 * (t = max(t, e)),
            s = exp(-8 * exp(a * r)),
            i = exp(-8 * exp(a)),
            n = exp(-8);
        return s = map(s, n, i, 0, 1)
    }, p5.Ease.prototype.generalizedLinearMap = function(r, t, e, a, s) { t || (t = 0), e || (e = 0), a || (a = 1), s || (s = 1); return t < a ? r <= t ? e : r >= a ? s : map(r, t, a, e, s) : r <= a ? s : r >= t ? e : map(r, a, t, s, e) }, p5.Ease.prototype.doubleOddPolynomialOgee = function(r, t, e, a) {
        t || (t = .25), e || (e = .75), a || (a = 3);
        var s = 0 + Number.EPSILON,
            i = 1 - Number.EPSILON;
        t = constrain(t, s, i), e = constrain(e, 0, 1);
        var n = 2 * a + 1;
        return r <= t ? e - e * pow(1 - r / t, n) : e + (1 - e) * pow((r - t) / (1 - t), n)
    }, p5.Ease.prototype.doubleLinear = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = 0 + Number.EPSILON,
            s = 1 - Number.EPSILON;
        return t = constrain(t, a, s), e = constrain(e, 0, 1), r <= t ? e / t * r : e + (1 - e) / (1 - t) * (r - t)
    }, p5.Ease.prototype.tripleLinear = function(r, t, e, a, s) { t || (t = .25), e || (e = .75), a || (a = .75), s || (s = .25); return t < a ? r <= t ? map(r, 0, t, 0, e) : r >= a ? map(r, a, 1, s, 1) : map(r, t, a, e, s) : r <= a ? map(r, 0, a, 0, s) : r >= t ? map(r, t, 1, e, 1) : map(r, a, t, s, e) }, p5.Ease.prototype.variableStaircase = function(r, t, e) {
        t || (t = .25), e || (e = 3);
        var a = t - .5;
        if (0 == a) return r;
        var s = floor(r * e) / e,
            i = ceil(r * e) / e,
            n = s,
            o = i,
            p = .5 * (s + i) + a / e,
            l = .5 * (s + i) - a / e;
        return r < p && r > s ? map(r, s, p, n, l) : map(r, p, i, l, o)
    }, p5.Ease.prototype.quadraticBezierStaircase = function(r, t, e) {
        t || (t = .25), e || (e = 3);
        var a = t - .5;
        if (0 == a) return r;
        var s = floor(r * e) / e,
            i = ceil(r * e) / e,
            n = s,
            o = i,
            p = .5 * (s + i) + a / e,
            l = .5 * (s + i) - a / e,
            c = (s + p) / 2,
            u = (n + l) / 2,
            h = (i + p) / 2,
            f = (o + l) / 2,
            v = 0,
            y = 1 / e * .5;
        if (r <= c && r >= s)
            if (floor(r * e) <= 0) v = map(r, s, p, n, l);
            else {
                abs(r - s), Number.EPSILON;
                var b = (n - (f - 1 / e)) / y,
                    m = (r - (h - 1 / e)) / y,
                    A = 1 - 2 * (w = (s - (h - 1 / e)) / y),
                    _ = max(0, w * w + A * m),
                    g = (E = (sqrt(_) - w) / A) * E * (1 - 2 * b) + 2 * b * E;
                g *= f - u, g += f, r > s && (g -= 1 / e), v = g
            }
        else if (r >= h && r <= i)
            if (ceil(r * e) >= e) v = map(r, p, i, l, o);
            else {
                abs(r - i), Number.EPSILON;
                var b = (o - f) / y,
                    m = (r - h) / y;
                .5 == (w = (i - h) / y) && (w += Number.EPSILON);
                A = 1 - 2 * w;
                abs(A) < Number.EPSILON && (A = (A < 0 ? -1 : 1) * Number.EPSILON);
                var _ = max(0, w * w + A * m),
                    g = (E = (sqrt(_) - w) / A) * E * (1 - 2 * b) + 2 * b * E;
                g *= f - u, v = g += f
            }
        else {
            var w = (p - c) / y,
                b = (l - u) / y,
                m = (r - c) / y;
            .5 == w && (w += Number.EPSILON);
            var A = 1 - 2 * w,
                E = (sqrt(w * w + A * m) - w) / A,
                g = E * E * (1 - 2 * b) + 2 * b * E;
            g *= f - u, v = g += u
        }
        return v
    }, p5.Ease.prototype.doubleExponentialSigmoid = function(r, t) {
        t || (t = .75);
        var e = 0 + Number.EPSILON,
            a = 1 - Number.EPSILON;
        t = 1 - (t = constrain(t, e, a));
        return r <= .5 ? pow(2 * r, 1 / t) / 2 : 1 - pow(2 * (1 - r), 1 / t) / 2
    }, p5.Ease.prototype.adjustableCenterDoubleExponentialSigmoid = function(r, t, e) {
        t || (t = .75), e || (e = .5);
        var a = 0 + Number.EPSILON,
            s = 1 - Number.EPSILON;
        t = 1 - (t = constrain(t, a, s));
        var i = max(0, min(1, r - (e - .5)));
        return i <= .5 ? pow(2 * i, 1 / t) / 2 : 1 - pow(2 * (1 - i), 1 / t) / 2
    }, p5.Ease.prototype.doubleQuadraticSigmoid = function(r) { return r <= .5 ? sq(2 * r) / 2 : 1 - sq(2 * (r - 1)) / 2 }, p5.Ease.prototype.doublePolynomialSigmoid = function(r, t) { t || (t = 3); return t % 2 == 0 ? r <= .5 ? pow(2 * r, t) / 2 : 1 - pow(2 * (r - 1), t) / 2 : r <= .5 ? pow(2 * r, t) / 2 : 1 + pow(2 * (r - 1), t) / 2 }, p5.Ease.prototype.doubleEllipticOgee = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = 0 + Number.EPSILON,
            s = 1 - Number.EPSILON;
        return r <= (t = constrain(t, a, s)) ? e / t * sqrt(sq(t) - sq(r - t)) : 1 - (1 - e) / (1 - t) * sqrt(sq(1 - t) - sq(r - t))
    }, p5.Ease.prototype.doubleCubicOgee = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = 0 + Number.EPSILON,
            s = 1 - Number.EPSILON;
        t = constrain(t, a, s), e = constrain(e, 0, 1);
        return r <= t ? e - e * pow(1 - r / t, 3) : e + (1 - e) * pow((r - t) / (1 - t), 3)
    }, p5.Ease.prototype.doubleCircularSigmoid = function(r, t) { t || (t = .25); return r <= t ? t - sqrt(t * t - r * r) : t + sqrt(sq(1 - t) - sq(r - 1)) }, p5.Ease.prototype.doubleSquircularSigmoid = function(r, t, e) { t || (t = .25), e || (e = 3); var a = max(2, 2 * e); return r <= t ? t - pow(pow(t, a) - pow(r, a), 1 / a) : t + pow(pow(1 - t, a) - pow(r - 1, a), 1 / a) }, p5.Ease.prototype.doubleQuadraticBezier = function(r, t, e, a, s) {
        t || (t = .25), e || (e = .75), a || (a = .75), s || (s = .25);
        var i = (t + a) / 2,
            n = (e + s) / 2;
        i = constrain(i, Number.EPSILON, 1 - Number.EPSILON), n = constrain(n, Number.EPSILON, 1 - Number.EPSILON);
        var o, p, l, c, u, h = 0;
        return r <= i ? (l = r / i, u = e / n, 0 == (o = 1 - 2 * (c = t / i)) && (o = Number.EPSILON), h = (p = (sqrt(c * c + o * l) - c) / o) * p * (1 - 2 * u) + 2 * u * p, h *= n) : (l = (r - i) / (1 - i), u = (s - n) / (1 - n), 0 == (o = 1 - 2 * (c = (a - i) / (1 - i))) && (o = Number.EPSILON), h = (p = (sqrt(c * c + o * l) - c) / o) * p * (1 - 2 * u) + 2 * u * p, h *= 1 - n, h += n), h
    }, p5.Ease.prototype.doubleEllipticSigmoid = function(r, t, e) { t || (t = .25), e || (e = .75); return r <= t ? t <= 0 ? 0 : e * (1 - sqrt(sq(t) - sq(r)) / t) : t >= 1 ? 1 : e + (1 - e) / (1 - t) * sqrt(sq(1 - t) - sq(r - 1)) }, p5.Ease.prototype.doubleCubicOgeeSimplified = function(r, t, e) {
        t || (t = .25), e || (e = .75), e = 1 - e;
        var a = 0;
        if (r <= t)
            if (t <= 0) a = 0;
            else { a = e * r + (1 - e) * t * (1 - (s = 1 - r / t) * s * s) }
        else if (t >= 1) a = 1;
        else {
            var s = (r - t) / (1 - t);
            a = e * r + (1 - e) * (t + (1 - t) * s * s * s)
        }
        return a
    }, p5.Ease.prototype.raisedInvertedCosine = function(r) { return (1 - cos(PI * r)) / 2 }, p5.Ease.prototype.cosineApproximation = function(r) {
        var t = r * r,
            e = t * t;
        return 4 / 9 * (e * t) - 17 / 9 * e + 22 / 9 * t
    }, p5.Ease.prototype.smoothStep = function(r) { return r * r * (3 - 2 * r) }, p5.Ease.prototype.smootherStep = function(r) { return r * r * r * (r * (6 * r - 15) + 10) }, p5.Ease.prototype.maclaurinCosine = function(r) { for (var t = 1, e = (r *= PI) * r, a = 1, s = 1, i = t, n = 0; n < 6; n++) s *= 2 * n + 1, i += (a = 0 - a) * ((t *= e) / (s *= 2 * n + 2)); return i = (1 - i) / 2 }, p5.Ease.prototype.catmullRomInterpolate = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = r * r,
            s = (-.5 * t + .5 * e - 1.5) * r * a + (t - .5 * e + 2) * a + (-.5 * t + .5) * r;
        return constrain(s, 0, 1)
    }, p5.Ease.prototype.hermite = function(r, t, e, a, s) {
        t || (t = .25), e || (e = 0), a || (a = 1), s || (s = .25), t = map(t, 0, 1, -1, 1);
        var i = .5 * ((a = map(a, 0, 1, -1, 1)) - t),
            n = e - a,
            o = i + n,
            p = o + n + .5 * (s - e);
        return ((p * r - (o + p)) * r + i) * r + e
    }, p5.Ease.prototype.hermite2 = function(r, t, e, a, s) {
        t || (t = .25), e || (e = .75), a || (a = .75), s || (s = .25);
        var i, n, o = map(a, 0, 1, -1, 1),
            p = map(s, 0, 1, -1, 1),
            l = r * r,
            c = l * r;
        i = (0 - 2 * (t - .5)) * (1 + p) * (1 - o) / 2, n = 1 * (1 + p) * (1 - o) / 2;
        return 0 * (2 * c - 3 * l + 1) + (c - 2 * l + r) * (i += 1 * (1 - p) * (1 - o) / 2) + (c - l) * (n += (e - 1) * (1 - p) * (1 - o) / 2) + 1 * (-2 * c + 3 * l)
    }, p5.Ease.prototype.normalizedErf = function(r) {
        var t = map(r, 0, 1, -2, 2),
            e = t * t,
            a = 8 * (PI - 3) / (3 * PI * (4 - PI)),
            s = sqrt(1 - exp(0 - e * ((a * e + 4 / PI) / (a * e + 1))));
        return t < 0 && (s = 0 - s), s /= .99532226501, s = (s + 1) / 2
    }, p5.Ease.prototype.normalizedInverseErf = function(r) {
        var t = map(r, 0, 1, -.99532226501, .99532226501),
            e = t * t,
            a = 8 * (PI - 3) / (3 * PI * (4 - PI)),
            s = 2 / (PI * a) + log(1 - e) / 2,
            i = log(1 - e) / a,
            n = sqrt(sqrt(s * s - i) - s);
        return t < 0 && (n = 0 - n), n /= 2, n += 1, n /= 2, n = constrain(n, 0, 1)
    }, p5.Ease.prototype.exponentialEmphasis = function(r, t) {
        t || (t = .25);
        var e = 0 + Number.EPSILON,
            a = 1 - Number.EPSILON;
        if ((t = constrain(t, e, a)) < .5) { t *= 2; return s = pow(r, t) }
        t = 2 * (t - .5);
        var s = pow(r, 1 / (1 - t));
        return s
    }, p5.Ease.prototype.iterativeSquareRoot = function(r) { for (var t = .5, e = 0; e < 6; e++) t = (t + r / t) / 2; return t }, p5.Ease.prototype.fastSquareRoot = function(r) {
        var t = .5 * r,
            e = f2ib(r);
        return e = 1597463007 - (e >> 1), r = ib2f(e), 1 / (r *= 1.5 - t * r * r)
    }, p5.Ease.prototype.doubleExponentialOgee = function(r, t) {
        t || (t = .25);
        var e = 0 + Number.EPSILON,
            a = 1 - Number.EPSILON;
        t = constrain(t, e, a);
        return r <= .5 ? pow(2 * r, 1 - t) / 2 : 1 - pow(2 * (1 - r), 1 - t) / 2
    }, p5.Ease.prototype.circularFillet = function(r, t, e, a) {
        function s(r, t, e, a, s) {
            var i = 0,
                n = sqrt(r * r + t * t);
            return 0 != n && (i = (r * a + t * s + e) / n), i
        }
        t || (t = .25), e || (e = .75), a || (a = .75);
        var i = 0,
            n = 0,
            o = 0,
            p = 0,
            l = 0,
            c = 0,
            u = 0,
            h = 0,
            f = 0,
            v = 0 + Number.EPSILON,
            y = 1 - Number.EPSILON,
            b = 0 + Number.EPSILON,
            m = 1 - Number.EPSILON,
            A = t = constrain(t, v, y),
            _ = e = constrain(e, b, m),
            g = a,
            w = 0 * A - 0 * _,
            E = _ - 0,
            d = 0 - A,
            I = 1 * e - 1 * t,
            N = 1 - e,
            P = t - 1;
        if (E * P != N * d) {
            var S, F, O, L;
            if (O = (t + 1) / 2, L = (e + 1) / 2, 0 != (S = s(E, d, w, O, L)) && (O = (0 + A) / 2, L = (0 + _) / 2, 0 != (F = s(N, P, I, O, L)))) {
                var q, k, x, z = g;
                S <= 0 && (z = -z), q = w - z * sqrt(E * E + d * d), z = g, F <= 0 && (z = -z);
                var T, j, G = ((k = I - z * sqrt(N * N + P * P)) * d - q * P) / (x = E * P - N * d),
                    B = (q * N - k * E) / x,
                    X = 0,
                    R = 0,
                    Q = 0,
                    C = 0;
                0 != (T = E * E + d * d) && (X = (-E * w - d * (j = E * B - d * G)) / T, R = (E * j - d * w) / T), 0 != (T = N * N + P * P) && (Q = (-N * I - P * (j = N * B - P * G)) / T, C = (N * j - P * I) / T);
                var Y = X - G,
                    H = R - B,
                    W = Q - G,
                    M = C - B,
                    D = atan2(H, Y),
                    U = 0,
                    J = sqrt((Y * Y + H * H) * (W * W + M * M));
                0 != J && (U = acos((Y * W + H * M) / J));
                var K = Y * M - W * H;
                K < 0 && (D -= U);
                var V = D,
                    Z = D + U;
                K < 0 && (V = D + U, Z = D), h = B, i = V, n = Z, o = (u = G) + (f = g) * cos(i), p = h + f * sin(i), l = u + f * cos(n), c = h + f * sin(n)
            }
        }
        var $ = 0;
        return (r = constrain(r, 0, 1)) <= o ? o < Math.EPSILON ? _y = 0 : ($ = r / o, _y = $ * p) : r >= l ? ($ = (r - l) / (1 - l), _y = c + $ * (1 - c)) : _y = r >= u ? h - sqrt(sq(f) - sq(r - u)) : h + sqrt(sq(f) - sq(r - u)), _y
    }, p5.Ease.prototype.circularArcThroughAPoint = function(r, t, e) {
        function a(r, t, e, a, s, i) {
            var n = a - t,
                o = e - r,
                p = i - a,
                l = s - e;
            return !(abs(o) <= Number.EPSILON && abs(p) <= Number.EPSILON) && (abs(n) <= Number.EPSILON || (abs(p) <= Number.EPSILON || (abs(o) <= Number.EPSILON || abs(l) <= Number.EPSILON)))
        }

        function s(r, t, e, a, s, i, n) {
            var o = a - t,
                p = e - r,
                l = i - a,
                c = s - e;
            if (abs(p) <= Number.EPSILON && abs(l) <= Number.EPSILON) return n.centerX = .5 * (e + s), n.centerY = .5 * (t + a), void(n.dRadius = sqrt(sq(n.centerX - r) + sq(n.centerY - t)));
            var u = o / p,
                h = l / c;
            abs(u - h) <= Number.EPSILON || (n.centerX = (u * h * (t - i) + h * (r + e) - u * (e + s)) / (2 * (h - u)), n.centerY = -1 * (n.centerX - (r + e) / 2) / u + (t + a) / 2, n.dRadius = sqrt(sq(n.centerX - r) + sq(n.centerY - t)))
        }
        t || (t = .25), e || (e = .75);
        var i = {};
        i.centerX = 0, i.centerY = 0, i.dRadius = 0;
        var n = 0 + Number.EPSILON,
            o = 1 - Number.EPSILON,
            p = 0 + Number.EPSILON,
            l = 1 - Number.EPSILON;
        t = constrain(t, n, o), e = constrain(e, p, l), r = constrain(r, 0 + Number.EPSILON, 1 - Number.EPSILON);
        var c = t,
            u = e;
        if (a(0, 0, c, u, 1, 1))
            if (a(0, 0, 1, 1, c, u))
                if (a(c, u, 0, 0, 1, 1))
                    if (a(c, u, 1, 1, 0, 0))
                        if (a(1, 1, c, u, 0, 0)) {
                            if (a(1, 1, 0, 0, c, u)) return 0;
                            s(1, 1, 0, 0, c, u, i)
                        } else s(1, 1, c, u, 0, 0, i);
        else s(c, u, 1, 1, 0, 0, i);
        else s(c, u, 0, 0, 1, 1, i);
        else s(0, 0, 1, 1, c, u, i);
        else s(0, 0, c, u, 1, 1, i);
        i.centerX > 0 && i.centerX < 1 && (t < i.centerX ? (i.centerX = 1, i.centerY = 0, i.dRadius = 1) : (i.centerX = 0, i.centerY = 1, i.dRadius = 1));
        return r >= i.centerX ? i.centerY - sqrt(sq(i.dRadius) - sq(r - i.centerX)) : i.centerY + sqrt(sq(i.dRadius) - sq(r - i.centerX))
    }, p5.Ease.prototype.quadraticBezier = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        t = constrain(t, 0, 1), e = constrain(e, 0, 1), .5 == t && (t += Number.EPSILON);
        var a = 1 - 2 * t,
            s = (sqrt(t * t + a * r) - t) / a;
        return s * s * (1 - 2 * e) + 2 * e * s
    }, p5.Ease.prototype.cubicBezier = function(r, t, e, a, s) {
        t || (t = .25), e || (e = .75), a || (a = .75), s || (s = .25);
        var i = 0 + Number.EPSILON,
            n = 1 - Number.EPSILON,
            o = 0 + Number.EPSILON,
            p = 1 - Number.EPSILON;
        t = constrain(t, i, n), e = constrain(e, 0, 1), a = constrain(a, o, p);
        s = constrain(s, 0, 1);
        for (var l = 1 - 3 * a + 3 * t - 0, c = 3 * a - 6 * t + 0, u = 3 * t - 0, h = 1 - 3 * s + 3 * e - 0, f = 3 * s - 6 * e + 0, v = 3 * e - 0, y = r, b = 0; b < 5; b++) { y -= (l * (y * y * y) + c * (y * y) + u * y + 0 - r) * (1 / (3 * l * y * y + 2 * c * y + u)), y = constrain(y, 0, 1) }
        return h * (y * y * y) + f * (y * y) + v * y + 0
    }, p5.Ease.prototype.parabolaThroughAPoint = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = 0 + Number.EPSILON,
            s = 1 - Number.EPSILON;
        t = constrain(t, a, s);
        var i = (1 - (e = constrain(e, 0, 1))) / (1 - t) - e / t,
            n = i * (r * r) - (i * (t * t) - e) / t * r;
        return n = constrain(n, 0, 1)
    }, p5.Ease.prototype.dampedSinusoid = function(r, t) {
        t || (t = .25);
        var e = 100 * t,
            a = r;
        return pow(2.718281828459045, -6.90775527 * a) * cos(e * a + 0)
    }, p5.Ease.prototype.dampedSinusoidReverse = function(r, t) {
        t || (t = .25);
        var e = 100 * t,
            a = 1 - r;
        return pow(2.718281828459045, -6.90775527 * a) * cos(e * a + 0)
    }, p5.Ease.prototype.cubicBezierThrough2Points = function(r, t, e, a, s) {
        t || (t = .25), e || (e = .75), a || (a = .75), s || (s = .25);
        var i, n, o, p, l = 0,
            c = 0 + Number.EPSILON,
            u = 1 - Number.EPSILON,
            h = 0 + Number.EPSILON,
            f = 1 - Number.EPSILON,
            v = 3 * .3 * .7 * .7,
            y = 3 * .3 * .3 * .7,
            b = .63 * (1 - .7),
            m = (t = constrain(t, c, u)) - 0 - .027,
            A = (e = constrain(e, h, f)) - 0 - .027;
        return o = (m - (a - 0 - .7 * .7 * .7 * 1) * v / b) / -.8399999999999997, p = (A - (s - 0 - .7 * .7 * .7 * 1) * v / b) / -.8399999999999997, i = (m - o * y) / v, n = (A - p * y) / v, i = constrain(i, 0 + Number.EPSILON, 1 - Number.EPSILON), o = constrain(o, 0 + Number.EPSILON, 1 - Number.EPSILON), l = this.cubicBezier(r, i, n, o, p), l = constrain(l, 0, 1)
    }, p5.Ease.prototype.doubleCircularOgee = function(r, t) { t || (t = .25); return r <= (t = constrain(t, 0, 1)) ? sqrt(sq(t) - sq(r - t)) : 1 - sqrt(sq(1 - t) - sq(r - t)) }, p5.Ease.prototype.doubleSquircularOgee = function(r, t, e) { t || (t = .25), e || (e = 3); var a = 2 * e; return r <= (t = constrain(t, 0, 1)) ? pow(pow(t, a) - pow(r - t, a), 1 / a) : 1 - pow(pow(1 - t, a) - pow(r - t, a), 1 / a) }, p5.Ease.prototype.generalSigmoidLogitCombo = function(r, t, e) {
        t || (t = .25), e || (e = .75);
        var a = 0;
        if (t < .5) { a = e - .5 + this.normalizedLogit(r, 1 - 2 * t) } else {
            var s = e - .5;
            a = this.normalizedLogitSigmoid(r + s, 2 * (t - .5))
        }
        return a = constrain(a, 0, 1)
    }, p5.Ease.prototype.normalizedLogitSigmoid = function(r, t) {
        t || (t = .25);
        var e = 0 + Number.EPSILON,
            a = 1 - Number.EPSILON;
        t = 1 / (1 - (t = constrain(t, e, a))) - 1, t *= 5;
        var s = 1 / (1 + exp(0 - (r - .5) * t)),
            i = 1 / (1 + exp(.5 * t)),
            n = 1 / (1 + exp(-.5 * t));
        return s = map(s, i, n, 0, 1)
    }, p5.Ease.prototype.normalizedLogit = function(r, t) {
        t || (t = .25);
        var e = 0 + Number.EPSILON,
            a = 1 - Number.EPSILON;
        t = 1 / (1 - (t = constrain(t, e, a))) - 1, t *= 5;
        var s = 1 / (1 + exp(.5 * t)),
            i = 1 / (1 + exp(-.5 * t));
        r = map(r, 0, 1, s, i);
        var n = log(r / (1 - r));
        return n *= 1 / t, n += .5, n = constrain(n, 0, 1)
    }, p5.Ease.prototype.generalizedQuartic = function(r, t, e) { t || (t = .25), e || (e = .75); var a = r * r * (1 - 2 * (t = 1 - (t = constrain(t, 0, 1)))) + 2 * t * r; return a * a * (1 - 2 * (e = constrain(e, 0, 1))) + 2 * e * a }, p5.Ease.prototype.boxcar = function(r) { return r >= .5 }, p5.Ease.prototype.listAlgos = function() { var r = new Array; for (var t in this.__proto__) { var e = !0; "listAlgos" == t ? e = !1 : "fillArray" == t ? e = !1 : "fillFloat32Array" == t ? e = !1 : "fillFloat64Array" == t && (e = !1), e && r.push(t) } return r }, p5.Ease.prototype.fillArray = function(r, t, e) {
        for (var a = new Array(t), s = 0; s < t; s++) {
            var i = s / (t - 1);
            a[s] = this[r](i, e)
        }
        return a
    }, p5.Ease.prototype.fillFloat32Array = function(r, t, e) {
        for (var a = new Float32Array(t), s = 0; s < t; s++) {
            var i = s / (t - 1);
            a[s] = this[r](i, e)
        }
        return a
    }, p5.Ease.prototype.fillFloat64Array = function(r, t, e) {
        for (var a = new Float64Array(t), s = 0; s < t; s++) {
            var i = s / (t - 1);
            a[s] = this[r](i, e)
        }
        return a
    }, p5.ArrayEval = function() { this.version = .01 }, p5.ArrayEval.prototype.eval = function(_evalstr, _l1) {
        this.l1 = _l1;
        var multi = 0,
            e;
        Array.isArray(_evalstr) && (multi = 1);
        var _dest;
        if (_dest = multi ? createArray(_l1, _evalstr.length) : createArray(_l1), multi)
            for (e in _evalstr) _evalstr[e] = _evalstr[e].replace(/cu/g, "i"), _evalstr[e] = _evalstr[e].replace(/du/g, "l1"), _evalstr[e] = _evalstr[e].replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/u/g, "(i/(l1-1))");
        else _evalstr = _evalstr.replace(/cu/g, "i"), _evalstr = _evalstr.replace(/du/g, "l1"), _evalstr = _evalstr.replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr = _evalstr.replace(/u/g, "(i/(l1-1))");
        for (var i = 0; i < this.l1; i++)
            if (multi)
                for (e = 0; e < _evalstr.length; e++) _dest[i][e] = eval("with(this) { " + _evalstr[e] + " }");
            else _dest[i] = eval("with(this) { " + _evalstr + " }");
        return _dest
    }, p5.ArrayEval.prototype.eval1d = function(r, t) { return this.eval(r, t) }, p5.ArrayEval.prototype.eval2d = function(_evalstr, _l1, _l2) {
        this.l1 = _l1, this.l2 = _l2;
        var multi = 0,
            e;
        Array.isArray(_evalstr) && (multi = 1);
        var _dest;
        if (_dest = multi ? createArray(_l1, _l2, _evalstr.length) : createArray(_l1, _l2), multi)
            for (e in _evalstr) _evalstr[e] = _evalstr[e].replace(/cu/g, "i"), _evalstr[e] = _evalstr[e].replace(/du/g, "l1"), _evalstr[e] = _evalstr[e].replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/u/g, "(i/(l1-1))"), _evalstr[e] = _evalstr[e].replace(/cv/g, "j"), _evalstr[e] = _evalstr[e].replace(/dv/g, "l2"), _evalstr[e] = _evalstr[e].replace(/sv/g, "(j/(l2-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/v/g, "(j/(l2-1))");
        else _evalstr = _evalstr.replace(/cu/g, "i"), _evalstr = _evalstr.replace(/du/g, "l1"), _evalstr = _evalstr.replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr = _evalstr.replace(/u/g, "(i/(l1-1))"), _evalstr = _evalstr.replace(/cv/g, "j"), _evalstr = _evalstr.replace(/dv/g, "l2"), _evalstr = _evalstr.replace(/sv/g, "(j/(l2-1)*2.-1.)"), _evalstr = _evalstr.replace(/v/g, "(j/(l2-1))");
        for (var i = 0; i < this.l1; i++)
            for (var j = 0; j < this.l2; j++)
                if (multi)
                    for (e = 0; e < _evalstr.length; e++) _dest[i][j][e] = eval("with(this) { " + _evalstr[e] + " }");
                else _dest[i][j] = eval("with(this) { " + _evalstr + " }");
        return _dest
    }, p5.ArrayEval.prototype.eval3d = function(_evalstr, _l1, _l2, _l3) {
        this.l1 = _l1, this.l2 = _l2, this.l3 = _l3;
        var multi = 0,
            e;
        Array.isArray(_evalstr) && (multi = 1);
        var _dest;
        if (_dest = multi ? createArray(_l1, _l2, _l3, _evalstr.length) : createArray(_l1, _l2, _l3), multi)
            for (e in _evalstr) _evalstr[e] = _evalstr[e].replace(/cu/g, "i"), _evalstr[e] = _evalstr[e].replace(/du/g, "l1"), _evalstr[e] = _evalstr[e].replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/u/g, "(i/(l1-1))"), _evalstr[e] = _evalstr[e].replace(/cv/g, "j"), _evalstr[e] = _evalstr[e].replace(/dv/g, "l2"), _evalstr[e] = _evalstr[e].replace(/sv/g, "(j/(l2-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/v/g, "(j/(l2-1))"), _evalstr[e] = _evalstr[e].replace(/cw/g, "k"), _evalstr[e] = _evalstr[e].replace(/dw/g, "l3"), _evalstr[e] = _evalstr[e].replace(/sw/g, "(k/(l3-1)*2.-1.)"), _evalstr[e] = _evalstr[e].replace(/w/g, "(k/(l3-1))");
        else _evalstr = _evalstr.replace(/cu/g, "i"), _evalstr = _evalstr.replace(/du/g, "l1"), _evalstr = _evalstr.replace(/su/g, "(i/(l1-1)*2.-1.)"), _evalstr = _evalstr.replace(/u/g, "(i/(l1-1))"), _evalstr = _evalstr.replace(/cv/g, "j"), _evalstr = _evalstr.replace(/dv/g, "l2"), _evalstr = _evalstr.replace(/sv/g, "(j/(l2-1)*2.-1.)"), _evalstr = _evalstr.replace(/v/g, "(j/(l2-1))"), _evalstr = _evalstr.replace(/cw/g, "k"), _evalstr = _evalstr.replace(/dw/g, "l3"), _evalstr = _evalstr.replace(/sw/g, "(k/(l3-1)*2.-1.)"), _evalstr = _evalstr.replace(/w/g, "(k/(l3-1))");
        for (var i = 0; i < this.l1; i++)
            for (var j = 0; j < this.l2; j++)
                for (var k = 0; k < this.l3; k++)
                    if (multi)
                        for (e = 0; e < _evalstr.length; e++) _dest[i][j][k][e] = eval("with(this) { " + _evalstr[e] + " }");
                    else _dest[i][j][k] = eval("with(this) { " + _evalstr + " }");
        return _dest
    }, p5.Filt = function(r) {
        r || (r = 60), this.version = .01;
        this.a0 = 1, this.b0 = 1, this.a1 = 0, this.b1 = 0, this.a2 = 0, this.b2 = 0, this.xn = 0, this.yn = 0, this.xpn = 0, this.ypn = 0, this.xppn = 0, this.yppn = 0, this.fs = r, this.type = "LPF", this.f0 = this.fs / 4, this.dB = 0, this.Q = 1, this.A, this.w0, this.cw0, this.sw0, this.alpha, this.soff, this.precalc()
    }, p5.Filt.prototype.set = function(r, t, e, a) { r && (this.type = r), t && (this.f0 = t), e && (this.Q = e), a && (this.dB = a), this.precalc() }, p5.Filt.prototype.setFs = function(r) { r && (this.fs = r), this.precalc() }, p5.Filt.prototype.setType = function(r) { r && (this.type = r), this.precalc() }, p5.Filt.prototype.setFreq = function(r) { r && (this.f0 = r), this.precalc() }, p5.Filt.prototype.setQ = function(r) { r && (this.Q = r), this.precalc() }, p5.Filt.prototype.setGain = function(r) { r && (this.dB = r), this.precalc() }, p5.Filt.prototype.setBW = function(r) { r && (this.Q = this.f0 / r), this.precalc() }, p5.Filt.prototype.process = function(r) {
        var t;
        Array.isArray(r) && (t = new Array(r.length)), r.constructor == Float32Array && (t = new Float32Array(r.length)), r.constructor == Float64Array && (t = new Float64Array(r.length));
        for (var e in r) t[e] = this.tick(r[e]);
        return t
    }, p5.Filt.prototype.tick = function(r) { return this.xn = r, this.yn = this.b0 / this.a0 * this.xn + this.b1 / this.a0 * this.xpn + this.b2 / this.a0 * this.xppn - this.a1 / this.a0 * this.ypn - this.a2 / this.a0 * this.yppn, this.xppn = this.xpn, this.xpn = this.xn, this.yppn = this.ypn, this.ypn = this.yn, this.yn }, p5.Filt.prototype.clear = function() { this.xn = 0, this.yn = 0, this.xpn = 0, this.ypn = 0, this.xppn = 0, this.yppn = 0 }, p5.Filt.prototype.coeffs = function(r, t, e, a, s, i) { 6 != arguments.length ? (console.log("p5.Filt needs six coefficients for raw biquad:"), console.log("     a0 -> denominator gain for filter (y[n] term)."), console.log("     b0 -> gain for current input (x[n] term)."), console.log("     b1 -> gain for previous input (x[n-1] term)."), console.log("     b2 -> gain for previous previous input (x[n-2] term)."), console.log("     a1 -> gain for previous output (y[n-1] term)."), console.log("     a2 -> gain for previous previous output (y[n-2] term)."), console.log("when working with 5-coefficient biquad formulae set a0 to 1.0."), console.log("n.b. some systems will refer to y terms as 'b' and x terms as 'a'.")) : (this.a0 = r, this.b0 = t, this.b1 = e, this.b2 = a, this.a1 = s, this.a2 = i) }, p5.Filt.prototype.precalc = function() {
        switch (this.A = sqrt(pow(10, this.dB / 20)), this.w0 = 2 * PI * this.f0 / this.fs, this.cw0 = cos(this.w0), this.sw0 = sin(this.w0), this.alpha = sin(this.w0) / (2 * this.Q), this.soff = 2 * sqrt(this.A) * this.alpha, this.type) {
            case "LPF":
            case "lowpass":
                this.b0 = (1 - this.cw0) / 2, this.b1 = 1 - this.cw0, this.b2 = (1 - this.cw0) / 2, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "HPF":
            case "highpass":
                this.b0 = (1 + this.cw0) / 2, this.b1 = -(1 + this.cw0), this.b2 = (1 + this.cw0) / 2, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "BPF":
            case "bandpass":
                this.b0 = this.sw0 / 2, this.b1 = 0, this.b2 = -this.sw0 / 2, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "BPF0":
            case "resonant":
                this.b0 = this.alpha, this.b1 = 0, this.b2 = -this.alpha, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "notch":
            case "bandreject":
            case "bandstop":
                this.b0 = 1, this.b1 = -2 * this.cw0, this.b2 = 1, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "APF":
            case "allpass":
                this.b0 = 1 - this.alpha, this.b1 = -2 * this.cw0, this.b2 = 1 + this.alpha, this.a0 = 1 + this.alpha, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha;
                break;
            case "peakingEQ":
            case "peaknotch":
                this.b0 = 1 + this.alpha * this.A, this.b1 = -2 * this.cw0, this.b2 = 1 - this.alpha * this.A, this.a0 = 1 + this.alpha / this.A, this.a1 = -2 * this.cw0, this.a2 = 1 - this.alpha / this.A;
                break;
            case "lowShelf":
            case "lowshelf":
                this.b0 = this.A * (this.A + 1 - (this.A - 1) * this.cw0 + this.soff), this.b1 = 2 * this.A * (this.A - 1 - (this.A + 1) * this.cw0), this.b2 = this.A * (this.A + 1 - (this.A - 1) * this.cw0 - this.soff), this.a0 = this.A + 1 + (this.A - 1) * this.cw0 + this.soff, this.a1 = -2 * (this.A - 1 + (this.A + 1) * this.cw0), this.a2 = this.A + 1 + (this.A - 1) * this.cw0 - this.soff;
                break;
            case "highShelf":
            case "highshelf":
                this.b0 = this.A * (this.A + 1 + (this.A - 1) * this.cw0 + this.soff), this.b1 = -2 * this.A * (this.A - 1 + (this.A + 1) * this.cw0), this.b2 = this.A * (this.A + 1 + (this.A - 1) * this.cw0 - this.soff), this.a0 = this.A + 1 - (this.A - 1) * this.cw0 + this.soff, this.a1 = 2 * (this.A - 1 - (this.A + 1) * this.cw0), this.a2 = this.A + 1 - (this.A - 1) * this.cw0 - this.soff;
                break;
            default:
                this.b0 = 1, this.b1 = 0, this.b2 = 0, this.a0 = 1, this.a1 = 0, this.a2 = 0
        }
    }, p5.FastFourierTransform = function(r, t) {
        this.bufferSize = r || 512, this.sampleRate = t || 60, this.bandwidth = 2 / this.bufferSize * this.sampleRate / 2, this.spectrum = new Float64Array(this.bufferSize / 2), this.phase = new Float64Array(this.bufferSize / 2), this.real = new Float64Array(this.bufferSize), this.imag = new Float64Array(this.bufferSize), this.peakBand = 0, this.peak = 0, this.reverseTable = new Uint32Array(this.bufferSize);
        for (var e, a = 1, s = this.bufferSize >> 1; a < this.bufferSize;) {
            for (e = 0; e < a; e++) this.reverseTable[e + a] = this.reverseTable[e] + s;
            a <<= 1, s >>= 1
        }
        for (this.sinTable = new Float64Array(this.bufferSize), this.cosTable = new Float64Array(this.bufferSize), e = 0; e < this.bufferSize; e++) this.sinTable[e] = sin(-PI / e), this.cosTable[e] = cos(-PI / e)
    }, p5.FastFourierTransform.prototype.getBandFrequency = function(r) { return this.bandwidth * r + this.bandwidth / 2 }, p5.FastFourierTransform.prototype.calculateSpectrum = function() {
        var r, t, e, a, s = 2 / this.bufferSize;
        this.peakBand = 0, this.peak = 0;
        for (var i = 0, n = this.bufferSize / 2; i < n; i++) r = this.real[i], t = this.imag[i], e = s * sqrt(r * r + t * t), a = atan2(t / r), e > this.peak && (this.peakBand = i, this.peak = e), this.spectrum[i] = e, this.phase[i] = a
    }, p5.FastFourierTransform.prototype.forward = function(r) {
        var t = floor(log(this.bufferSize) / Math.LN2);
        if (pow(2, t) !== this.bufferSize) throw "buffer size must be a power of 2.";
        if (this.bufferSize !== r.length) throw "buffer is not the same size as defined FFT. FFT: " + bufferSize + " buffer: " + buffer.length;
        var e, a, s, i, n, o, p, l, c, u = 1;
        for (l = 0; l < this.bufferSize; l++) this.real[l] = r[this.reverseTable[l]], this.imag[l] = 0;
        for (; u < this.bufferSize;) {
            e = this.cosTable[u], a = this.sinTable[u], s = 1, i = 0;
            for (var h = 0; h < u; h++) {
                for (l = h; l < this.bufferSize;) c = l + u, n = s * this.real[c] - i * this.imag[c], o = s * this.imag[c] + i * this.real[c], this.real[c] = this.real[l] - n, this.imag[c] = this.imag[l] - o, this.real[l] += n, this.imag[l] += o, l += u << 1;
                s = (p = s) * e - i * a, i = p * a + i * e
            }
            u <<= 1
        }
        this.calculateSpectrum()
    }, p5.FastFourierTransform.prototype.inverse = function(r, t) {
        r = r || this.real, t = t || this.imag;
        var e, a, s, i, n, o, p, l, c, u = 1;
        for (c = 0; c < this.bufferSize; c++) t[c] *= -1;
        var h = new Float64Array(this.bufferSize),
            f = new Float64Array(this.bufferSize);
        for (c = 0; c < r.length; c++) h[c] = r[this.reverseTable[c]], f[c] = t[this.reverseTable[c]];
        for (r = h, t = f; u < this.bufferSize;) {
            e = this.cosTable[u], a = this.sinTable[u], s = 1, i = 0;
            for (var v = 0; v < u; v++) {
                for (c = v; c < this.bufferSize;) o = s * r[n = c + u] - i * t[n], p = s * t[n] + i * r[n], r[n] = r[c] - o, t[n] = t[c] - p, r[c] += o, t[c] += p, c += u << 1;
                s = (l = s) * e - i * a, i = l * a + i * e
            }
            u <<= 1
        }
        var y = new Float64Array(this.bufferSize);
        for (c = 0; c < this.bufferSize; c++) y[c] = r[c] / this.bufferSize;
        return y
    }, p5.prototype.imap = function(r, t, e, a, s) { return constrain(floor(map(r, t, e, a, s)), min(a, s), max(a, s) - 1) }, p5.prototype.wrap = function(r, t, e) {
        _a = min(t, e), _b = max(t, e);
        var a, s = _b - _a;
        if (r < _b && r >= _a) return r;
        if (_a == _b) return _a;
        if (r < _a)
            for (a = r; a < _a;) a += s;
        else a = (r - _a) % s + _a;
        return a
    }, p5.prototype.fold = function(r, t, e) {
        _a = min(t, e), _b = max(t, e);
        var a, s = _b - _a;
        if (r < _b && r >= _a) return r;
        if (_a == _b) return _a;
        if (r < _a) {
            i = _a - r;
            (n = floor(i / s)) % 2 == 0 ? a = (i -= n * s) + _a : (i -= n * s, a = _b - i)
        } else {
            var i = r - _b,
                n = floor(i / s);
            n % 2 == 0 ? (i -= n * s, a = _b - i) : a = (i -= n * s) + _a
        }
        return a
    }, p5.prototype.pickrand = function(r) { return r[floor(random(r.length))] }, p5.prototype.createArray = function(r) {
        var t = new Array(r || 0).fill(0),
            e = r;
        if (arguments.length > 1)
            for (var a = Array.prototype.slice.call(arguments, 1); e--;) t[r - 1 - e] = this.createArray.apply(this, a);
        return t
    }, p5.prototype.normalizeArray = function(r) { var t = max(max(r), abs(min(r))); return r.map(function(r) { return r / t }) }, p5.prototype.resizeArray = function(r, t) {
        for (var e = [], a = 0; a < t; a++) {
            var s = map(a, 0, t - 1, 0, r.length - 1),
                i = floor(s),
                n = ceil(s),
                o = s % 1;
            e[a] = lerp(r[i], r[n], o)
        }
        return e
    }, p5.prototype.multiplyArray = function(r, t) {
        Array.isArray(t) || (t = [t]);
        var e = [];
        r.length != t.length && (t = resizeArray(t, r.length));
        for (var a = 0; a < r.length; a++) e[a] = r[a] * t[a];
        return e
    }, p5.prototype.addArray = function(r, t) {
        Array.isArray(t) || (t = [t]);
        var e = [];
        r.length != t.length && (t = resizeArray(t, r.length));
        for (var a = 0; a < r.length; a++) e[a] = r[a] + t[a];
        return e
    }, p5.prototype.sumArray = function(r) { return r.reduce(function(r, t) { return r + t }) }, p5.prototype.f2ib = function(r) {
        var t = new Int8Array(4),
            e = new Int32Array(t.buffer, 0, 1);
        return new Float32Array(t.buffer, 0, 1)[0] = r, e[0]
    }, p5.prototype.ib2f = function(r) {
        var t = new Int8Array(4),
            e = new Int32Array(t.buffer, 0, 1),
            a = new Float32Array(t.buffer, 0, 1);
        return e[0] = r, a[0]
    }, p5.prototype.sinc = function(r) { return sin(PI * r) / (PI * r) }, p5.prototype.besselI0 = function(r) { var t, e, a; return 0 == r ? 1 : (e = (a = r * r) * (a * (a * (a * (a * (a * (a * (a * (a * (a * (a * (a * (a * (2.10580722890567e-23 * a + 3.80715242345326e-20) + 4.794402575483e-17) + 4.35125971262668e-14) + 3.0093112711296e-11) + 1.60224679395361e-8) + 654858370096785e-20) + .00202591084143397) + .463076284721) + 75.4337328948189) + 8307.92541809429) + 571661.130563785) + 21641557.2361227) + 356644482.244025) + 1440482982.27235, t = a * (a * (a - 3076.46912682801) + 3476263.32405882) - 1440482982.27235, -e / t) }, p5.prototype.fplot = function(r, t) {
        var e;
        Array.isArray(r) || (e = [r]), Array.isArray(r) && (e = r), r.constructor == Float32Array && (e = Array.prototype.slice.call(r)), r.constructor == Float64Array && (e = Array.prototype.slice.call(r));
        var a, s, i, n = [],
            o = "";
        for (r.length, n = resizeArray(e, 80), n = normalizeArray(n), 1 / 11, a = 1, s = 0; s < 23; s++) {
            for (0, o = s % 2 ? "~" : "|", i = 0; i < 79; i++) isNaN(n[i]) && (n[i] = 0), n[i] >= a && n[i] < a + 1 / 11 ? (o += n[i + 1] > a + 1 / 11 ? "/" : "-", n[i + 1] < a && (o += "\\"), i) : n[i] < a && n[i + 1] > a + 1 / 11 || n[i] > a + 1 / 11 && n[i + 1] < a ? (o += "|", i) : o += " ";
            if (0 >= a && 0 < a + 1 / 11) {
                for (o = "~", i = 0; i < 80; i++) o += "-";
                78
            }
            console.log("%c" + o, t), a -= 1 / 11
        }
        return 0
    }
});