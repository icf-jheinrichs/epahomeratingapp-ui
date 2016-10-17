export default [
    {
        '_id'            : '12345678:12345678',
        'DisplayVerion'  : '1.0',
        'ChecklistItems' : {
            '77' : {
                'BuildingSummary' : [
                    {
                        'ResidentialFacilityType': 'String() enum:housingType',
                        'BuildingLevelType': 'String() enum:bldgLevelType',
                        'NumberofFloors': 'String() enum:numFloors',
                        'NumberofConditionedFloors': 'String() enum:numFloorsWithCondBsmt',
                        'ConditionedFloorArea': 'Int() min:0 max:99999',
                        'BuildingVolume': 'Int() min:0 max:999999',
                        'NumberofBedrooms': 'Int() min:0 max:999',
                        'YearBuilt': 'Int() min:0 max:9999',
                    }
                ]
            },
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
            },
            '79' : {
                'Wall' : [
                    {
                        'Name': 'String() max:30',
                        'WallTypeName': 'String() max:30',
                        'WallType': 'String() type:constructionType',
                        'ContinousInsulationRValue': 'Float() min:0 max:100 precision:1',
                        'FrameCavityInsulationRValue': 'Float() min:0 max:100 precision:1',
                        'BlockCavityInsulationRValue': 'Float() min:0 max:100 precision:1',
                        'InsulationGrade': 'String() enum:InsGradeEnum',
                        'Location': 'String() enum:agwallLocationEnum',
                        'Color': 'String() type:exteriorColor',
                        'FramingFactor': 'Float() min:0 max:1 precision:4',
                        'DefaultFramingFactor': 'Boolean()',
                        'Area': 'Float() min:0 max:99999.9 precision:1',
                        'StudSpacing': 'Float() min:10 max:50 precision:1',
                        'StudWidth': 'Float() min:0 max:10 precision:1',
                        'StudDepth': 'Float() min:0 max:36 precision:1',
                        'CavityInsulationThickness': 'Float() min:0 max:36 precision:1',
                        'GypsumThickness': 'Float() min:0 max:9.999 precision:3',
                        'CavityInsulationThickness': 'Float() min:0 max:36 precision:1',
                        'GypsumThickness': 'Float() min:0 max:9.999 precision:3'
                    }
                ]
            },
            '80' : {
                'Roof' : [
                    {
                        'Name': 'String() max:30',
                        'CeilingTypeName': 'String() enum:thermBoundary',
                        'CeilingType': 'String() type:type',
                        'ContinousInsulationRValue': 'Float() min:0 max:125 precision:1',
                        'CavityInsulationRValue': 'Float() min:0 max:100 precision:1',
                        'CavityInsulationGrade': 'String() enum:InsGradeEnum',
                        'RadiantBarrier': 'String() enum:yesNoEnum',
                        'RoofColor': 'String() type:exteriorColor',
                        'FramingFactor': 'Float() min:0 max:1 precision:4',
                        'DefaultFramingFactor': 'Boolean()',
                        'CeilingArea': 'Float() min:0 max:99999.9 precision:1',
                        'ClayTile': 'String() enum:yesNoEnum',
                        'Ventilation': 'String() enum:yesNoEnum',
                        'ChordSpacing': 'Float() min:10 max:50 precision:1',
                        'ChordWidth': 'Float() min:0 max:10 precision:1',
                        'ChordHeight': 'Float() min:0 max:36 precision:1',
                        'CavityInsulationThickness': 'Float() min:0 max:36 precision:1',
                        'GypsumThickness': 'Float() min:0 max:9.999 precision:3',
                        'RoofArea': 'Float() min:0 max:99999.9 precision:3',
                    }
                ]
            },
            '81' : {
                'RimJoist' : [
                    {
                        "Name": "String() max:20",
                        "ContinuousInsulationRValue": "Float() min:0 max:99 precision:1",
                        "CavityInsulationRValue": "Float() min:0 max:99 precision:1",
                        "InsulationGrade": "String() enum:InsGradeEnum",
                        "Location": "String() enum:agwallLocationEnum",
                        "Area": "Float() min:0 max:999 precision:1",
                        "Spacing": "Float() min:10 max:50 precision:1",
                        "Thickness": "Float() min:0 max:99 precision:1"
                    }
                ]
            },
            '83' : {
                'Window' : [
                    {
                        'Name': 'String() max:20',
                        'WindowTypeName': 'String() max:30',
                        'UFactor': 'Float() min:0 max:327.670 precision:3',
                        'SHGC': 'Float() min:0 max:1 precision:3',
                        'Orientation': 'String() enum:orientationEnum',
                        'AttachedToWall': 'String() type:IDREF',
                        'Area': 'Float() min:0 max:999 precision:1',
                        'Depth': 'Float() min:0 max:99 precision:1',
                        'DistanceToBottomOfWindow': 'Float() min:0 max:99 precision:1',
                        'DistanceToTopOfWindow': 'Float() min:0 max:99 precision:1',
                        'InteriorWinterShading': 'Float() min:0.10 max:1 precision:2',
                        'InteriorSummerShading': 'Float() min:0.10 max:1 precision:2',
                        'AdjacentWinterShading': 'String() enum:adjShadingEnum',
                        'AdjacentSummerShading': 'String() enum:adjShadingEnum'
                    }
                ]
            },
            '86' : {
                'AirInfiltrationMeasurement' : [
                    {
                        'TypeOfBlowerDoorTest': 'String() type:measType',
                        'HeatingSeasonValue': 'Decimal',
                        'CoolingSeasonValue': 'Decimal',
                        'Units': 'String() type:units',
                        'ShelterClass': 'String() enum:shelterClass',
                        'CodeVerification': 'String() type:codeVerification',
                    }
                ]
            },
            '87' : {
                'DuctLeakageMeasurement' : [
                    {
                        'Name': 'String()',
                        'HeatingSystem': 'String() type:IDREF',
                        'CoolingSystem': 'String() type:IDREF',
                        'ConditionedFloorAreaServed': 'Float() min:0 max:99999.9',
                        'LeakageInputType': 'String() type:leakageInputType',
                        'DefaultLeakage': 'String() type:qualitativeDefault',
                        'SupplyLeakageToOutside': 'Float() min:0',
                        'ReturnLeakageToOutside': 'Float() min:0',
                        'TotalLeakageToOutside': 'Float() min:0',
                        'LeakageToOutsideUnits': 'String() enum:ductLeakUnitsEnum',
                        'LeakageTestExemption': 'Boolean',
                        'TotalLeakageConditions': 'String() type:ductLeakTightTest',
                        'TotalLeakage': 'Float() min:0',
                        'NumberofReturnedGrilles': 'Int() min:0',

                        '1stLocation': 'String() type:location',
                        '1stSupplyArea': 'Int() min:0 max:100',
                        '1stReturnArea': 'Int() min:0 max:100',
                        '1stSupplyRValue': 'Float() min:0',
                        '1stReturnRValue': 'Float() min:0',

                        '2ndLocation': 'String() type:location',
                        '2ndSupplyArea': 'Int() min:0 max:100',
                        '2ndReturnArea': 'Int() min:0 max:100',
                        '2ndSupplyRValue': 'Float() min:0',
                        '2ndReturnRValue': 'Float() min:0',

                        '3rdLocation': 'String() type:location',
                        '3rdSupplyArea': 'Int() min:0 max:100',
                        '3rdReturnArea': 'Int() min:0 max:100',
                        '3rdSupplyRValue': 'Float() min:0',
                        '3rdReturnRValue': 'Float() min:0',

                        '4thLocation': 'String() type:location',
                        '4thSupplyArea': 'Int() min:0 max:100',
                        '4thReturnArea': 'Int() min:0 max:100',
                        '4thSupplyRValue': 'Float() min:0',
                        '4thReturnRValue': 'Float() min:0',

                        '5thLocation': 'String() type:location',
                        '5thSupplyArea': 'Int() min:0 max:100',
                        '5thReturnArea': 'Int() min:0 max:100',
                        '5thSupplyRValue': 'Float() min:0',
                        '5thReturnRValue': 'Float() min:0',

                        '6thLocation': 'String() type:location',
                        '6thSupplyArea': 'Int() min:0 max:100',
                        '6thReturnArea': 'Int() min:0 max:100',
                        '6thSupplyRValue': 'Float() min:0',
                        '6thReturnRValue': 'Float() min:0',

                        'SupplyDuctSurfaceArea': 'Float() min:0',
                        'ReturnDuctSurfaceArea': 'Float() min:0'
                    }
                ]
            },
            '93' : {
                'WaterHeatingSystem' : [
                    {
                        'AllFixuresLowFlow': 'Boolean',
                        'AllPipesInsulated': 'Boolean',
                        'RecircLoopType': 'String() type:recirculationType',
                        'FarthestFixtureDist': 'Float() min:0 max:9999.99',
                        'TotalRecircLoopLength': 'Float() min:0 max:9999.99',
                        'RecircPumpPower': 'Float() min:0 max:9999.99',
                        'DrainWaterHeatRec': 'Boolean',
                        'DWHREfficiency': 'Float() min:0 max:999.0',
                        'DWHRPreheatsColdSupply': 'Boolean',
                        'DWHRPreheatsHotSupply': 'Boolean',
                        'ShowerheadsQty': 'Int() min:0 max:100',
                        'ShowerheadsConnectedToDWHR': 'Int() min:0 max:100'
                    }
                ]
            },
            '94' : {
                'HVACControl' : [
                    {
                        'PstatForHeatingSystem': 'Boolean',
                        'PstatForCoolingSystem': 'Boolean',
                    }
                ]
            },
            '95' : {
                'LightingFractions' : [
                    {
                        'FractionCFL': 'Float() min:0 max:100.0 precision:1',
                        'FractionLFL': 'Float() min:0 max:100.0 precision:1',
                        'FractionGarLight': 'Float() min:0 max:100.0 precision:1',
                        'FractionExtLight': 'Float() min:0 max:100.0 precision:1'
                    }
                ]
            },
            '96' : {
                'Refrigerator' : [
                    {
                        "RatedAnnualkWh": "Int() min:0 max:9999",
                        "Location": "String() enum:lightAppRatingLocEnum"
                    }
                ]
            },
            '97' : {
                'Dishwasher' : [
                    {
                        "RatedAnnualkWh": "Int() min:0 max:9999",
                        "EnergyFactor": "String()",
                        "Capacity": "Int() min:0 max:9999"
                    }
                ]
            },
            '98' : {
                'Oven' : [
                    {
                        "FuelType": "String() enum:fuelEnum",
                        "InductionRange": "Boolean()",
                        "ConventionOven": "Boolean()"
                    }
                ]
            },
            '101' : {
                'CeilingFan' : [
                    {
                        'Efficiency': 'Float() type:CeilingFanCFMWatt'
                    }
                ]
            },
            '102' : {
                'VentilationFan' : [
                    {
                        'FanType': 'String() type: mechVentType',
                        'RatedFlowRate': 'int() min:0 max:99999',
                        'HoursInOperation': 'Float() min:0 max:24.0 precision:1',
                        'FanPower': 'Float() min:0 max:9999.9 precision:1',
                        'SensibleRecoveryEfficiency': 'Float() min:0 max:100.0 precision:1',
                        'TotalRecoveryEfficiency': 'Float() min:0 max:100.0 precision:1',
                        'ECMFanMotor': 'Boolean()'
                    }
                ]
            },
            '104' : {
                'Wall' : [
                    {
                        'Thickness': 'Float() min:0 max:327.67 precision:2'
                    }
                ],
                'BuildingConstrustion' : [
                    {
                        'Name': 'String() maxLength:20',
                        'Location': 'String() type:location',
                        'Area': 'Float() min:0 max:3276.7 precision:1',
                        'Thickness': 'Float() min:0 max:99.0 precision:1',
                        'Type': 'String() Enum:massTypeEnum'
                    }
                ]
            }
        }
    }
];
