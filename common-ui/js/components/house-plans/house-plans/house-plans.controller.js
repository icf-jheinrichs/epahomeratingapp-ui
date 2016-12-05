class HousePlanController {
    constructor () {
        'ngInject';

    }

    $onInit () {
        this.housePlans = [
            {
                '_id'              : '12345678',
                'FileName'         : 'amicalola-cottage.xml',
                'Name'             : 'Amicalola Cottage',
                'Builder'          : 'Bob the Builder',
                'CommunityName'    : 'Sandy Beach',
                'SubplanName'      : 'Four Season Patio',
                'HvacDesignReport' : [{
                    'id'       : '12345678',
                    'FileName' : 'Report_File_Name_A.pdf'
                }],
                'RaterDesignReviewChecklist' : [{
                    'id'       : '12345678',
                    'FileName' : 'Checklist_File_Name_A.pdf'
                }]
            },
            {
                '_id'              : '21345678',
                'FileName'         : 'sunbury-ii.xml',
                'Name'             : 'Sunbury II',
                'Builder'          : 'Sam the Builder',
                'CommunityName'    : 'Waves of Grain',
                'SubplanName'      : '',
                'HvacDesignReport' : [{
                    'id'       : '21345678',
                    'FileName' : 'Report_File_Name_A.pdf'
                }],
                'RaterDesignReviewChecklist' : [{
                    'id'       : '21345678',
                    'FileName' : 'Checklist_File_Name_A.pdf'
                }]
            }
        ];
    }
}

export default HousePlanController;
