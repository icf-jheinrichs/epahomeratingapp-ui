class SanitizeService {
    constructor (
        $sanitize
    ) {
        'ngInject';
        this.$sanitize = $sanitize;
    }

    sanitize (unsanitizedString) {
        let sanitizedString = this.$sanitize(unsanitizedString);
        sanitizedString = sanitizedString.replace(/&amp;/g, '&');

        return sanitizedString;
    }
}

export default SanitizeService;
