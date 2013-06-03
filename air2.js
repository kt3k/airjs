/**
 * air2.js
 * copyright: (c) yggs project
 */

this.air2 = window.div.branch(function (airPrototype, parent, decorators) {
    'use strict';

    airPrototype.loopIndex = 0;

    airPrototype.loopArray = [];

    airPrototype.initialDelay = 0;

    decorators.Disappearing = function (func) {
        return function () {
            this
            .transitionCancel()

            func.apply(this, arguments);

            this
            .transition()
            .remove()
            .transitionCommit();
        };
    };

    airPrototype.appear = function () {
        this
        .transition()
        .duration(this.initialDelay)
        .loop();
    }
    .E(decorators.Chainable);

    airPrototype.loop = function () {
        if (this.loopArray.length === 0) {
            return;
        }

        var method = this.loopArray[this.loopIndex];
        this.loopIndex += 1;
        this.loopIndex %= this.loopArray.length;

        var self = this;

        this[method]();
        this.transitionCommit().callback(function () {
            self.loop();
        });
    }
    .E(decorators.Chainable);

    this.setBranchGenerator();

});

this.flow = window.air2.branch(function (flowPrototype, parent, decorators) {
    'use strict';

    var dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    flowPrototype.init = function (args) {
        this.flowDuration = args.duration || 10000;
        this.initialDelay = args.delay || 0;
        this.zIndex = args.zIndex || -100

        var y = args.y == null ? 100 : args.y

        this
        .css({
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '200px',
            height: '100px',
            zIndex: this.zIndex,
            webkitTransitionTimingFunction: 'linear'
        })
        .setSat(dice(100))
        .setHue(dice(360))
        .setLum(10)
        .setX(-220)
        .setY(y)
        .appendTo(args.dom || document.body)
        .commit();
    }
    .E(decorators.Chainable);

    flowPrototype.left = function () {
        this
        .transition()
        .duration(this.flowDuration)
        .setX(340);
    };

    flowPrototype.right = function () {
        this
        .transition()
        .duration(this.flowDuration)
        .setX(-220);
    };

    flowPrototype.disappear = function () {
        this
        .transition()
        .duration(500)
        .css({opacity: 0});
    }
    .E(decorators.Disappearing);

    flowPrototype.loopArray = ['left', 'right'];
});

this.kunkun = this.air2.branch(function (kunkunPrototype, parent, decorators) {
    'use strict';

    var dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    kunkunPrototype.init = function (args) {
        this.dist = args.dist || 40;
        var x = args.x || -45;
        var y = args.y || dice(200) + 100;
        this.dur = args.dur || 500;

        this
        .css({
            position: 'absolute',
            width: '20px',
            height: '20px',
            left: '0',
            top: '0'
        })
        .setHue(dice(360))
        .setX(x)
        .setY(y + this.dist)
        .appendTo(args.dom || document.body)
        .commit();

    }
    .E(decorators.Chainable);

    kunkunPrototype.a = function () {
        this
        .transition()
        .duration(this.dur)
        .addX(this.dist);
    };

    kunkunPrototype.b = function () {
        this
        .transition()
        .duration(this.dur)
        .addY(- this.dist);
    };

    kunkunPrototype.c = function () {
        this
        .transition()
        .duration(this.dur)
        .addX(- this.dist);
    };

    kunkunPrototype.d = function () {
        this
        .transition()
        .duration(this.dur)
        .addY(this.dist);
    };

    kunkunPrototype.disappear = function () {
        this
        .transition()
        .duration(500)
        .css({opacity: 0});
    }
    .E(decorators.Disappearing);

    kunkunPrototype.loopArray = ['a', 'b', 'c', 'd'];
});

this.urouro = this.air2.branch(function (urouroPrototype, parent, decorators) {
    'use strict';

    var dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    urouroPrototype.init = function (args) {
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.size = args.size || 47;
        this.screenWidth = args.screenWidth || 320;
        this.screenHeight = args.screenHeight || 414;
        this.speed = args.speed || 0.025;
        this.zIndex = args.zIndex || -99;

        args = args || {};
        this
        .css({
            position: 'absolute',
            width: this.size + 'px',
            height: this.size + 'px',
            left: '0',
            top: '0',
            webkitTransitionTimingFunction: 'linear',
            zIndex: this.zIndex
        })
        .setHue(dice(360))
        .setSat(15)
        .setLum(10)
        .setX(this.x)
        .setY(this.y)
        .appendTo(args.dom || document.body)
        .commit();
    }
    .E(decorators.Chainable);

    urouroPrototype.move = function () {
        var param = this.getNextParam();

        this.transition()
        .duration(param.duration)
        .setX(param.x)
        .setY(param.y)
    };

    urouroPrototype.getNextParam = function () {
        var isHorizontal = dice(2);

        var x = isHorizontal ? dice(this.screenWidth - this.size) : this.x;
        var y = !isHorizontal ? dice(this.screenHeight - this.size) : this.y;

        var d = isHorizontal ? Math.abs(x - this.x) : Math.abs(y - this.y);
        var duration = d / this.speed;

        this.x = x;
        this.y = y;

        return {x: x, y: y, duration: duration};
    };

    urouroPrototype.disappear = function () {
    }
    .E(decorators.Disappearing);

    urouroPrototype.loopArray = ['move'];
});