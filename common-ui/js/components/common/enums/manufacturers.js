const MANUFACTURERS = [
    {
        name : 'A.O. Smith Corporation',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'A.O. Smith Water Products Co.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Aaon, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'AC Pro',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Adams Manufacturing Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Advanced Distributor Products',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Aerosys, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Air-Con International, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Aire-Flow',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Airease',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Airquest',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Airtemp',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Allied Air Enterprises, LLC',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Allstyle Coil Co., Inc.',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Amana Heating And Air Conditioning',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'American Standard',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'American Standard Heating & Air Conditioning',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'American Water Heater Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'American Water Heaters',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Arcoaire',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Armstrong Air Conditioning, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Aspen Manufacturing',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Bard Manufacturing Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Bock Water Heaters, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Bosch Thermotechnology Corp.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Boyertown Furnance Co.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Bradford White Corp.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Broan',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Bryant Heating & Cooling Systems',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Bryant Heating And Cooling Systems',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Calentadores De America Sa De Cv',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Carrier Air Conditioning',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Carrier Corporation',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Champion By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Chapmion, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Coleman By Johnson Controls',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Coleman, Unitarty Products Group - Commercial',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Colex International, S.A.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Comfortmaker',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Concord',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Crown Boiler Co.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Daikin Applied Americas, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Daikin Manufacturing Company, LP',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Day & Night',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Dettson Industries, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Diamondair, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Direct Air',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Ducane',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Eair LLC',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Ecosmart Us, LLC',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Ecotemp',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Ecr International',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Eemax, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Efm',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Evcon By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Evcon, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Fraser - Johnston, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Fraser - Johnston By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Frigidaire',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Galpa Export Corp',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Gamatec International, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Gd Midea Air-Conditioning Equipment Co., Ltd.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Gd Miea Heating & Ventlating Equipment Co., Ltd.',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : true
        }
    },
    {
        name : 'Ge Appliances, A Haier Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Giant Factories, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Gibson',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Goodman Manufacturing Co., LP',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Granby Furnaces, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Grandaire',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Gsw Water Heaters',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Gsw Water Heating Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Guardian By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Guardian, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Haier America',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Heat Controller, Inc.',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Heil',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Htp, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Icp Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Ingersoll Rand',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Ingersoll Rand Company',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Innovair Corporation',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'International Comfort Products',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Intertherm',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'John Wood',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Johnson Controls, Unitary Products - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Keeprite',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Kelvinator',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Kenmore',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Klimaire Products, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Lennox Industries, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Lochinvar, LLC',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Luxaire By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Luxaire, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Mammoth, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Maratherm',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Maytag',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Medallion',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Miller',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'MrCool, LLC',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'MSH Legacy',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'National Comfort Products',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Navien, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Newmac Manufacturing',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Noritz America Corporation',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Nortek Global Hvac, LLC',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Nutone',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Parker David Hvac International, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Payne Heating & Cooling',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Payne Heating And Cooling',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Philco',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Refricenter Of Miami, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Reliance Water Heater',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Reliance Water Heater Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Reznor',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Rheem Manufacturing Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Rheem Sales Company, Inc.',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : true
        }
    },
    {
        name : 'Rinnali Corporation',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Sears Brands Management Corporation',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Sears, Roebuck & Company',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Shenxhen Moretrade Network Technology Co., Ltd.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Space Pak',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'State Water Heaters',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Style Crest, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Summit Manufacturing, Inc.',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Tappan',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Tempstar',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Thermo Products, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Trane',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Trane U.S., Inc.',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Triangle Tube PhaseIII, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'U.S. A/C Products',
        type : {
            evaporator  : true,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'U.S. Craftmaster Water Heaters',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'U.S. Craftmaster',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Unico, Inc.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'United Refrigeration, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'V-Aire',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Vaughn Thermal Corp.',
        type : {
            evaporator  : false,
            condenser   : false,
            furnace     : false,
            waterHeater : true
        }
    },
    {
        name : 'Villara Corporation',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Westinghouse',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Williamson - Thermoflo',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Wolf Steel, Ltd.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'Xenon',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'York By Johnson Controls',
        type : {
            evaporator  : true,
            condenser   : true,
            furnace     : true,
            waterHeater : false
        }
    },
    {
        name : 'York, Unitary Products Group - Commercial',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Your Source Products, Inc.',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    },
    {
        name : 'Zamil Air Conditioners & Home Appliances Co., LLC',
        type : {
            evaporator  : false,
            condenser   : true,
            furnace     : false,
            waterHeater : false
        }
    }
];

export default MANUFACTURERS;
