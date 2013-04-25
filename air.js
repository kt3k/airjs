/**
 * air.js 0.0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.air = (function () {
    'use strict';

    var air = function () {
        this.index = 0;
    };

    var exports = function () {
        return new air();
    };

    var airPrototype = exports.prototype = air.prototype = {constructor: exports};

    var Chainable = exports.Chainable = function (f) {
        return function () {
            f.apply(this, arguments);

            return this;
        };
    };

    exports.InSequence = function (pt) {
        return function (f) {
            if (pt.motions == null) {
                pt.motions = [];
            }

            pt.motions.push(f);

            return function () {
                return f.apply(this, arguments);
            };
        };
    };

    exports.InitOn = function (selector) {
        return function (f) {
            return function () {
                this.div = window.div();
                return f.call(this, this.div).appendTo(window.document.querySelector(selector)).commit();
            };
        };
    };

    exports.TransitionMethod = function (f) {
        return function () {
            return f.call(this, this.div.transition());
        };
    };

    exports.TransitionCancelMethod = function (f) {
        return function () {
            return f.call(this, this.div.transitionCancel().transition());
        };
    };

    Function.prototype.E = function (decorator) {
        return decorator(this);
    };

    airPrototype.init = function () {};

    airPrototype.start = function () {
        this.step();
    }
    .E(Chainable);

    airPrototype.step = function () {
        if (this.__stop__) {
            return;
        }

        var self = this;

        this.motions[this.index].call(this)
        .callback(function () { self.step(); })
        .transitionCommit();

        this.index = (this.index + 1) % this.motions.length;
    };

    airPrototype.stop = function () {
        this.__stop__ = true;

        this.disapper(this.div.transitionCancel().transition())
        .transition()
        .duration(1000)
        .remove()
        .transitionCommit();
    }
    .E(Chainable);

    return exports;
}());

window.floatingBox = (function () {
    'use strict';

    var exports = function () {
        return new floatingBox();
    };

    var floatingBox = function () {};

    var floatingBoxPrototype = floatingBox.prototype = exports.prototype = new window.air();

    floatingBoxPrototype.constructor = exports;

    var dice = exports.dice = function (n) {
        return Math.floor(Math.random() * n);
    };

    var Chainable = window.air.Chainable;

    var InSequence = window.air.InSequence;

    var TransitionMethod = window.air.TransitionMethod;

    var TransitionCancelMethod = window.air.TransitionCancelMethod;

    var InitOn = window.air.InitOn;

    floatingBoxPrototype.init = function (div) {
        return div
        .css({
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '200px',
            height: '100px',
            zIndex: '-1',
            webkitTransitionTimingFunction: 'linear'
        })
        .setHue(dice(360))
        .setLum(25)
        .setX(-220)
        .setY(100);
    }
    .E(InitOn('body'))
    .E(Chainable);

    floatingBoxPrototype.left = function (transition) {
        return transition
        .duration(10000)
        .setX(340);
    }
    .E(TransitionMethod)
    .E(InSequence(floatingBoxPrototype));

    floatingBoxPrototype.right = function (transition) {
        return transition
        .duration(10000)
        .setX(-220);
    }
    .E(TransitionMethod)
    .E(InSequence(floatingBoxPrototype));

    floatingBoxPrototype.disapper = function (transition) {
        return transition
        .duration(500)
        .css({opacity: 0});
    }
    .E(TransitionCancelMethod);

    return exports;
}());

window.airFactory = function (obj) {
    'use strict';

    var exports = function () {
        return new xAir();
    };

    var xAir = function () {};

    var xAirPrototype = xAir.prototype = exports.prototype = new window.air();

    xAirPrototype.constructor = exports;

    var InitOn = window.air.InitOn;

    var Chainable = window.air.Chainable;

    var InSequence = window.air.InSequence;

    var TransitionMethod = window.air.TransitionMethod;

    var TransitionCancelMethod = window.air.TransitionCancelMethod;

    if (obj.selector == null) {
        obj.selector = 'body';
    }

    xAirPrototype.disapper = obj.disapper.E(TransitionCancelMethod);
    delete obj.disapper;

    xAirPrototype.init = obj.init.E(InitOn(obj.selector)).E(Chainable);
    delete obj.init;
    delete obj.selector;

    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'function') {
            xAirPrototype[key] = obj[key].E(TransitionMethod).E(InSequence(xAirPrototype));
        } else {
            xAirPrototype[key] = obj[key];
        }
    });

    return exports;
};

window.flux = window.airFactory({
    selector: 'body',

    init: function (div) {
        return div
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
    },

    left: function (transition) {
        return transition
        .duration(10000)
        .setX(340);
    },

    right: function (transition) {
        return transition
        .duration(10000)
        .setX(-220);
    },

    disapper: function (transition) {
        return transition
        .duration(500)
        .css({opacity: 0});
    }
});

window.kyuukyuu = airFactory({
    init: function (div) {
        return div
        .css({
            position: 'absolute',
            width: '20px',
            height: '20px',
            left: '0',
            top: '0'
        })
        .setHue(floatingBox.dice(360))
        .setX(-30)
        .setY(10)
    },
    a: function (transition) {
        return transition
        .duration(300)
        .setX(10)
    },
    b: function (transition) {
        return transition
        .duration(300)
        .setY(-30)
    },
    c: function (transition) {
        return transition
        .duration(100)
        .setX(-30)
    },
    d: function (transition) {
        return transition
        .duration(100)
        .setY(10)
    },
    disapper: function (transition) {
        return transition
        .duration(500)
        .css({opacity: 0});
    }
});
