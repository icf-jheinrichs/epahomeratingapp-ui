function scrollUpReveal (ScrollService) {
    return {
        restrict : 'A',
        link     : (scope, element, attrs) => {
            let threshold = parseInt(attrs.threshold, 10);
            let currentY  = ScrollService.getScroll().scrollY;
            const height  = element[0].offsetHeight;
            const id      = attrs.id;

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

            setTop(ScrollService.getScroll());

            ScrollService.registerListener({
                id,
                scrollHandler : setTop
            });

            scope.$on('$destroy', () => {
                ScrollService.deregisterListener(id);
            });
        }
    };
}

export default scrollUpReveal;
