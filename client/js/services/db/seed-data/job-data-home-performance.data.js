export default [
    {
        '_id'            : '12345678:12345678',
        'DisplayVerion'  : '1.0',
        'ChecklistItems' : {
            '78' : {
                'Foundation' : [
                    {
                        'FoundationType' : 'String() enum:foundationType',
                        'ThermalBoundry' : 'String() enum:thermBoundary',
                        'CrawlSpaceType' : 'String() enum:crawlSpaceType',
                    }
                ],
                'Slab' : [
                    {
                        'Name'                      : 'String() max:20',
                        'SlabTypeName'              : 'String() max:20',
                        'PerimeterInsulationRValue' : 'Float() min:0 max:99 precision:1',
                        'PerimeterInsulationDepth'  : 'Float() min:0 max:99 precision:1',
                        'UnderSlabRValue'           : 'Float() min:0 max:99 precision:1',
                        'UnderSlabInsulationWidth'  : 'Float() min:0 max:99 precision:1',
                        'InsulationGrade'           : 'String() enum:InsGradeEnum',
                        'Area'                      : 'Float() min:0 max:99999.9 precision:1',
                        'DepthBelowGrade'           : 'Float() min:0 max:99 precision:1',
                        'Perimeter'                 : 'Float() min:0 max:9990 precision:1',
                        'ExposedPerimeter'          : 'Float() min:0 max:9990 precision:1',
                        'OnGradeExposedPerimeter'   : 'Float() min:0 max:9990 precision:1',
                        'FloorCovering'             : 'String() type:coveringType',
                        'RadiantSlab'               : 'String() enum:yesNoEnum'
                    }
                ],
                'FrameFloor' : [
                    {
                        'Name'                      : 'String() max:20',
                        'FloorTypeName'             : 'String() max:20',
                        'ContinousInsulationRValue' : 'Float() min:0 max:100 precision:1',
                        'CavityInsulationRValue'    : 'Float() min:0 max:100 precision:1',
                        'InsulationGrade'           : 'String() enum:InsGradeEnum',
                        'Area'                      : 'Float() min:0 max:99999.9 precision:1',
                        'Location'                  : 'String() type:location',
                        'FramingFactor'             : 'Float() min:0 max:1 precision:4',
                        'DefaultFramingFactor'      : 'Boolean()',
                        'FloorCovering'             : 'String() type:floorCovering',
                        'CavityInsulationThickness' : 'Float() min:0 max:36 precision:1',
                        'Spacing'                   : 'Float() min:10 max:50 precision:1',
                        'JoistWidth'                : 'Float() min:0 max:99 precision:1',
                        'JoistHeight'               : 'Float() min:0 max:99 precision:1'
                    }
                ],
                'FoundationWall' : [
                    {
                        'Name'                                : 'String() max:20',
                        'FoundationwallTypeName'              : 'String() max:20',
                        'Type'                                : 'String() type:type',
                        'ExteriorInsulationRValue'            : 'Float() min:0 max:99 precision:1',
                        'InteriorInsulationContinuousRValue'  : 'Float() min:0 max:99 precision:1',
                        'InteriorInsulationFrameCavityRValue' : 'Float() min:0 max:99 precision:1',
                        'InsulationGrade'                     : 'String() enum:InsGradeEnum',
                        'Location'                            : 'String() enum:InsGradeEnum',
                        'Length'                              : 'Float() min:0 max:36 precision:1',
                        'Height'                              : 'Float() min:0 max:36 precision:1',
                        'AboveGradeDepth'                     : 'Float() min:0 max:100 precision:1',
                        'BelowGradeDepth'                     : 'Float() min:0 max:100 precision:1',
                        'Thickness'                           : 'Float() min:0 max:36 precision:1',
                        'Material'                            : 'String() type:studtype',
                        'ExteriorInsulationTopEdge'           : 'Float() min:0 max:99 precision:1',
                        'ExteriorInsulationTopEdgeType'       : 'String() enum:fwallInsulationEnum',
                        'ExteriorInsulationBottomEdge'        : 'Float() min:0 max:99 precision:1',
                        'ExteriorInsulationBottomEdgeType'    : 'String() enum:fwallInsulationEnum',
                        'InteriorInsulationTopEdge'           : 'Float() min:0 max:99 precision:1',
                        'InteriorInsulationTopEdgeType'       : 'String() enum:fwallInsulationEnum',
                        'InteriorInsulationBottomEdge'        : 'Float() min:0 max:99 precision:1',
                        'InteriorInsulationBottomEdgeType'    : 'String() enum:fwallInsulationEnum'
                    }
                ]
            }
        }
    }
];
