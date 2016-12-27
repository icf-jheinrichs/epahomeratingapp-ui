export default [
    {
        '_id'            : '12345678:12345678',
        'DisplayVerion'  : '1.0',
        'ChecklistItems' : {
            '77' : {
                'BuildingSummary' : [
                    {
                        'ResidentialFacilityType': 'Apartment, end unit',
                        'BuildingLevelType': 'None',
                        'NumberofFloors': '1',
                        'NumberofConditionedFloors': '1',
                        'ConditionedFloorArea': '2530',
                        'BuildingVolume': '22770',
                        'NumberofBedrooms': '4',
                        'YearBuilt': '2015',
                    }
                ]
            },
            '78' : {
                'Foundation' : [
                    {
                        'FoundationType' : 'None',
                        'ThermalBoundry' : 'N/A',
                        'CrawlSpaceType' : 'N/A',
                    }
                ],
                'Slab' : [
                    {
                        'Name'                      : 'slab',
                        'SlabTypeName'              : 'Uninsulated',
                        'PerimeterInsulationRValue' : '0.0',
                        'PerimeterInsulationDepth'  : '0.0',
                        'UnderSlabRValue'           : '0.0',
                        'UnderSlabInsulationWidth'  : '0.0',
                        'InsulationGrade'           : 'I',
                        'Area'                      : '2530.0',
                        'DepthBelowGrade'           : '0',
                        'Perimeter'                 : '253.0',
                        'ExposedPerimeter'          : '253.0',
                        'OnGradeExposedPerimeter'   : '253.0',
                        'FloorCovering'             : 'Carpet',
                        'RadiantSlab'               : 'No'
                    }
                ],
                'FrameFloor' : [
                    {
                        'Name'                      : 'rando',
                        'FloorTypeName'             : 'R-30***',
                        'ContinousInsulationRValue' : '0.0',
                        'CavityInsulationRValue'    : '30.0',
                        'InsulationGrade'           : 'III',
                        'Area'                      : '2500',
                        'Location'                  : 'Between conditioned space and ambient conditions',
                        'FramingFactor'             : '0.1300',
                        'DefaultFramingFactor'      : 'true',
                        'FloorCovering'             : 'Carpet',
                        'CavityInsulationThickness' : '10.0',
                        'Spacing'                   : '16.0',
                        'JoistWidth'                : '1.5',
                        'JoistHeight'               : '11.5'
                    }
                ],
                'FoundationWall' : [
                    {
                        'Name'                                : 'rando',
                        'FoundationwallTypeName'              : 'R-19 Draped, Full',
                        'Type'                                : 'Solid concrete or stone',
                        'ExteriorInsulationRValue'            : '0.0',
                        'InteriorInsulationContinuousRValue'  : '19.0',
                        'InteriorInsulationFrameCavityRValue' : '0.0',
                        'InsulationGrade'                     : 'III',
                        'Location'                            : 'Between conditioned space and ambient/ground',
                        'Length'                              : '200.0',
                        'Height'                              : '8.0',
                        'AboveGradeDepth'                     : '2.0',
                        'BelowGradeDepth'                     : '6.0',
                        'Thickness'                           : '6.0',
                        'Material'                            : 'None',
                        'ExteriorInsulationTopEdge'           : '0.0',
                        'ExteriorInsulationTopEdgeType'       : 'from top of wall',
                        'ExteriorInsulationBottomEdge'        : '0.0',
                        'ExteriorInsulationBottomEdgeType'    : 'below grade',
                        'InteriorInsulationTopEdge'           : '0.0',
                        'InteriorInsulationTopEdgeType'       : 'from top of wall',
                        'InteriorInsulationBottomEdge'        : '0.0',
                        'InteriorInsulationBottomEdgeType'    : 'from bottom of wall'
                    }
                ]
            },
            '79' : {
                'Wall' : [
                    {
                        'Name': '2x4 AGW',
                        'WallTypeName': 'R-13 + R-4 Con ins*******',
                        'WallType': 'Standard Wood Frame',
                        'ContinousInsulationRValue': '4.0',
                        'FrameCavityInsulationRValue': '13.0',
                        'BlockCavityInsulationRValue': '0.0',
                        'InsulationGrade': 'I',
                        'Location': 'Between enclosed crawl and ambient',
                        'Color': 'Medium',
                        'FramingFactor': '0.2300',
                        'DefaultFramingFactor': 'true',
                        'Area': '1858.2',
                        'StudSpacing': '16.0',
                        'StudWidth': '1.5',
                        'StudDepth': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.00'
                    }
                ]
            },
            '80' : {
                'Roof' : [
                    {
                        'Name': 'Ceiling',
                        'CeilingTypeName': 'R-30 Blown, Attic*******',
                        'CeilingType': 'Attic',
                        'ContinousInsulationRValue': '17.0',
                        'CavityInsulationRValue': '13.0',
                        'CavityInsulationGrade': 'I',
                        'RadiantBarrier': 'No',
                        'RoofColor': 'Medium',
                        'FramingFactor': '0.2000',
                        'DefaultFramingFactor': 'true',
                        'CeilingArea': '2530.0',
                        'ClayTile': 'Yes',
                        'Ventilation': 'No',
                        'ChordSpacing': '24.0',
                        'ChordWidth': '1.5',
                        'ChordHeight': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'RoofArea': '2530.0'
                    }
                ]
            },
            '81' : {
                'RimJoist' : [
                    {
                        "Name": "Rando",
                        "ContinuousInsulationRValue": "0.0",
                        "CavityInsulationRValue": "13.0",
                        "InsulationGrade": "I",
                        "Location": "Between conditioned space and enclosed crawl",
                        "Area": "200.0",
                        "Spacing": "16.0",
                        "Thickness": "3.5"
                    }
                ]
            },
            '83' : {
                'Window' : [
                    {
                        'Name': 'N 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '30.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.85',
                        'InteriorSummerShading': '0.70',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'N 2x4 SH-oh',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '15.0',
                        'Depth': '7.0',
                        'DistanceToBottomOfWindow': '6.0',
                        'DistanceToTopOfWindow': '1.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'E 2x4 FX',
                        'WindowTypeName': '0.31/0.24*******',
                        'UFactor': '0.310',
                        'SHGC': '0.240',
                        'Orientation': 'South',
                        'AttachedToWall': 'agwall-1',
                        'Area': '16.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'S 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'West',
                        'AttachedToWall': 'agwall-1',
                        'Area': '75.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    }
                ]
            },
            '86' : {
                'AirInfiltrationMeasurement' : [
                    {
                        'TypeOfBlowerDoorTest': 'Blower door test',
                        'HeatingSeasonValue': '4.00',
                        'CoolingSeasonValue': '4.00',
                        'Units': 'ACH @ 50 Pascals',
                        'ShelterClass': '4',
                        'CodeVerification': 'Tested',
                    }
                ]
            },
            '87' : {
                'DuctLeakageMeasurement' : [
                    {
                        'Name': 'rando',
                        'HeatingSystem': 'equip-1',
                        'CoolingSystem': 'equip-2',
                        'ConditionedFloorAreaServed': '250.0',
                        'LeakageInputType': 'Supply and Return Leakage',
                        'DefaultLeakage': 'RESNET/HERS default',
                        'SupplyLeakageToOutside': '80.0',
                        'ReturnLeakageToOutside': '80.0',
                        'TotalLeakageToOutside': '160.0',
                        'LeakageToOutsideUnits': 'CFM @ 25 Pascals',
                        'LeakageTestExemption': 'false',
                        'TotalLeakageConditions': 'Postconstruction Test',
                        'TotalLeakage': '160.0000',
                        'NumberofReturnedGrilles': '1',

                        '1stLocation': 'Attic, exposed',
                        '1stSupplyArea': '95',
                        '1stReturnArea': '95',
                        '1stSupplyRValue': '6.0',
                        '1stReturnRValue': '6.0',

                        '2ndLocation': 'Attic, exposed',
                        '2ndSupplyArea': '95',
                        '2ndReturnArea': '95',
                        '2ndSupplyRValue': '6.0',
                        '2ndReturnRValue': '6.0',

                        '3rdLocation': 'Conditioned space',
                        '3rdSupplyArea': '95',
                        '3rdReturnArea': '95',
                        '3rdSupplyRValue': '6.0',
                        '3rdReturnRValue': '6.0',

                        '4thLocation': 'Conditioned space',
                        '4thSupplyArea': '95',
                        '4thReturnArea': '95',
                        '4thSupplyRValue': '6.0',
                        '4thReturnRValue': '6.0',

                        '5thLocation': 'none',
                        '5thSupplyArea': '0',
                        '5thReturnArea': '0',
                        '5thSupplyRValue': '0.0',
                        '5thReturnRValue': '0.0',

                        '6thLocation': 'none',
                        '6thSupplyArea': '0',
                        '6thReturnArea': '0',
                        '6thSupplyRValue': '0.0',
                        '6thReturnRValue': '0.0',

                        'SupplyDuctSurfaceArea': '33.8',
                        'ReturnDuctSurfaceArea': '6.3'
                    }
                ]
            },
            '93' : {
                'WaterHeatingSystem' : [
                    {
                        'AllFixuresLowFlow': 'false',
                        'AllPipesInsulated': 'false',
                        'RecircLoopType': 'None (standard system)',
                        'FarthestFixtureDist': '101',
                        'TotalRecircLoopLength': '0',
                        'RecircPumpPower': '50',
                        'DrainWaterHeatRec': 'false',
                        'DWHREfficiency': '0.000',
                        'DWHRPreheatsColdSupply': 'false',
                        'DWHRPreheatsHotSupply': 'true',
                        'ShowerheadsQty': '0',
                        'ShowerheadsConnectedToDWHR': '0'
                    }
                ]
            },
            '94' : {
                'HVACControl' : [
                    {
                        'PstatForHeatingSystem': 'true',
                        'PstatForCoolingSystem': 'true',
                    }
                ]
            },
            '95' : {
                'LightingFractions' : [
                    {
                        'FractionCFL': '80.0',
                        'FractionLFL': '20.0',
                        'FractionGarLight': '0.0',
                        'FractionExtLight': '0.0'
                    }
                ]
            },
            '96' : {
                'Refrigerator' : [
                    {
                        "RatedAnnualkWh": "709",
                        "Location": "Conditioned"
                    }
                ]
            },
            '97' : {
                'Dishwasher' : [
                    {
                        "RatedAnnualkWh": "0",
                        "EnergyFactor": "0.84",
                        "Capacity": "12"
                    }
                ]
            },
            '98' : {
                'Oven' : [
                    {
                        "FuelType": "Natural gas",
                        "InductionRange": "false",
                        "ConventionOven": "false"
                    }
                ]
            },
            '101' : {
                'CeilingFan' : [
                    {
                        'Efficiency': '0.0'
                    }
                ]
            },
            '102' : {
                'VentilationFan' : [
                    {
                        'FanType': 'Exhaust Only',
                        'RatedFlowRate': '63',
                        'HoursInOperation': '24.0',
                        'FanPower': '12',
                        'SensibleRecoveryEfficiency': '0.0',
                        'TotalRecoveryEfficiency': '0.0',
                        'ECMFanMotor': 'false'
                    }
                ]
            },
            '104' : {
                'Wall' : [
                    {
                        'Thickness': '0.50'
                    }
                ],
                'BuildingConstrustion' : [
                    {
                        'Name': 'Brick',
                        'Location': 'Wall',
                        'Area': '230',
                        'Thickness': '5.2',
                        'Type': 'Concrete'
                    }
                ]
            },
            '105': {
                'StaticPressure' : [
                    {
                        'ReturnSide': '-0.6',
                        'SupplySide': '0.4'
                    }
                ]
            }
        }
    },
    {
        '_id'            : '12345678:23456781',
        'DisplayVerion'  : '1.0',
        'ChecklistItems' : {
            '77' : {
                'BuildingSummary' : [
                    {
                        'ResidentialFacilityType': 'Apartment, end unit',
                        'BuildingLevelType': 'None',
                        'NumberofFloors': '1',
                        'NumberofConditionedFloors': '1',
                        'ConditionedFloorArea': '2530',
                        'BuildingVolume': '22770',
                        'NumberofBedrooms': '4',
                        'YearBuilt': '2015',
                    }
                ]
            },
            '78' : {
                'Foundation' : [
                    {
                        'FoundationType' : 'None',
                        'ThermalBoundry' : 'N/A',
                        'CrawlSpaceType' : 'N/A',
                    }
                ],
                'Slab' : [
                    {
                        'Name'                      : 'slab',
                        'SlabTypeName'              : 'Uninsulated',
                        'PerimeterInsulationRValue' : '0.0',
                        'PerimeterInsulationDepth'  : '0.0',
                        'UnderSlabRValue'           : '0.0',
                        'UnderSlabInsulationWidth'  : '0.0',
                        'InsulationGrade'           : 'I',
                        'Area'                      : '2530.0',
                        'DepthBelowGrade'           : '0',
                        'Perimeter'                 : '253.0',
                        'ExposedPerimeter'          : '253.0',
                        'OnGradeExposedPerimeter'   : '253.0',
                        'FloorCovering'             : 'Carpet',
                        'RadiantSlab'               : 'No'
                    }
                ],
                'FrameFloor' : [
                    {
                        'Name'                      : 'rando',
                        'FloorTypeName'             : 'R-30***',
                        'ContinousInsulationRValue' : '0.0',
                        'CavityInsulationRValue'    : '30.0',
                        'InsulationGrade'           : 'III',
                        'Area'                      : '2500',
                        'Location'                  : 'Between conditioned space and ambient conditions',
                        'FramingFactor'             : '0.1300',
                        'DefaultFramingFactor'      : 'true',
                        'FloorCovering'             : 'Carpet',
                        'CavityInsulationThickness' : '10.0',
                        'Spacing'                   : '16.0',
                        'JoistWidth'                : '1.5',
                        'JoistHeight'               : '11.5'
                    }
                ],
                'FoundationWall' : [
                    {
                        'Name'                                : 'rando',
                        'FoundationwallTypeName'              : 'R-19 Draped, Full',
                        'Type'                                : 'Solid concrete or stone',
                        'ExteriorInsulationRValue'            : '0.0',
                        'InteriorInsulationContinuousRValue'  : '19.0',
                        'InteriorInsulationFrameCavityRValue' : '0.0',
                        'InsulationGrade'                     : 'III',
                        'Location'                            : 'Between conditioned space and ambient/ground',
                        'Length'                              : '200.0',
                        'Height'                              : '8.0',
                        'AboveGradeDepth'                     : '2.0',
                        'BelowGradeDepth'                     : '6.0',
                        'Thickness'                           : '6.0',
                        'Material'                            : 'None',
                        'ExteriorInsulationTopEdge'           : '0.0',
                        'ExteriorInsulationTopEdgeType'       : 'from top of wall',
                        'ExteriorInsulationBottomEdge'        : '0.0',
                        'ExteriorInsulationBottomEdgeType'    : 'below grade',
                        'InteriorInsulationTopEdge'           : '0.0',
                        'InteriorInsulationTopEdgeType'       : 'from top of wall',
                        'InteriorInsulationBottomEdge'        : '0.0',
                        'InteriorInsulationBottomEdgeType'    : 'from bottom of wall'
                    }
                ]
            },
            '79' : {
                'Wall' : [
                    {
                        'Name': '2x4 AGW',
                        'WallTypeName': 'R-13 + R-4 Con ins*******',
                        'WallType': 'Standard Wood Frame',
                        'ContinousInsulationRValue': '4.0',
                        'FrameCavityInsulationRValue': '13.0',
                        'BlockCavityInsulationRValue': '0.0',
                        'InsulationGrade': 'I',
                        'Location': 'Between enclosed crawl and ambient',
                        'Color': 'Medium',
                        'FramingFactor': '0.2300',
                        'DefaultFramingFactor': 'true',
                        'Area': '1858.2',
                        'StudSpacing': '16.0',
                        'StudWidth': '1.5',
                        'StudDepth': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.00'
                    }
                ]
            },
            '80' : {
                'Roof' : [
                    {
                        'Name': 'Ceiling',
                        'CeilingTypeName': 'R-30 Blown, Attic*******',
                        'CeilingType': 'Attic',
                        'ContinousInsulationRValue': '17.0',
                        'CavityInsulationRValue': '13.0',
                        'CavityInsulationGrade': 'I',
                        'RadiantBarrier': 'No',
                        'RoofColor': 'Medium',
                        'FramingFactor': '0.2000',
                        'DefaultFramingFactor': 'true',
                        'CeilingArea': '2530.0',
                        'ClayTile': 'Yes',
                        'Ventilation': 'No',
                        'ChordSpacing': '24.0',
                        'ChordWidth': '1.5',
                        'ChordHeight': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'RoofArea': '2530.0'
                    }
                ]
            },
            '81' : {
                'RimJoist' : [
                    {
                        "Name": "Rando",
                        "ContinuousInsulationRValue": "0.0",
                        "CavityInsulationRValue": "13.0",
                        "InsulationGrade": "I",
                        "Location": "Between conditioned space and enclosed crawl",
                        "Area": "200.0",
                        "Spacing": "16.0",
                        "Thickness": "3.5"
                    }
                ]
            },
            '83' : {
                'Window' : [
                    {
                        'Name': 'N 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '30.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.85',
                        'InteriorSummerShading': '0.70',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'N 2x4 SH-oh',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '15.0',
                        'Depth': '7.0',
                        'DistanceToBottomOfWindow': '6.0',
                        'DistanceToTopOfWindow': '1.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'E 2x4 FX',
                        'WindowTypeName': '0.31/0.24*******',
                        'UFactor': '0.310',
                        'SHGC': '0.240',
                        'Orientation': 'South',
                        'AttachedToWall': 'agwall-1',
                        'Area': '16.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'S 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'West',
                        'AttachedToWall': 'agwall-1',
                        'Area': '75.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    }
                ]
            },
            '86' : {
                'AirInfiltrationMeasurement' : [
                    {
                        'TypeOfBlowerDoorTest': 'Blower door test',
                        'HeatingSeasonValue': '4.00',
                        'CoolingSeasonValue': '4.00',
                        'Units': 'ACH @ 50 Pascals',
                        'ShelterClass': '4',
                        'CodeVerification': 'Tested',
                    }
                ]
            },
            '87' : {
                'DuctLeakageMeasurement' : [
                    {
                        'Name': 'rando',
                        'HeatingSystem': 'equip-1',
                        'CoolingSystem': 'equip-2',
                        'ConditionedFloorAreaServed': '250.0',
                        'LeakageInputType': 'Supply and Return Leakage',
                        'DefaultLeakage': 'RESNET/HERS default',
                        'SupplyLeakageToOutside': '80.0',
                        'ReturnLeakageToOutside': '80.0',
                        'TotalLeakageToOutside': '160.0',
                        'LeakageToOutsideUnits': 'CFM @ 25 Pascals',
                        'LeakageTestExemption': 'false',
                        'TotalLeakageConditions': 'Postconstruction Test',
                        'TotalLeakage': '160.0000',
                        'NumberofReturnedGrilles': '1',

                        '1stLocation': 'Attic, exposed',
                        '1stSupplyArea': '95',
                        '1stReturnArea': '95',
                        '1stSupplyRValue': '6.0',
                        '1stReturnRValue': '6.0',

                        '2ndLocation': 'Attic, exposed',
                        '2ndSupplyArea': '95',
                        '2ndReturnArea': '95',
                        '2ndSupplyRValue': '6.0',
                        '2ndReturnRValue': '6.0',

                        '3rdLocation': 'Conditioned space',
                        '3rdSupplyArea': '95',
                        '3rdReturnArea': '95',
                        '3rdSupplyRValue': '6.0',
                        '3rdReturnRValue': '6.0',

                        '4thLocation': 'Conditioned space',
                        '4thSupplyArea': '95',
                        '4thReturnArea': '95',
                        '4thSupplyRValue': '6.0',
                        '4thReturnRValue': '6.0',

                        '5thLocation': 'none',
                        '5thSupplyArea': '0',
                        '5thReturnArea': '0',
                        '5thSupplyRValue': '0.0',
                        '5thReturnRValue': '0.0',

                        '6thLocation': 'none',
                        '6thSupplyArea': '0',
                        '6thReturnArea': '0',
                        '6thSupplyRValue': '0.0',
                        '6thReturnRValue': '0.0',

                        'SupplyDuctSurfaceArea': '33.8',
                        'ReturnDuctSurfaceArea': '6.3'
                    }
                ]
            },
            '93' : {
                'WaterHeatingSystem' : [
                    {
                        'AllFixuresLowFlow': 'false',
                        'AllPipesInsulated': 'false',
                        'RecircLoopType': 'None (standard system)',
                        'FarthestFixtureDist': '101',
                        'TotalRecircLoopLength': '0',
                        'RecircPumpPower': '50',
                        'DrainWaterHeatRec': 'false',
                        'DWHREfficiency': '0.000',
                        'DWHRPreheatsColdSupply': 'false',
                        'DWHRPreheatsHotSupply': 'true',
                        'ShowerheadsQty': '0',
                        'ShowerheadsConnectedToDWHR': '0'
                    }
                ]
            },
            '94' : {
                'HVACControl' : [
                    {
                        'PstatForHeatingSystem': 'true',
                        'PstatForCoolingSystem': 'true',
                    }
                ]
            },
            '95' : {
                'LightingFractions' : [
                    {
                        'FractionCFL': '80.0',
                        'FractionLFL': '20.0',
                        'FractionGarLight': '0.0',
                        'FractionExtLight': '0.0'
                    }
                ]
            },
            '96' : {
                'Refrigerator' : [
                    {
                        "RatedAnnualkWh": "709",
                        "Location": "Conditioned"
                    }
                ]
            },
            '97' : {
                'Dishwasher' : [
                    {
                        "RatedAnnualkWh": "0",
                        "EnergyFactor": "0.84",
                        "Capacity": "12"
                    }
                ]
            },
            '98' : {
                'Oven' : [
                    {
                        "FuelType": "Natural gas",
                        "InductionRange": "false",
                        "ConventionOven": "false"
                    }
                ]
            },
            '101' : {
                'CeilingFan' : [
                    {
                        'Efficiency': '0.0'
                    }
                ]
            },
            '102' : {
                'VentilationFan' : [
                    {
                        'FanType': 'Exhaust Only',
                        'RatedFlowRate': '63',
                        'HoursInOperation': '24.0',
                        'FanPower': '12',
                        'SensibleRecoveryEfficiency': '0.0',
                        'TotalRecoveryEfficiency': '0.0',
                        'ECMFanMotor': 'false'
                    }
                ]
            },
            '104' : {
                'Wall' : [
                    {
                        'Thickness': '0.50'
                    }
                ],
                'BuildingConstrustion' : [
                    {
                        'Name': 'Brick',
                        'Location': 'Wall',
                        'Area': '230',
                        'Thickness': '5.2',
                        'Type': 'Concrete'
                    }
                ]
            },
            '105': {
                'StaticPressure' : [
                    {
                        'ReturnSide': '-0.6',
                        'SupplySide': '0.4'
                    }
                ]
            }
        }
    },
    {
        '_id'            : '13345678:12345678',
        'DisplayVerion'  : '1.0',
        'ChecklistItems' : {
            '77' : {
                'BuildingSummary' : [
                    {
                        'ResidentialFacilityType': 'Apartment, end unit',
                        'BuildingLevelType': 'None',
                        'NumberofFloors': '1',
                        'NumberofConditionedFloors': '1',
                        'ConditionedFloorArea': '2530',
                        'BuildingVolume': '22770',
                        'NumberofBedrooms': '4',
                        'YearBuilt': '2015',
                    }
                ]
            },
            '78' : {
                'Foundation' : [
                    {
                        'FoundationType' : 'None',
                        'ThermalBoundry' : 'N/A',
                        'CrawlSpaceType' : 'N/A',
                    }
                ],
                'Slab' : [
                    {
                        'Name'                      : 'slab',
                        'SlabTypeName'              : 'Uninsulated',
                        'PerimeterInsulationRValue' : '0.0',
                        'PerimeterInsulationDepth'  : '0.0',
                        'UnderSlabRValue'           : '0.0',
                        'UnderSlabInsulationWidth'  : '0.0',
                        'InsulationGrade'           : 'I',
                        'Area'                      : '2530.0',
                        'DepthBelowGrade'           : '0',
                        'Perimeter'                 : '253.0',
                        'ExposedPerimeter'          : '253.0',
                        'OnGradeExposedPerimeter'   : '253.0',
                        'FloorCovering'             : 'Carpet',
                        'RadiantSlab'               : 'No'
                    }
                ],
                'FrameFloor' : [
                    {
                        'Name'                      : 'rando',
                        'FloorTypeName'             : 'R-30***',
                        'ContinousInsulationRValue' : '0.0',
                        'CavityInsulationRValue'    : '30.0',
                        'InsulationGrade'           : 'III',
                        'Area'                      : '2500',
                        'Location'                  : 'Between conditioned space and ambient conditions',
                        'FramingFactor'             : '0.1300',
                        'DefaultFramingFactor'      : 'true',
                        'FloorCovering'             : 'Carpet',
                        'CavityInsulationThickness' : '10.0',
                        'Spacing'                   : '16.0',
                        'JoistWidth'                : '1.5',
                        'JoistHeight'               : '11.5'
                    }
                ],
                'FoundationWall' : [
                    {
                        'Name'                                : 'rando',
                        'FoundationwallTypeName'              : 'R-19 Draped, Full',
                        'Type'                                : 'Solid concrete or stone',
                        'ExteriorInsulationRValue'            : '0.0',
                        'InteriorInsulationContinuousRValue'  : '19.0',
                        'InteriorInsulationFrameCavityRValue' : '0.0',
                        'InsulationGrade'                     : 'III',
                        'Location'                            : 'Between conditioned space and ambient/ground',
                        'Length'                              : '200.0',
                        'Height'                              : '8.0',
                        'AboveGradeDepth'                     : '2.0',
                        'BelowGradeDepth'                     : '6.0',
                        'Thickness'                           : '6.0',
                        'Material'                            : 'None',
                        'ExteriorInsulationTopEdge'           : '0.0',
                        'ExteriorInsulationTopEdgeType'       : 'from top of wall',
                        'ExteriorInsulationBottomEdge'        : '0.0',
                        'ExteriorInsulationBottomEdgeType'    : 'below grade',
                        'InteriorInsulationTopEdge'           : '0.0',
                        'InteriorInsulationTopEdgeType'       : 'from top of wall',
                        'InteriorInsulationBottomEdge'        : '0.0',
                        'InteriorInsulationBottomEdgeType'    : 'from bottom of wall'
                    }
                ]
            },
            '79' : {
                'Wall' : [
                    {
                        'Name': '2x4 AGW',
                        'WallTypeName': 'R-13 + R-4 Con ins*******',
                        'WallType': 'Standard Wood Frame',
                        'ContinousInsulationRValue': '4.0',
                        'FrameCavityInsulationRValue': '13.0',
                        'BlockCavityInsulationRValue': '0.0',
                        'InsulationGrade': 'I',
                        'Location': 'Between enclosed crawl and ambient',
                        'Color': 'Medium',
                        'FramingFactor': '0.2300',
                        'DefaultFramingFactor': 'true',
                        'Area': '1858.2',
                        'StudSpacing': '16.0',
                        'StudWidth': '1.5',
                        'StudDepth': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.00'
                    }
                ]
            },
            '80' : {
                'Roof' : [
                    {
                        'Name': 'Ceiling',
                        'CeilingTypeName': 'R-30 Blown, Attic*******',
                        'CeilingType': 'Attic',
                        'ContinousInsulationRValue': '17.0',
                        'CavityInsulationRValue': '13.0',
                        'CavityInsulationGrade': 'I',
                        'RadiantBarrier': 'No',
                        'RoofColor': 'Medium',
                        'FramingFactor': '0.2000',
                        'DefaultFramingFactor': 'true',
                        'CeilingArea': '2530.0',
                        'ClayTile': 'Yes',
                        'Ventilation': 'No',
                        'ChordSpacing': '24.0',
                        'ChordWidth': '1.5',
                        'ChordHeight': '3.5',
                        'CavityInsulationThickness': '3.5',
                        'GypsumThickness': '0.500',
                        'RoofArea': '2530.0'
                    }
                ]
            },
            '81' : {
                'RimJoist' : [
                    {
                        "Name": "Rando",
                        "ContinuousInsulationRValue": "0.0",
                        "CavityInsulationRValue": "13.0",
                        "InsulationGrade": "I",
                        "Location": "Between conditioned space and enclosed crawl",
                        "Area": "200.0",
                        "Spacing": "16.0",
                        "Thickness": "3.5"
                    }
                ]
            },
            '83' : {
                'Window' : [
                    {
                        'Name': 'N 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '30.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.85',
                        'InteriorSummerShading': '0.70',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'N 2x4 SH-oh',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'East',
                        'AttachedToWall': 'agwall-1',
                        'Area': '15.0',
                        'Depth': '7.0',
                        'DistanceToBottomOfWindow': '6.0',
                        'DistanceToTopOfWindow': '1.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'E 2x4 FX',
                        'WindowTypeName': '0.31/0.24*******',
                        'UFactor': '0.310',
                        'SHGC': '0.240',
                        'Orientation': 'South',
                        'AttachedToWall': 'agwall-1',
                        'Area': '16.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    },
                    {
                        'Name': 'S 2x4 SH',
                        'WindowTypeName': '0.34/0.23*******',
                        'UFactor': '0.660',
                        'SHGC': '0.660',
                        'Orientation': 'West',
                        'AttachedToWall': 'agwall-1',
                        'Area': '75.0',
                        'Depth': '0.0',
                        'DistanceToBottomOfWindow': '0.0',
                        'DistanceToTopOfWindow': '0.0',
                        'InteriorWinterShading': '0.70',
                        'InteriorSummerShading': '0.85',
                        'AdjacentWinterShading': 'None',
                        'AdjacentSummerShading': 'None'
                    }
                ]
            },
            '86' : {
                'AirInfiltrationMeasurement' : [
                    {
                        'TypeOfBlowerDoorTest': 'Blower door test',
                        'HeatingSeasonValue': '4.00',
                        'CoolingSeasonValue': '4.00',
                        'Units': 'ACH @ 50 Pascals',
                        'ShelterClass': '4',
                        'CodeVerification': 'Tested',
                    }
                ]
            },
            '87' : {
                'DuctLeakageMeasurement' : [
                    {
                        'Name': 'rando',
                        'HeatingSystem': 'equip-1',
                        'CoolingSystem': 'equip-2',
                        'ConditionedFloorAreaServed': '250.0',
                        'LeakageInputType': 'Supply and Return Leakage',
                        'DefaultLeakage': 'RESNET/HERS default',
                        'SupplyLeakageToOutside': '80.0',
                        'ReturnLeakageToOutside': '80.0',
                        'TotalLeakageToOutside': '160.0',
                        'LeakageToOutsideUnits': 'CFM @ 25 Pascals',
                        'LeakageTestExemption': 'false',
                        'TotalLeakageConditions': 'Postconstruction Test',
                        'TotalLeakage': '160.0000',
                        'NumberofReturnedGrilles': '1',

                        '1stLocation': 'Attic, exposed',
                        '1stSupplyArea': '95',
                        '1stReturnArea': '95',
                        '1stSupplyRValue': '6.0',
                        '1stReturnRValue': '6.0',

                        '2ndLocation': 'Attic, exposed',
                        '2ndSupplyArea': '95',
                        '2ndReturnArea': '95',
                        '2ndSupplyRValue': '6.0',
                        '2ndReturnRValue': '6.0',

                        '3rdLocation': 'Conditioned space',
                        '3rdSupplyArea': '95',
                        '3rdReturnArea': '95',
                        '3rdSupplyRValue': '6.0',
                        '3rdReturnRValue': '6.0',

                        '4thLocation': 'Conditioned space',
                        '4thSupplyArea': '95',
                        '4thReturnArea': '95',
                        '4thSupplyRValue': '6.0',
                        '4thReturnRValue': '6.0',

                        '5thLocation': 'none',
                        '5thSupplyArea': '0',
                        '5thReturnArea': '0',
                        '5thSupplyRValue': '0.0',
                        '5thReturnRValue': '0.0',

                        '6thLocation': 'none',
                        '6thSupplyArea': '0',
                        '6thReturnArea': '0',
                        '6thSupplyRValue': '0.0',
                        '6thReturnRValue': '0.0',

                        'SupplyDuctSurfaceArea': '33.8',
                        'ReturnDuctSurfaceArea': '6.3'
                    }
                ]
            },
            '93' : {
                'WaterHeatingSystem' : [
                    {
                        'AllFixuresLowFlow': 'false',
                        'AllPipesInsulated': 'false',
                        'RecircLoopType': 'None (standard system)',
                        'FarthestFixtureDist': '101',
                        'TotalRecircLoopLength': '0',
                        'RecircPumpPower': '50',
                        'DrainWaterHeatRec': 'false',
                        'DWHREfficiency': '0.000',
                        'DWHRPreheatsColdSupply': 'false',
                        'DWHRPreheatsHotSupply': 'true',
                        'ShowerheadsQty': '0',
                        'ShowerheadsConnectedToDWHR': '0'
                    }
                ]
            },
            '94' : {
                'HVACControl' : [
                    {
                        'PstatForHeatingSystem': 'true',
                        'PstatForCoolingSystem': 'true',
                    }
                ]
            },
            '95' : {
                'LightingFractions' : [
                    {
                        'FractionCFL': '80.0',
                        'FractionLFL': '20.0',
                        'FractionGarLight': '0.0',
                        'FractionExtLight': '0.0'
                    }
                ]
            },
            '96' : {
                'Refrigerator' : [
                    {
                        "RatedAnnualkWh": "709",
                        "Location": "Conditioned"
                    }
                ]
            },
            '97' : {
                'Dishwasher' : [
                    {
                        "RatedAnnualkWh": "0",
                        "EnergyFactor": "0.84",
                        "Capacity": "12"
                    }
                ]
            },
            '98' : {
                'Oven' : [
                    {
                        "FuelType": "Natural gas",
                        "InductionRange": "false",
                        "ConventionOven": "false"
                    }
                ]
            },
            '101' : {
                'CeilingFan' : [
                    {
                        'Efficiency': '0.0'
                    }
                ]
            },
            '102' : {
                'VentilationFan' : [
                    {
                        'FanType': 'Exhaust Only',
                        'RatedFlowRate': '63',
                        'HoursInOperation': '24.0',
                        'FanPower': '12',
                        'SensibleRecoveryEfficiency': '0.0',
                        'TotalRecoveryEfficiency': '0.0',
                        'ECMFanMotor': 'false'
                    }
                ]
            },
            '104' : {
                'Wall' : [
                    {
                        'Thickness': '0.50'
                    }
                ],
                'BuildingConstrustion' : [
                    {
                        'Name': 'Brick',
                        'Location': 'Wall',
                        'Area': '230',
                        'Thickness': '5.2',
                        'Type': 'Concrete'
                    }
                ]
            },
            '105': {
                'StaticPressure' : [
                    {
                        'ReturnSide': '-0.5',
                        'SupplySide': '0.5'
                    }
                ]
            }
        }
    }
];
