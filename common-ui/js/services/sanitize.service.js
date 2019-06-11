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
        sanitizedString = sanitizedString.replace(/&#10;/g, '\n');

        return sanitizedString;
    }
}

export default SanitizeService;
