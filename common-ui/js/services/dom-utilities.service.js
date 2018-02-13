class DOMUtilitiesService {
    getOffsetLeftFromPageContainer (element) {
        let offsetLeft   = element.offsetLeft;
        let offsetParent = element.offsetParent;

        while (offsetParent !== null && offsetParent.className.indexOf('page-container') < 0) {
            offsetLeft   += offsetParent.offsetLeft;
            offsetParent  = offsetParent.offsetParent;
        }

        return offsetLeft;
    }
}

export default DOMUtilitiesService;
