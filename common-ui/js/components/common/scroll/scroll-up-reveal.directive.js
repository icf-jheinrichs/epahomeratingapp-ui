function scrollUpReveal (ScrollService, $rootScope) {
    return {
        restrict : 'A',
        link     : (scope, element, attrs) => {
            const context   = attrs.revealContext || 'DEFAULT';
            const height    = element[0].offsetHeight;
            const id        = attrs.id;
            const index     = parseInt(attrs.revealOrder, 10);
            const threshold = parseInt(attrs.threshold, 10);
            let currentY    = ScrollService.getScroll().scrollY;

            function affix () {
                element.addClass('affix');
            }

            function unaffix () {
                element.css('transform', 'translateY(0px)');
                element.removeClass('affix');
            }

            let overrideDefaultListener
                = $rootScope
                    .$on('SET_SCROLL_CONTEXT', (event, scrollContext) => {
                        if (scrollContext !== context) {
                            unaffix();
                        } else {
                            affix();
                            setTop(ScrollService.getScroll());
                        }
                    });

            function setTop (scroll) {
                let top;
                const delta = currentY - scroll.scrollY;
                currentY    = scroll.scrollY;

                if (delta < 0) {
                    //scroll down
                    if (scroll.scrollY >= threshold + height) {
                        top = -height;
                    } else {
                        top = (threshold + height) - (threshold + height + scroll.scrollY);
                    }
                } else {
                    //scroll up
                    top = 0;
                }

                element.css('transform', `translateY(${top}px)`);
            }

            affix();
            setTop(ScrollService.getScroll());

            ScrollService.registerListener({
                id,
                index,
                scrollHandler : setTop,
                context
            });

            scope.$on('$destroy', () => {
                ScrollService.deregisterListener(id);
                overrideDefaultListener();
            });
        }
    };
}

export default scrollUpReveal;
