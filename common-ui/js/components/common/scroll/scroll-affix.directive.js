function scrollAffix (ScrollService, $rootScope) {
    const AFFIX_CLASS = 'affix';

    return {
        restrict : 'A',
        link     : (scope, element, attrs) => {
            const id          = attrs.id;
            const index       = parseInt(attrs.affixOrder, 10);
            const offset      = attrs.affixOffset ? parseInt(attrs.affixOffset, 10) : 0;
            const placeholder = angular.element('<div class="affix-placeholder hidden"></div>');
            let isAffixed     = false;
            const context     = attrs.affixContext || 'DEFAULT';

            let overrideDefaultListener
                = $rootScope
                    .$on('SET_SCROLL_CONTEXT', (event, scrollContext) => {
                        if (scrollContext !== context) {
                            ScrollService.removeAffixed(index);
                            unaffix();
                        } else {
                            setTop(ScrollService.getScroll());
                        }
                    });

            element.after(placeholder);

            function affix () {
                isAffixed = true;

                placeholder.css('height', `${element[0].offsetHeight}px`);
                placeholder.removeClass('hidden');

                element.addClass(AFFIX_CLASS);
                element.css('top', `${ScrollService.getAffixedTop(index)}px`);
            }

            function unaffix () {
                isAffixed = false;

                element.removeClass(AFFIX_CLASS);
                placeholder.addClass('hidden');
            }

            function setTop (scroll) {
                const threshold = ScrollService.getAffixedThreshold(index);

                if (scroll.scrollY >= threshold + offset) {
                    if (isAffixed) {
                        return;
                    }

                    affix();
                } else {
                    unaffix();
                }

                ScrollService.setAffixed({
                    context,
                    height : element[0].offsetHeight,
                    id,
                    index,
                    isAffixed,
                    offset
                });
            }

            setTop(ScrollService.getScroll());

            ScrollService.registerListener({
                context,
                id,
                scrollHandler : setTop
            });

            ScrollService.setAffixed({
                context,
                height : element[0].offsetHeight,
                id,
                index,
                isAffixed,
                offset
            });

            scope.$on('$destroy', () => {
                ScrollService.deregisterListener({
                    id,
                    context
                });
                ScrollService.removeAffixed(index);
                overrideDefaultListener();
            });
        }
    };
}

export default scrollAffix;
