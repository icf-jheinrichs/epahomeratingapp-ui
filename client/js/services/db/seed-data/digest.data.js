export default {
    'type'           : 'DisplayDigest',
    '_id'            : 'displaydigest:stable',
    'Version'        : '1.0',
    'ChecklistItems' : {
        '1' : {
            'Type'             : 'MRF',
            'Shorthand'        : 'Fenestration matches proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : false
            }
        },
        '2' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Insulation levels match proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : false
            }
        },

        '3' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Insulation is Grade I',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : false
            }
        },

        '9' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Air barrier at floors above unconditioned space and at cantilevered floors',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '33' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Continuous top plate or blocking at top of walls, and sealed',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '34' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Drywall sealed to top plates',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : true,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '47' : {
            'Type'             : 'Default',
            'Shorthand'        : 'All duct boots sealed to finished surface.',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '76' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Ceiling fan junction boxes installed per specs. in Item 4.3 of Rater Design Review Checklist',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : false
            }
        },
        '78' : {
            'Type'             : 'MRF',
            'Shorthand'        : 'Floor / foundation assemblies match proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            },
            'Sections' : [
                {
                    'Name'    : 'Foundation',
                    'Key'     : 'Foundation',
                    'Columns' : [
                        {
                            'Name'         : 'Foundation Type',
                            'Key'          : 'FoundationType',
                            'Type'         : 'List:foundationType',
                        },
                        {
                            'Name'         : 'Thermal Boundary Loc.',
                            'Key'          : 'ThermalBoundry',
                            'Type'         : 'List:thermBoundary',
                        },
                        {
                            'Name'         : 'Crawl Space Type',
                            'Key'          : 'CrawlSpaceType',
                            'Type'         : 'List:crawlSpaceType',
                        }
                    ]
                },
                {
                    'Name'    : 'Slabs',
                    'Key'     : 'Slab',
                    'Columns' : [
                        {
                            'Name'         : 'Name',
                            'Key'          : '',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Slab Type Name',
                            'Key'          : '',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Perimeter Ins (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:perimeterInsRVal',
                        },
                        {
                            'Name'         : 'Perimeter Ins Depth (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:perimeterInsDepth',
                        },
                        {
                            'Name'         : 'Under-Slab Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:unSlabInsRVal',
                        },
                        {
                            'Name'         : 'Under-Slab Ins. Width (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:unSlabInsWidth',
                        },
                        {
                            'Name'         : 'Slab Ins. Grade',
                            'Key'          : '',
                            'Type'         : 'List:InsulGrade',
                        },
                        {
                            'Name'         : 'Area (sq ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:area',
                        },
                        {
                            'Name'         : 'Depth Below Grade (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:depthBelowGrade',
                        },
                        {
                            'Name'         : 'Full Perimeter (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:fullPerimeter',
                        },
                        {
                            'Name'         : 'Total Exp. Perimeter (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:exposedPerimeter',
                        },
                        {
                            'Name'         : 'On-Grade Exp. Perimeter (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:onGradeExposedPerimeter',
                        },
                        {
                            'Name'         : 'Floor Covering',
                            'Key'          : '',
                            'Type'         : 'List:coveringType',
                        },
                        {
                            'Name'         : 'Radiant Slab?',
                            'Key'          : '',
                            'Type'         : 'List:radiantSlab',
                        }
                    ]
                },
                {
                    'Name'    : 'Floors',
                    'Key'     : 'FrameFloor',
                    'Columns' : [
                        {
                            'Name'         : 'Name',
                            'Key'          : '',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Floor Type Name',
                            'Key'          : '',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Cont. Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:continousInsRval',
                        },
                        {
                            'Name'         : 'Cavity Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:cavityInsRVal',
                        },
                        {
                            'Name'         : 'Cavity Ins. Grade',
                            'Key'          : '',
                            'Type'         : 'List:cavityInsGrade',
                        },
                        {
                            'Name'         : 'Area (sq ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:area',
                        },
                        {
                            'Name'         : 'Location',
                            'Key'          : '',
                            'Type'         : 'List:location',
                        },
                        {
                            'Name'         : 'Framing Factor',
                            'Key'          : '',
                            'Type'         : 'Decimal:framingFactor',
                        },
                        {
                            'Name'         : 'Use Default Framing Factor?',
                            'Key'          : '',
                            'Type'         : 'Boolean:defaultFramingFactor',
                        },
                        {
                            'Name'         : 'Floor Covering',
                            'Key'          : '',
                            'Type'         : 'List:floorCovering',
                        },
                        {
                            'Name'         : 'Cavity Ins. Thickness (in)',
                            'Key'          : '',
                            'Type'         : 'Decimal:cavityInsThickness',
                        },
                        {
                            'Name'         : 'Joist Spacing (in oc)',
                            'Key'          : '',
                            'Type'         : 'Decimal:joistSpacing',
                        },
                        {
                            'Name'         : 'Joist Width (in)',
                            'Key'          : '',
                            'Type'         : 'Decimal:joistWidth',
                        },
                        {
                            'Name'         : 'Joist Height (in)',
                            'Key'          : '',
                            'Type'         : 'Decimal:joistHeight',
                        }
                    ]
                },
                {
                    'Name'    : 'Foundation Walls',
                    'Key'     : 'FoundationWall',
                    'Columns' : [
                        {
                            'Name'         : 'Name',
                            'Key'          : '',
                            'Order'        : '1',
                            'DisplayLogic' : 'Display',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Found. Wall Type Name',
                            'Key'          : '',
                            'Type'         : 'alphanumeric:name',
                        },
                        {
                            'Name'         : 'Found. Wall Construction',
                            'Key'          : '',
                            'Type'         : 'List:type',
                        },
                        {
                            'Name'         : 'Ext. Cont. Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:exteriorInsRVal',
                        },
                        {
                            'Name'         : 'Int. Cont. Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:interiorInsContinuousRval',
                        },
                        {
                            'Name'         : 'Int. Cavity Ins. (R)',
                            'Key'          : '',
                            'Type'         : 'Decimal:interiorInsFrameCavityRVal',
                        },
                        {
                            'Name'         : 'Cavity Ins. Grade',
                            'Key'          : '',
                            'Type'         : 'List:cavityInsGrade',
                        },
                        {
                            'Name'         : 'Location',
                            'Key'          : '',
                            'Type'         : 'List:location',
                        },
                        {
                            'Name'         : 'Length (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:length',
                        },
                        {
                            'Name'         : 'Height (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:height',
                        },
                        {
                            'Name'         : 'Height Above Grade (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:heightAboveGrade',
                        },
                        {
                            'Name'         : 'Depth Below Grade (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:depthBelowGrade',
                        },
                        {
                            'Name'         : 'Wall Thickness (in)',
                            'Key'          : '',
                            'Type'         : 'Decimal:thickness',
                        },
                        {
                            'Name'         : 'Stud Type',
                            'Key'          : '',
                            'Type'         : 'List:studtype',
                        },
                        {
                            'Name'         : 'Ext. Ins. Top Edge Dist. (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:exteriorInsTopEdge',
                        },
                        {
                            'Name'         : 'Ext. Ins. Top Edge Ref.',
                            'Key'          : '',
                            'Type'         : 'List:exteriorInsTopEdgeType',
                        },
                        {
                            'Name'         : 'Ext. Ins. Bottom Edge Dist. (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:exteriorInsBottomEdge',
                        },
                        {
                            'Name'         : 'Ext. Ins. Bottom Edge Ref.',
                            'Key'          : '',
                            'Type'         : 'List:exteriorInsBottomEdgeType',
                        },
                        {
                            'Name'         : 'Int. Ins. Top Edge Dist. (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:interiorInsTopEdge',
                        },
                        {
                            'Name'         : 'Int. Ins. Top Edge Ref.',
                            'Key'          : '',
                            'Type'         : 'List:interiorInsTopEdgeType',
                        },
                        {
                            'Name'         : 'Int. Ins. Bottom Edge Dist. (ft)',
                            'Key'          : '',
                            'Type'         : 'Decimal:interiorInsBottomEdge',
                        },
                        {
                            'Name'         : 'Int. Ins. Bottom Edge Ref.',
                            'Key'          : '',
                            'Type'         : 'List:interiorInsBottomEdgeType',
                        }
                    ]
                }
            ]
        },
        '87' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Duct systems match proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '94' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Thermostats match proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        },

        '95' : {
            'Type'             : 'Default',
            'Shorthand'        : 'Lighting matches proposed design',
            'ShorthandFormula' : '',
            'Footnotes'        : '',
            'ResponseOptions'  : {
                'MustCorrect'     : true,
                'BuilderVerified' : false,
                'RaterVerified'   : true,
                'NotApplicable'   : true
            }
        }

    }
};
