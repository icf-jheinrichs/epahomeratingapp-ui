module.exports = [
    {
        '_id'                  : '12345678',
        'RatingType'           : 'energy-star',
        'Primary'              : {
            'HouseId'              : '12345678',
            'BuilderId'            : '12345678',
            'HousePlanId'          : ['12345678'],
            'AddressInformation'   : {
                'Address1'         : '100 Cherry Ln',
                'CityMunicipality' : 'Fairfax',
                'StateCode'        : 'VA',
                'ZipCode'          : '22031'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'cherry-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'cherry-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [{
            'HouseId'              : '23456781',
            'BuilderId'            : '12345678',
            'HousePlanId'          : ['12345678'],
            'AddressInformation'   : {
                'Address1'         : '102 Cherry Ln',
                'CityMunicipality' : 'Fairfax',
                'StateCode'        : 'VA',
                'ZipCode'          : '22031'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'cherry-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'cherry-ln-rater-review-checklist.pdf'
            }]
        }],
        'Status'               : 'Complete',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 100,
                'MustCorrect'   : 0,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 100,
                'MustCorrect'   : 0,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : false,
        'ReturnedFromProvider' : false,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    },
    {
        '_id'                  : '87654321',
        'RatingType'           : 'hers',
        'Primary'              : {
            'HouseId'              : '12345678',
            'BuilderId'            : '12345678',
            'HousePlanId'          : ['12345678'],
            'AddressInformation'   : {
                'CommunityName'    : 'Whispering Springs',
                'LotNo'            : '113'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'cherry-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'cherry-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [],
        'Status'               : 'Active',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 78,
                'MustCorrect'   : 8,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 20,
                'MustCorrect'   : 4,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : false,
        'ReturnedFromProvider' : false,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    },
    {
        '_id'                  : '18273645',
        'RatingType'           : 'energy-star',
        'Primary'              : {
            'HouseId'              : '18273645',
            'BuilderId'            : '18273645',
            'HousePlanId'          : ['18273645'],
            'AddressInformation'   : {
                'ManualId'         : '12a'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'cherry-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'cherry-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [{
            'HouseId'              : '23456781',
            'BuilderId'            : '12345678',
            'HousePlanId'          : ['12345678'],
            'AddressInformation'   : {
                'Address1'         : '100 Cherry Ln',
                'CityMunicipality' : 'Fairfax',
                'StateCode'        : 'VA',
                'ZipCode'          : '22031'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'cherry-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'cherry-ln-rater-review-checklist.pdf'
            }]
        }],
        'Status'               : 'Active',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 12,
                'MustCorrect'   : 8,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 1,
                'MustCorrect'   : 1,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : false,
        'ReturnedFromProvider' : true,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    },
    {
        '_id'                  : '81726354',
        'RatingType'           : 'hers',
        'Primary'              : {
            'HouseId'              : '81726354',
            'BuilderId'            : '81726354',
            'HousePlanId'          : ['81726354'],
            'AddressInformation'   : {
                'Address1'         : '100 Peach Ln',
                'CityMunicipality' : 'Gaithersburg',
                'StateCode'        : 'MD',
                'ZipCode'          : '20877'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [{
            'HouseId'              : '23456781',
            'BuilderId'            : '81726354',
            'HousePlanId'          : ['81726354'],
            'AddressInformation'   : {
                'Address1'         : '103 Peach Ln',
                'CityMunicipality' : 'Gaithersburg',
                'StateCode'        : 'MD',
                'ZipCode'          : '20877'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        }],
        'Status'               : 'Active',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 12,
                'MustCorrect'   : 8,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 1,
                'MustCorrect'   : 1,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : false,
        'ReturnedFromProvider' : false,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    },
    {
        '_id'                  : '45362718',
        'RatingType'           : 'hers',
        'Primary'              : {
            'HouseId'              : '45362718',
            'BuilderId'            : '45362718',
            'HousePlanId'          : ['45362718'],
            'AddressInformation'   : {
                'CommunityName'    : 'Gravity Falls',
                'LotNo'            : '325'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [{
            'HouseId'              : '56781234',
            'BuilderId'            : '45362718',
            'HousePlanId'          : ['45362718'],
            'AddressInformation'   : {
                'CommunityName'    : 'Gravity Falls',
                'LotNo'            : '327'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        },
        {
            'HouseId'              : '56781235',
            'BuilderId'            : '45362718',
            'HousePlanId'          : ['45362718'],
            'AddressInformation'   : {
                'CommunityName'    : 'Gravity Falls',
                'LotNo'            : '323'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        }],
        'Status'               : 'Active',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 0,
                'MustCorrect'   : 0,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 0,
                'MustCorrect'   : 0,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : true,
        'ReturnedFromProvider' : false,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    },
    {
        '_id'                  : '21876543',
        'RatingType'           : 'energy-star',
        'Primary'              : {
            'HouseId'              : '21876543',
            'BuilderId'            : '21876543',
            'HousePlanId'          : ['21876543'],
            'AddressInformation'   : {
                'ManualId'         : 'U473t8+3'
            },
            'Photo'            : [],
            'HvacDesignReport' : [{
                'id'       : 'a8a7sdf098b9a87',
                'FileName' : 'peach-ln-design-report.pdf'
            }],
            'RaterDesignReviewChecklist' : [{
                'id'       : '9c8bn8cv7648saf',
                'FileName' : 'peach-ln-rater-review-checklist.pdf'
            }]
        },
        'Secondary'            : [],
        'Status'               : 'Active',
        'Progress'             : {
            'PreDryWall' : {
                'Verified'      : 0,
                'MustCorrect'   : 0,
                'Total'         : 100
            },
            'Final' : {
                'Verified'      : 0,
                'MustCorrect'   : 0,
                'Total'         : 100
            }
        },
        'InternalReview'       : false,
        'ReturnedFromInternal' : false,
        'ReturnedFromProvider' : false,
        'History'              : {
            'Description'   : 'Updated',
            'User'          : 'Jon Doe',
            'DateTime'      : '10:20am, 1/10/2016'
        }
    }
];
