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

const CHECKLIST_ITEM_STATUS = {
    'to-do' : {
        Name : 'To-do',
        Key  : 'ToDo'
    },
    'must-correct' : {
        Name : 'Must Correct',
        Key  : 'MustCorrect'
    }
};

const USER_TYPE = {
    ADMIN       : 'ADMIN',
    RATER       : 'RATER',
    PROVIDER    : 'PROVIDER',
    QA          : 'QA'
};

const DIALOG = {
    ADD_PROVIDER_COMPANY      : 'dialog-add-provider-company',
    CONFIRM_CHANGE_SAMPLE_SET : 'dialog-confirm-change-sample-set',
    REMOVE_PROVIDER_COMPANY   : 'dialog-remove-provider-company',
    MAKE_JOB_OFFLINE          : 'dialog-make-job-offline',
    LEAKAGE_TEST_EXEMPTION    : 'dialog-leakage-test-exemption',
    SUBMIT_TO_PROVIDER        : 'dialog-submit-to-provider',
    DELETE_JOB                : 'dialog-delete-job',
    ARCHIVE_JOB               : 'dialog-archive-job',
    DOCUMENT_VIEWER_ERROR     : 'dialog-document-viewer-error'
};

const DROPDOWN = {
    JOB_INFO            : 'dropdown-job-info',
    USER_MENU           : 'user-menu',
    USER_COMPANIES_MENU : 'user-companies-menu'
};

const IMAGES = {
    DEFAULT_PHOTO : 'img/job-photo-default.svg'
};

const JOB_PAGE_TAB = {
    ACTIVE                : 'Active',
    INTERNAL_REVIEW       : 'Internal Review',
    HISTORY               : 'History',
    OFFLINE_JOBS          : 'Offline Jobs',
    SUBMITTED_TO_PROVIDER : 'Submitted to Provider',
    COMPLETED             : 'Completed'
};

const JOB_STATUS = {
    ACTIVE                : 'Active',
    COMPLETED             : 'Completed',
    SUBMITTED_TO_PROVIDER : 'Submitted to Provider',
    APPROVED              : 'Approved',
    REGISTERED            : 'Registered',
    DELETED               : 'Deleted',
    ARCHIVED              : 'Archived'
};

const JOB_PROGRESS = {
    'active' : {
        Name : 'Active',
        Key  : 'Active'
    },
    'completed' : {
        Name : 'Completed',
        Key  : 'Completed'
    },
    'internal-review' : {
        Name : 'Internal Review',
        Key  : 'InternalReview'
    },
    'submitted-to-provider' : {
        Name : 'Submitted to Provider',
        Key  : 'Submitted to Provider'
    },
    'approved' : {
        Name : 'Approved',
        Key  : 'Approved'
    },
    'registered' : {
        Name : 'Registered',
        Key  : 'Registered'
    },
    'deleted' : {
        Name : 'Deleted',
        Key  : 'Deleted'
    }
};

const MESSAGING = {
    SET_TOP_PAD                      : 'SET_TOP_PAD',
    SET_BOTTOM_PAD                   : 'SET_BOTTOM_PAD',
    UPDATE_HOUSE_PHOTO               : 'UPDATE_HOUSE_PHOTO',
    SHOW_FOOTNOTE                    : 'SHOW_FOOTNOTE',
    UPDATE_CHECKLIST_RESPONSE        : 'UPDATE_CHECKLIST_RESPONSE',
    UPDATE_CHECKLIST_ITEM_DATA       : 'UPDATE_CHECKLIST_ITEM_DATA',
    SET_CHECKLIST_RESPONSE_TOTALS    : 'SET_CHECKLIST_RESPONSE_TOTALS',
    UPDATE_CHECKLIST_RESPONSE_TOTALS : 'UPDATE_CHECKLIST_RESPONSE_TOTALS',
    UPDATE_MRF_DATA                  : 'UPDATE_MRF_DATA',
    POST_COMMENT                     : 'POST_COMMENT',
    VIEW_HVAC_DESIGN_REPORT          : 'VIEW_HVAC_DESIGN_REPORT',
    HOUSE_PLAN_NEW                   : 'HOUSE_PLAN_NEW',
    HOUSE_PLAN_NEW_BULK              : 'HOUSE_PLAN_NEW_BULK',
    HOUSE_PLAN_UPDATE                : 'HOUSE_PLAN_UPDATE',
    HOUSE_PLAN_DELETE                : 'HOUSE_PLAN_DELETE',
    JOB_AVAILABLE_OFFLINE            : 'JOB_AVAILABLE_OFFLINE',
    ASSET_DOWNLOADED                 : 'ASSET_DOWNLOADED',
    ASSET_BEING_UPLOADED_FOR_JOB     : 'ASSET_BEING_UPLOADED_FOR_JOB',
    ASSET_UPLOADED_FOR_JOB           : 'ASSET_UPLOADED_FOR_JOB',
    ALL_JOB_ASSET_FINISHED_SYNCING   : 'ALL_JOB_ASSET_FINISHED_SYNCING',
    DB_START_SYNC                    : 'DB_START_SYNC',
    DB_PAUSE_SYNC                    : 'DB_PAUSE_SYNC',
    DB_ERROR_SYNC                    : 'DB_ERROR_SYNC',
    DEVICE_OFFLINE                   : 'DEVICE_OFFLINE',
    DEVICE_ONLINE                    : 'DEVICE_ONLINE',
    REFRESH_JOBS_LIST                : 'REFRESH_JOBS_LIST',
    REFRESH_JOBS_LIST_FINISH         : 'REFRESH_JOBS_LIST_FINISH',
    USER_AUTHORIZATION_UPDATE        : 'USER_AUTHORIZATION_UPDATE',
    INVALID_JWT                      : 'INVALID_JWT',
    UPDATE_JOB_HISTORY               : 'UPDATE_JOB_HISTORY'
};

