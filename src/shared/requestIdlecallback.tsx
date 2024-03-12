export const requestIdleCallback =
    window.requestIdleCallback ||
    function(cb:IdleRequestCallback):number {
        var start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    };

export const cancelIdleCallback =
    window.cancelIdleCallback ||
    function(id: number) {
        clearTimeout(id);
    };