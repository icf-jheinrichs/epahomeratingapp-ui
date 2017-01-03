// const COUCH_URL = 'http://127.0.0.1:5984';
const COUCH_URL = '';

export const DB        = {
    DISPLAY_LOGIC_DIGEST      : `${COUCH_URL}/display-logic-digest`,
    JOB                       : `${COUCH_URL}/job`,
    JOB_DISPLAY_LIST          : `${COUCH_URL}/job-display-list`,
    JOB_DATA_RESPONSE         : `${COUCH_URL}/job-data-response`,
    JOB_DATA_HOME_PERFORMANCE : `${COUCH_URL}/job-data-home-performance`
};

export const CONFIG = {
    DEFAULT_PHOTO : 'img/job-photo-default.svg'
};

export const MESSAGING = {
    SET_TOP_PAD                      : 'SET_TOP_PAD',
    SET_BOTTOM_PAD                   : 'SET_BOTTOM_PAD',
    UPDATE_HOUSE_PHOTO               : 'UPDATE_HOUSE_PHOTO',
    UPDATE_CHECKLIST_RESPONSE        : 'UPDATE_CHECKLIST_RESPONSE',
    UPDATE_CHECKLIST_RESPONSE_TOTALS : 'UPDATE_CHECKLIST_RESPONSE_TOTALS',
    UPDATE_MRF_DATA                  : 'UPDATE_MRF_DATA',
    POST_COMMENT                     : 'POST_COMMENT'
};

export const JOB_STATUS = {
    ACTIVE                : 'Active',
    COMPLETED             : 'Completed',
    INTERNAL_REVIEW       : 'Internal Review',
    SUBMITTED_TO_PROVIDER : 'Submitted to Provider',
    APPROVED              : 'Approved',
    REGISTERED            : 'Registered',
    DELETED               : 'Deleted'
};

export const CATEGORIES = {
    'exterior-walls' : {
        Name : 'Exterior Walls',
        Key  : 'ExteriorWalls'
    },
    'ceilings-roof' : {
        Name : 'Ceilings & Roofs',
        Key  : 'CeilingsRoofs'
    },
    'slabs-floors-joists' : {
        Name : 'Slabs, Floors & Rim Joists',
        Key  : 'SlabsFloorsRimJoists'
    },
    'interior-walls' : {
        Name : 'Interior Walls',
        Key  : 'InteriorWalls'
    },
    'hvac-water' : {
        Name : 'HVAC & Water',
        Key  : 'HvacWater'
    },
    'electrical' : {
        Name : 'Plug Loads, Lighting, PV, Meters',
        Key  : 'PlugLoadsLightingPvMeters'
    }
};

export const RATING_TYPES = {
    'EnergyStar' : {
        Name : 'ENERGY STAR Rating',
        Key  : 'energy-star'
    },
    'HERS' : {
        Name : 'HERS Rating Only',
        Key  : 'hers'
    }
};

export const CATEGORY_PROGRESS = {
    'pre-drywall' : {
        Name : 'Pre-Drywall',
        Key  : 'PreDrywall'
    },
    'final' : {
        Name : 'Final',
        Key  : 'Final'
    }
};

export const RESPONSES = {
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