const MODAL = {
    COMPLETE_JOB                : 'modal-complete-job',
    DOWNLOAD_REM_XML            : 'modal-download-rem-xml',
    EDIT_WATER_HEATER_EQUIPMENT : 'modal-edit-water-heater-equipment',
    SHOW_FOOTNOTE               : 'modal-show-footnote',
    PROVIDER_JOB_COMMENTS       : 'modal-provider-job-comments',
    SHOW_HISTORY                : 'modal-show-history'
};

const POPOVER = {
    JOB_SEARCH         : 'job-search-popover',
    HOUSE_PLANS_SEARCH : 'house-plans-search-popover'
};

const ANY = {
    'Any' : {
        Name : 'Any',
        Key  : 'Any'
    },
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

const JOB_TYPES = {
    'SampleSet' : {
        Name : 'Sample Set',
        Key  : 'sampleSet'
    },
    'IndividualHouse' : {
        Name : 'Individual House',
        Key  : 'individualHouse'
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

const SEARCH_PARAMS = {
    AVAILABLE_OFFLINE             : 'availableOffline',
    BUILDER                       : 'builder',
    HOUSE_PLAN                    : 'housePlan',
    INSPECTION_STAGE              : 'inspectionStage',
    INTERNAL_REVIEW               : 'internalReview',
    JOB_TYPE                      : 'jobType',
    KEYWORDS                      : 'keywords',
    MUST_CORRECT                  : 'mustCorrect',
    PROGRESS_LEVEL                : 'progressLevel',
    RATER                         : 'rater',
    RATING_TYPE                   : 'ratingType',
    STATUS                        : 'status'
};

const HOUSE_PLANS_SEARCH_PARAMS = {
    BUILDER                       : 'builder',
    KEYWORDS                      : 'keywords'
};

const STATUS = {
    LAST_UPDATED    : 'Last Updated :now:',
    UP_TO_DATE      : 'Up to Date',
    SYNCING         : 'Syncing',
    SYNC_INCOMPLETE : 'Sync Incomplete'
};

const STATUS_CLASSNAME = {
    OFFLINE           : 'sync-status-offline', // grey w/ checkmark
    ONLINE_UP_TO_DATE : 'sync-status-online', // green w/ checkmark
    SYNCING           : 'sync-status-syncing', // blue border
    LOCAL_UNSYNCED    : 'sync-status-local-unsynced', // yellow with -
    SYNC_INCOMPLETE   : 'sync-status-incomplete' // red with x
};

const STATE_NAME = {
    DIAGNOSTICS                       : 'diagnostics',
    LOGIN                             : 'login',
    NOT_AUTHORIZED                    : 'not-authorized',
    PROGRESS                          : 'progress',
    TEMPLATE_LIBRARY                  : 'template-library',
    TEMPLATE_LIBRARY_NEW              : 'template-library.new',
    TEMPLATE_LIBRARY_EDIT             : 'template-library.edit',
    TEMPLATE_LIBRARY_EDIT_BULK        : 'template-library.edit-bulk',
    TEMPLATE_LIBRARY_SEARCH           : 'template-library-search',
    TEMPLATE_LIBRARY_SEARCH_NEW       : 'template-library-search.new',
    TEMPLATE_LIBRARY_SEARCH_EDIT      : 'template-library-search.edit',
    TEMPLATE_LIBRARY_SEARCH_EDIT_BULK : 'template-library-search.edit-bulk',
    JOBS                              : 'jobs',
    JOBS_SEARCH                       : 'jobs-search',
    JOBS_PROVIDER                     : 'jobs-provider',
    JOBS_PROVIDER_SEARCH              : 'jobs-provider-search',
    JOB_NEW                           : 'job-new',
    JOB_EDIT                          : 'job-edit',
    JOB_CHECKLIST                     : 'job-checklist',
    JOB_CHECKLIST_CATEGORY            : 'job-checklist.category',
    JOB_CHECKLIST_STATUS              : 'job-checklist.status',
    JOB_CHECKLIST_REVIEW              : 'job-checklist-review',
    JOB_CHECKLIST_REVIEW_CATEGORY     : 'job-checklist-review.category',
    PROVIDERS                         : 'providers',
    USERS                             : 'users',
    USER_EDIT                         : 'user-edit',
    USER_REGISTER                     : 'user-register',
    USER_SETTINGS                     : 'user-settings'
};

const SYNC_STATUS = {
    UP      : 'sync-up',
    DOWN    : 'sync-down',
    ERROR   : 'sync-error',
    OFFLINE : 'sync-offline'
};

export default {
    CATEGORIES,
    CATEGORY_PROGRESS,
    CHECKLIST_ITEM_STATUS,
    CONTEXT,
    DIALOG,
    DROPDOWN,
    IMAGES,
    JOB_PAGE_TAB,
    JOB_STATUS,
    JOB_PROGRESS,
    MANUFACTURERS,
    MESSAGING,
    MODAL,
    POPOVER,
    ANY,
    JOB_TYPES,
    RATING_TYPES,
    RESPONSES,
    SEARCH_PARAMS,
    HOUSE_PLANS_SEARCH_PARAMS,
    STATE_NAME,
    STATUS,
    STATUS_CLASSNAME,
    SYNC_STATUS,
    USER_TYPE
};
