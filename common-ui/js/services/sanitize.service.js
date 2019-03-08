class SanitizeService {
    sanitize (element) {
        element = this.SanitizeService.sanitize(element);
        element = element.replace('&amp;','&');
        return element;
    }
}

export default SanitizeService;
