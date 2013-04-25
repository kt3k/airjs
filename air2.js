/**
 * air2.js
 * copyright: (c) yuggs project
 */

// js の継承は prototype と親の prototype (super 相当) 受け取って修飾する関数で作るパターンが best practice な気がしてきた。

this.air2 = window.div.branch(function (airPrototype, parent, decorators) {
    'use strict';

    decorators.Chainable = function (func) {
        return function () {
            func.apply(this, arguments);

            return this;
        };
    };

    airPrototype.loopIndex = 0;

    airPrototype.loopArray = [];

    airPrototype.loop = function () {
        if (this.loopArray.length === 0) {
            return;
        }

        var method = this.loopArray[this.loopIndex];
        this.loopIndex += 1;
        this.loopIndex %= this.loopArray.length;

        var self = this;

        this[method]().transitionCommit().callback(function () {
            self.loop();
        });
    };

    airPrototype.stop = function () {
        this
        .disapper()
        .transition()
        .remove()
        .transitionCommit();
    };

}).setBranchGenerator();

this.flow = window.air2.branch(function (flowPrototype, parent, decorators) {
    'use strict';

    var dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    flowPrototype.init = function () {
        this
        .css({
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '200px',
            height: '100px',
            zIndex: '-10',
            webkitTransitionTimingFunction: 'linear'
        })
        .setHue(dice(360))
        .setLum(25)
        .setX(-220)
        .setY(100);
    }
    .E(decorators.Chainable);

    flowPrototype.left = function () {
        this
        .transition()
        .duration(10000)
        .setX(340);
    }
    .E(window.div.Transitionable)
    .E(decorators.Chainable);

    flowPrototype.right = function () {
        this
        .transition()
        .duration(10000)
        .setX(-220);
    }
    .E(window.div.Transitionable)
    .E(decorators.Chainable);

    flowPrototype.disapper = function () {
        this
        .transition()
        .duration(500)
        .css({opacity: 0});
    }
    .E(decorators.Chainable);

    flowPrototype.loopArray = ['left', 'right'];
});