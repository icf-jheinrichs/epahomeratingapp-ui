function focus () {
    return {
        restrict : 'A',
        link     : (scope, element, attrs, focusCtrl) => {
            if (attrs.focusOnInit && attrs.focusOnInit === 'true') {
                element[0].focus();
            }
        }
    };
}

export default focus;
