/**
 * air2.js
 * copyright: (c) yuggs project
 */

// js の継承は prototype と親の prototype (super 相当) 受け取って修飾する関数で作るパターンが best practice な気がしてきた。

this.air2 = window.div.branch(function (airPrototype) {
    'use strict';

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

    flowPrototype.init = function (dom) {
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
        .setY(100)
        .appendTo(dom)
        .commit();
    }
    .E(decorators.Chainable);

    flowPrototype.left = function () {
        this
        .transition()
        .duration(10000)
        .setX(340);
    }
    .E(decorators.Transitionable)
    .E(decorators.Chainable);

    flowPrototype.right = function () {
        this
        .transition()
        .duration(10000)
        .setX(-220);
    }
    .E(decorators.Transitionable)
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

this.kunkun = this.air2.branch(function (kunkunPrototype, parent, decorators) {
    'use strict';

    var dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    kunkunPrototype.init = function (dom) {
        this
        .css({
            position: 'absolute',
            width: '20px',
            height: '20px',
            left: '0',
            top: '0'
        })
        .setHue(dice(360))
        .setX(-30)
        .setY(10)
        .appendTo(dom)
        .commit();

    }
    .E(decorators.Chainable);

    kunkunPrototype.a = function () {
        this
        .transition()
        .duration(300)
        .setX(10);
    }
    .E(decorators.Transitionable)
    .E(decorators.Chainable);

    kunkunPrototype.b = function () {
        this
        .transition()
        .duration(300)
        .setY(-30);
    }
    .E(decorators.Transitionable)
    .E(decorators.Chainable);

    kunkunPrototype.c = function () {
        this
        .transition()
        .duration(100)
        .setX(-30);
    }
    .E(decorators.Transitionable)
    .E(decorators.Chainable);

    kunkunPrototype.d = function () {
        this
        .transition()
        .duration(100)
        .setY(10);
    }
    .E(decorators.Transitionable)
    .E(decorators.Chainable);

    kunkunPrototype.disapper = function () {
        this
        .transition
        .duration(500)
        .css({opacity: 0});
    }
    .E(decorators.Chainable);

    kunkunPrototype.loopArray = ['a', 'b', 'c', 'd'];
});