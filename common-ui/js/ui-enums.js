import MANUFACTURERS from './components/common/enums/manufacturers';

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

const CONTEXT = {
    'APP'   : 'app',
    'ADMIN' : 'admin'
};

const DIALOG = {
    MAKE_JOB_OFFLINE : 'dialog-make-job-offline'
};

const IMAGES = {
    DEFAULT_PHOTO : 'img/job-photo-default.svg'
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

const MESSAGING = {
    SET_TOP_PAD                      : 'SET_TOP_PAD',
    SET_BOTTOM_PAD                   : 'SET_BOTTOM_PAD',
    UPDATE_HOUSE_PHOTO               : 'UPDATE_HOUSE_PHOTO',
    UPDATE_CHECKLIST_RESPONSE        : 'UPDATE_CHECKLIST_RESPONSE',
    UPDATE_CHECKLIST_ITEM_DATA       : 'UPDATE_CHECKLIST_ITEM_DATA',
    UPDATE_CHECKLIST_RESPONSE_TOTALS : 'UPDATE_CHECKLIST_RESPONSE_TOTALS',
    UPDATE_MRF_DATA                  : 'UPDATE_MRF_DATA',
    POST_COMMENT                     : 'POST_COMMENT',
    VIEW_HVAC_DESIGN_REPORT          : 'VIEW_HVAC_DESIGN_REPORT',
    HOUSE_PLAN_NEW                   : 'HOUSE_PLAN_NEW',
    HOUSE_PLAN_UPDATE                : 'HOUSE_PLAN_UPDATE',
    JOB_AVAILABLE_OFFLINE            : 'JOB_AVAILABLE_OFFLINE',
    ASSET_DOWNLOADED                 : 'ASSET_DOWNLOADED',
    ASSET_BEING_UPLOADED_FOR_JOB     : 'ASSET_BEING_UPLOADED_FOR_JOB',
    ASSET_UPLOADED_FOR_JOB           : 'ASSET_UPLOADED_FOR_JOB',
    DB_START_SYNC                    : 'DB_START_SYNC',
    DB_PAUSE_SYNC                    : 'DB_PAUSE_SYNC',
    DEVICE_OFFLINE                   : 'DEVICE_OFFLINE',
    DEVICE_ONLINE                    : 'DEVICE_ONLINE',
    REFRESH_JOBS_LIST                : 'REFRESH_JOBS_LIST'
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

const STATUS = {
    LAST_UPDATED    : 'Last Updated :now:',
    UP_TO_DATE      : 'Up to Date',
    SYNCING         : 'Syncing',
    SYNC_INCOMPLETE : 'Sync Incomplete'
};

const STATUS_CLASSNAME = {
    OFFLINE           : 'sync-status-offline',              // grey w/ checkmark
    ONLINE_UP_TO_DATE : 'sync-status-online',               // green w/ checkmark
    SYNCING           : 'sync-status-syncing',              // blue border
    LOCAL_UNSYNCED    : 'sync-status-local-unsynced',       // yellow with -
    SYNC_INCOMPLETE   : 'sync-status-incomplete'            // red with x
};

const SYNC_STATUS = {
    UP    : 'sync-up',
    DOWN  : 'sync-down',
    ERROR : 'sync-error'
};

export default {
    CATEGORIES,
    CATEGORY_PROGRESS,
    CONTEXT,
    DIALOG,
    IMAGES,
    JOB_STATUS,
    MANUFACTURERS,
    MESSAGING,
    RATING_TYPES,
    RESPONSES,
    STATUS,
    STATUS_CLASSNAME,
    SYNC_STATUS
};
