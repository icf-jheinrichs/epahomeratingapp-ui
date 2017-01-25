module.exports = {
    'JobId'          : '12345678',
    'DisplayVerion'  : '1.0',
    'ChecklistItems' : {
        '1' : {
            'PreDryWall' : {
                'ExteriorWalls' : {
                    'Response' : 'RaterVerified'
                },
                'CeilingsRoofs' : {
                    'Response' : ''
                }
            }
        },
        '2' : {
            'PreDryWall' : {
                'ExteriorWalls' : {
                    'Response' : 'RaterVerified'
                },
                'CeilingsRoofs' : {
                    'Response' : ''
                }
            }
        },
        '3' : {
            'PreDryWall' : {
                'SlabsFloorsRimJoists' : {
                    'Response'  : 'RaterVerified',
                    'MRFValues' : [
                        {
                            'ResidentialFacilityType'   : 'String() enum:housingType',
                            'BuildingLevelType'         : 'String() enum:bldgLevelType',
                            'NumberofFloors'            : 'String() enum:numFloors',
                            'NumberofConditionedFloors' : 'String() enum:numFloorsWithCondBsmt',
                            'ConditionedFloorArea'      : 'Int() min:0 max:99999',
                            'BuildingVolume'            : 'Int() min:0 max:999999',
                            'NumberofBedrooms'          : 'Int() min:0 max:999',
                            'YearBuilt'                 : 'Int() min:0 max:9999'
                        }
                    ],
                    'Comment' : {
                        'Content'  : '',
                        'PhotoURL' : ''
                    }
                }
            }
        }
    }
};
