function scrollAffix (ScrollService) {
    const AFFIX_CLASS = 'affix';

    return {
        restrict : 'A',
        link     : (scope, element, attrs) => {
            const id      = attrs.id;
            const index   = parseInt(attrs.affixOrder, 10);
            const offset  = attrs.affixOffset ? parseInt(attrs.affixOffset, 10) : 0;
            const placeholder = angular.element('<div class="affix-placeholder hidden"></div>');
            let isAffixed = false;

            element.after(placeholder);

            function setTop (scroll) {
                const threshold = ScrollService.getAffixedThreshold(index);

                if (scroll.scrollY >= threshold + offset) {
                    if (isAffixed) {
                        return;
                    }

                    isAffixed = true;

                    placeholder.css('height', `${element[0].offsetHeight}px`);
                    placeholder.removeClass('hidden');

                    element.addClass(AFFIX_CLASS);
                    element.css('top', `${ScrollService.getAffixedTop(index)}px`);
                } else {
                    isAffixed = false;

                    element.removeClass(AFFIX_CLASS);
                    placeholder.addClass('hidden');
                }

                ScrollService.setAffixed({
                    height : element[0].offsetHeight,
                    id,
                    index,
                    isAffixed,
                    offset
                });
            }

            setTop(ScrollService.getScroll());

            ScrollService.registerListener({
                id,
                scrollHandler : setTop
            });

            ScrollService.setAffixed({
                height : element[0].offsetHeight,
                id,
                index,
                isAffixed,
                offset
            });

            scope.$on('$destroy', () => {
                ScrollService.deregisterListener(id);
                ScrollService.removeAffixed(index);
            });
        }
    };
}

export default scrollAffix;
