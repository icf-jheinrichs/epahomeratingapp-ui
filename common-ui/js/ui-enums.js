const IMAGES = {
    DEFAULT_PHOTO : 'img/job-photo-default.svg'
};

const MESSAGING = {
    SET_TOP_PAD                      : 'SET_TOP_PAD',
    SET_BOTTOM_PAD                   : 'SET_BOTTOM_PAD',
    UPDATE_HOUSE_PHOTO               : 'UPDATE_HOUSE_PHOTO',
    UPDATE_CHECKLIST_RESPONSE        : 'UPDATE_CHECKLIST_RESPONSE',
    UPDATE_CHECKLIST_RESPONSE_TOTALS : 'UPDATE_CHECKLIST_RESPONSE_TOTALS',
    UPDATE_MRF_DATA                  : 'UPDATE_MRF_DATA',
    POST_COMMENT                     : 'POST_COMMENT',
    HOUSE_PLAN_NEW                   : 'HOUSE_PLAN_NEW',
    HOUSE_PLAN_UPDATE                : 'HOUSE_PLAN_UPDATE'
};

const JOB_STATUS = {
    ACTIVE                : 'Active',
    COMPLETED             : 'Completed',
    INTERNAL_REVIEW       : 'Internal Review',
    SUBMITTED_TO_PROVIDER : 'Submitted to Provider',
    APPROVED              : 'Approved',
    REGISTERED            : 'Registered',
    DELETED               : 'Deleted'
};

const CATEGORIES = {
    'walls' : {
        Name : 'Walls',
        Key  : 'Walls'
    },
    'ceilings-roof' : {
        Name : 'Ceilings & Roofs',
        Key  : 'CeilingsRoofs'
    },
    'foundation-floors' : {
        Name : 'Foundation & Floors',
        Key  : 'FoundationFloors'
    },
    'tests' : {
        Name : 'Tests',
        Key  : 'Tests'
    },
    'hvac-water' : {
        Name : 'HVAC & Water',
        Key  : 'HvacWater'
    },
    'plugloads-lighting-pv' : {
        Name : 'Plug Loads, Lighting, PV',
        Key  : 'PlugLoadsLightingPv'
    }
};

const CATEGORY_PROGRESS = {
    'pre-drywall' : {
        Name : 'Pre-Drywall',
        Key  : 'PreDrywall'
    },
    'final' : {
        Name : 'Final',
        Key  : 'Final'
    }
};

const RATING_TYPES = {
    'EnergyStar' : {
        Name : 'ENERGY STAR Rating',
        Key  : 'energy-star'
    },
    'HERS' : {
        Name : 'HERS Rating Only',
        Key  : 'hers'
    }
};

const RESPONSES = {
    NotApplicable : {
        Name  : 'N/A',
        Class : 'btn-response',
        Key   : 'NotApplicable'
    },
    BuilderVerified : {
        Name  : 'Builder Verified',
        Class : 'btn-response',
        Key   : 'BuilderVerified'
    },
    MustCorrect : {
        Name  : 'Must Correct',
        Class : 'btn-error',
        Key   : 'MustCorrect'
    },
    RaterVerified : {
        Name  : 'Rater Verified',
        Class : 'btn-response',
        Key   : 'RaterVerified'
    }
};

const UI_ENUMS = {
    IMAGES,
    MESSAGING,
    JOB_STATUS,
    CATEGORIES,
    CATEGORY_PROGRESS,
    RATING_TYPES,
    RESPONSES
};

export default UI_ENUMS;
