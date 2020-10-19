/**
 * Built by Chi
 */

(function () {
    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var canvas = void 0,
        ctx = void 0;

    var PI2 = 2 * Math.PI;

    var Wave = function (options) {
        Object.assign(this, {
            time: 0,
            speedUp: 1,
            lineWidth: 5,
            amplitude: 200,
            period: 50,
            phaseShift: 0,
            verticalShift: 0,
            segement: 1,
            devicePixelRatio: window.devicePixelRatio || 1,
            window: {
                height: window.innerHeight,
                height1_2: window.innerHeight / 2,
                width: window.innerWidth
            },
            strokeStyle: '#ccc'
        }, options || {});
        if (!ctx) {
            throw "No Canvas Selected";
        } else {
            this.ctx = ctx;
        }
        this._resizeWidth();
        window.addEventListener('resize', this._resizeWidth.bind(this));
    };

    Wave.prototype._resizeWidth = function () {
        this.ctx.lineWidth = this.lineWidth * this.devicePixelRatio;
        this.window.height = window.innerHeight;
        this.window.height1_2 = window.innerHeight / 2;
        this.window.width = window.innerWidth;
        canvas.width = window.innerWidth - 40;
        canvas.height = window.innerHeight - 40;
    };

    Wave.prototype._amplitude = function (x, time) {
        return this.amplitude * Math.sin(x + time) / 2;
    };

    Wave.prototype._draw = function () {
        this.time = this.time - 0.007;
        var time = this.time * this.speedUp;
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;
        var x = 0;
        var y = this.window.height1_2;
        this.ctx.moveTo(x, y);
        for (x = 0; x < this.window.width; x += this.segement) {
            y = this._amplitude(x, time) * Math.sin(PI2 / this.period * x + this.phaseShift + time) + this.verticalShift;
            this.ctx.lineTo(x, y + this.window.height1_2);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    };

    function animation(waves) {
        const update = function () {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let waveIndex in waves) {
                waves[waveIndex]._draw();
            }
            window.requestAnimFrame(update);
        };
        update();
    }

    function randomBetween(min, max, integer = true) {
        var value = (Math.random() * (max - min) + min);
        if (integer) {
            value = ~~value;
        }
        return value;
    }

    var WaveController = {
        start: function (options) {
            options = Object.assign({
                canvas: 'canvas',
                waveNumber: 4
            }, options);
            canvas = document.getElementById(options.canvas);
            ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth - 40;
            canvas.height = window.innerHeight - 40;
            var waves = [];
            while (waves.length <= options.waveNumber) {
                waves.push(new Wave(WaveController.generator()));
            }
            animation(waves);
        },
        generator: function (options) {
            var period = randomBetween(300, 1000);
            return Object.assign({
                lineWidth: randomBetween(1, 3),
                speedUp: randomBetween(0.7, 3, false),
                amplitude: randomBetween(50, 300),
                verticalShift: randomBetween(-150, 150),
                phaseShift: randomBetween(-100, 100),
                period
            }, options || {});
        }
    };

    if (typeof module !== 'undefined') {
        module.exports = WaveController;
    } else {
        window.onload = WaveController.start;
    }
})();