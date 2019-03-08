class SanitizeService {
    constructor (
        $sanitize
    ) {
        'ngInject';
        this.$sanitize = $sanitize;
    }
    
    sanitize (unsanitizedString) {
        sanitizedString = this.$sanitize(unsanitizedString);
        replacedSanitizedString = sanitizedString.replace(/&amp;/g,'&');
        return replacedSanitizedString;
    }
}

export default SanitizeService;
