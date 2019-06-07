import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

export const EMPTY_PDF_INPUTS = {
    logo   : '',
    icons  : {
      warning : '',
      verify  : '',
      comment : ''
    },
    images : {
        front : '',
        right : '',
        left  : '',
        back  : '',
    },
    builder : {
        name : '',
    },
    rater : {
        name  : '',
        email : '',
    },
    address : {
        communityName : '',
        streetAddress : '',
        lotNo         : '',
        manualid      : '',
        merged        : '',
    },
    otherHomes: [],
    house : {
        model      : '',
        type       : '',
        sqFootage  : '',
        foundation : '',
    },
    houseId: '',
    general : {
        manualIdentifier   : '',
        ratingOrganization : '',
        inspectionDate     : '',
        createdDate        : '',
    },
    archival: {},
    checklist : [],
};

const COLORS = {
  DARK_GREY: "#D9D9D9",
  LIGHT_GREY: "#F6F6F6",
  DARK_BLUE: "#1F4E79"
}

const INDENT = '\u200B\t\t';

export const generateLineBreak = ({ type = "default" }) => {
  switch(type) {
    case "thick":
      return {canvas : [{type : 'line', x1 : 0, y1 : 5, x2 : 595 - 2 * 40, y2 : 5, lineWidth : 4}]};
    case "default":
      return {canvas : [{type : 'line', x1 : 0, y1 : 5, x2 : 595 - 2 * 40, y2 : 5, lineWidth : 1}]};
  }
};

export const generatePageBreak = () => {
  return { text: "", pageBreak: "after" }
}

export const Styles = {
      tableHeader : {
          fontSize    : 11,
          fillColor   : '#FFFFFF',
          color       : 'black',
          bold        : true,
          border      : [true, true, true, true]
      },
      noBorders : {
          border      : [false, false, false, false],
      },
}

export const produceText = ({
  text = '',
  border = 'default',
  fontStyle = { bold: false, italics: false, size: 10 },
  margin = [0,0,0,0],
  align = 'left'
}) => {
  let textObj = {
    text: text,
    bold: fontStyle.bold,
    italics: fontStyle.italics,
    margin: margin,
    fontSize: fontStyle.size,
    alignment: align
  }
  if(!_isEmpty(border) && border !== 'default') {
    textObj['border'] = border
  }
  return textObj;
}

export const HeaderDescription = ({ icons }) => {
  return {
    table: {
      margin: [0,10,0,10],
      widths: ["100%"],
      body: [
        [{
          text: "This report was generated as a result of an inspection of this home by the rater listed above. Items listed below are in one of two categories:",
          margin: [0,0,0,10],
          fontSize: 10
        }],
        [{
              table: {
                widths: ["5%", "3%", "20%", "67%", "5%"],
                body: [
                  [
                    {
                      text: ""
                    },
                    {
                      image: icons.correct,
                      width: 15,
                      height: 15
                    },
                    {
                      text: "Builder Must Correct:"
                    },
                    {
                      text: "Items that must be corrected by the builder."
                    },
                    {
                      text: ""
                    },
                  ],
                  [
                    {
                      text: ""
                    },
                    {
                      image: icons.verify,
                      width: 15,
                      height: 15
                    },
                    {
                      text: "Builder Must Verify: "
                    },
                    {
                      text: "Items that must be verified by the builder under the direction of the Rater."
                    },
                    {
                      text: ""
                    },
                  ]
                ]
           },
           layout: 'noBorders'
        }]
      ]
    },
    layout: 'noBorders'
  }
}

export const SectionHeader = ({ text }) => {
  return {
    headlineLevel: 2,
    columns: [
      [produceText({
          text: text,
          margin: [0,30,0,3],
          fontStyle: {size: 14},
          align: "center"
        }),
        generateLineBreak({ type: "thick" }),
        { text: "", margin: [0,12,0,12] }]
    ]
  }
}

const getDate = (someDate) => {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let h = (() => {
    let hh = someDate.getHours();
    return (hh > 12 ? hh - 12 : hh);
  })(),
      p = (someDate.getHours() > 12 ? 'pm' : 'am'),
      m = MONTHS[someDate.getMonth()],
      min = someDate.getMinutes(),
      y = someDate.getFullYear(),
      d = someDate.getDay();

  return h + ':' + min + p + ', ' + m + ' ' + d + ', ' + y;
}

export const JobHistory = ({ history }) => {
  return history.map((change) => {
    return {
      margin: [0,3,0,3],
      table: {
        body: [
          [{ text: [
            { text: change.title + ' ', bold: true},
            { text: getDate(change.date) + ' by ' + change.user }
          ]}],
          (() => {
            if(change.title == 'Edited') {
              return [{
                margin: [40,0,0,0],
                ul: change.details
              }]
            } else {
              return ['']
            }
          })()
        ]
      },
      layout: 'noBorders'
    }
  })
}

export const PageHeader = ({ logo, createdDate }) => {
  return {
      width: "100%",
      margin: [0, 0, 15, 0],
      table : {
          widths      : ["25%", "50%", "25%"],
          headerRows : 1,
          body       : [
              [
                  {
                      image : logo,
                      fit   : [125, 125],
                  },
                  {
                      margin : [20, 9, 0, 0],
                      text   : [
                          {text : 'Archival Report\n', bold : true, fontSize : 16},
                      ],
                      alignment: 'center'
                  },
                  {
                      alignment : 'right',
                      margin    : [35, 15, 0, 0],
                      text      : createdDate,
                      fontSize  : 12,
                      bold: true
                  },
              ],
          ],
      },
      layout : 'noBorders',
  }
};

export const ChecklistList = ({ checklist, ratingType, icons, category }) => {
  const CATEGORY_FULL = {
    CeilingsRoofs: 'Ceilings & Roofs',
    FoundationFloors: 'Foundation & Floors',
    HvacWater: 'HVAC & Water',
    PlugLoadsLightingPv: 'Plug Loads, Lighting, PV',
    Tests: 'Tests',
    Walls: 'Walls'
  }
  const WIDTHS = ['7%', '3%', '69%', '21%'];
  return {
    width: '100%',
    headlineLevel: 1,
    table: {
      dontBreakRows: 1,
      widths: ['54%', '23%', '23%'],
      margin: [0],
      body: [
        [
          { text: CATEGORY_FULL[category], colSpan: 3, bold: true, fontSize: 14, margin: [0,5,0,5], headlineLevel: 2 },
          '',
          ''
        ],
        [
          { text: 'Feature', bold: true, fillColor: '#D9D9D9', border: [false,false,false,false], alignment: 'center'},
          { text: 'Pre-Drywal Status', bold: true, fillColor: '#D9D9D9', border: [false,false,false,false], alignment: 'center'},
          { text: 'Final Status', bold: true, fillColor: '#D9D9D9', border: [false,false,false,false], alignment: 'center'},
        ],
        ...(() => {
          let reduced = [];
           Object.keys(checklist[category]).map((id) => {
            if(checklist[category][id].ratingType == ratingType) {
              reduced.push([
                { text: checklist[category][id].desc, border: [false,false,false,false] },
                (() => {
                  switch(checklist[category][id].status.predrywall) {
                    // case 'BuilderVerified':
                    //   return { text: "Builder Verified", alignment: 'center'}
                    case 'RaterVerified':
                      return {
                            width: '100%',
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { text: '' },
                                  { text: 'Rater Verified', alignment: 'center'},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          }
                    case 'NotApplicable':
                      return { text: "Not Applicable", alignment: 'center'}
                    case 'MustCorrect':
                      return {
                            width: '100%',
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.correct, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Must Correct', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          };
                    case 'BuilderVerified':
                      return {
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.verify, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Builder Verified', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          };
                    default:
                      return { text: "-", alignment: 'center'}
                  }
                })(),
                (() => {
                  switch(checklist[category][id].status.final) {
                    // case 'BuilderVerified':
                    //   return { text: "Builder Verified", alignment: 'center'}
                    case 'RaterVerified':
                      return {
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { text: '' },
                                  { text: 'Rater Verified', alignment: 'center'},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          }
                    case 'NotApplicable':
                      return { text: "Not Applicable", alignment: 'center'}
                    case 'MustCorrect':
                      return {
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.correct, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Must Correct', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          };
                    case 'BuilderVerified':
                      return {
                            table: {
                              widths: WIDTHS,
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.verify, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Builder Verified', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          };
                    default:
                      return { text: "-", alignment: 'center'}
                  }
                })()
              ])
            }
          })
          return reduced;
        })()
      ]
    },
    layout: {
				fillColor : function (rowIndex, node, columnIndex) {
          if(rowIndex < 2) {
            return null
          }
					return (rowIndex % 2 === 0) ? '#F2F2F2' : null;
				},
        defaultBorder: false
			}
  }
}

export const Utility = ({ utility }) => {
  return {
    headlineLevel: 1,
    columns: [
      {text: '', width: '*'},
      {
        width: '90%',
        headlineLevel: 1,
        table: {
        widths: ['40%', '30%', '30%'],
        body: [
          [{ text: 'Utility Information', bold: true, colSpan: 3}, '', ''],
          [{ text: 'Fuel Type', bold: true}, { text: 'Utility Co. Name', bold: true}, { text: 'Meter ID', bold: true}],
          ...(() => {
            if(Array.isArray(utility.fuel)) {
              let mutated = [];
              utility.fuel.map((fuel) => {
                mutated.push([
                  { text: fuel.fuelType },
                  { text: fuel.meterId },
                  { text: fuel.meterNumber }
                ])
              })
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: 'Water Heaters', bold: true, colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.waterHeater)) {
              let mutated = [];
              utility.waterHeater.map((waterHeater) => {
                mutated.push([
                  { text: waterHeater.Manufacturer },
                  { text: waterHeater.Model },
                  { text: waterHeater.SerialNumber }
                ])
              })
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: 'HVAC Equipment', bold: true, colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Furnace', bold: true, colSpan: 3}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.hvac)) {
              let mutated = [];
              utility.hvac.map((hvac) => {
                if(hvac.Type == 'furnace') {
                  mutated.push([
                    { text: hvac.Furnace.Manufacturer },
                    { text: hvac.Furnace.Model },
                    { text: hvac.Furnace.SerialNumber }
                  ])
                }
              })
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: [{ text: 'Air Conditioner ', bold: true}, { text: 'Condensor' }], colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.hvac)) {
              let mutated = [];
              utility.hvac.map((hvac) => {
                if(hvac.Type == 'ac') {
                  mutated.push([
                    { text: hvac.Condenser.Manufacturer },
                    { text: hvac.Condenser.Model },
                    { text: hvac.Condenser.SerialNumber }
                  ])
                }
              });
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: [{ text: 'Air Conditioner ', bold: true}, { text: 'Evaporator' }], colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.hvac)) {
              let mutated = [];
              utility.hvac.map((hvac) => {
                if(hvac.Type == 'ac') {
                  mutated.push([
                    { text: hvac.Evaporator.Manufacturer },
                    { text: hvac.Evaporator.Model },
                    { text: hvac.Evaporator.SerialNumber }
                  ])
                }
              });
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: [{ text: 'Heat Pump ', bold: true}, { text: 'Condensor' }], colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.hvac)) {
              let mutated = [];
              utility.hvac.map((hvac) => {
                if(hvac.Type == 'hp') {
                  mutated.push([
                    { text: hvac.Condenser.Manufacturer },
                    { text: hvac.Condenser.Model },
                    { text: hvac.Condenser.SerialNumber }
                  ])
                }
              })
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
          [{ text: [{ text: 'Heat Pump ', bold: true}, { text: 'Evaporator' }], colSpan: 3, margin: [0,10,0,0]}, '', ''],
          [{ text: 'Manufacturer', bold: true}, { text: 'Model', bold: true}, { text: 'Model', bold: true}],
          ...(() => {
            if(Array.isArray(utility.hvac)) {
              let mutated = [];
              utility.hvac.map((hvac) => {
                if(hvac.Type == 'hp') {
                  mutated.push([
                    { text: hvac.Evaporator.Manufacturer },
                    { text: hvac.Evaporator.Model },
                    { text: hvac.Evaporator.SerialNumber }
                  ])
                }
              });
              return mutated;
            } else {
              return [['-', '-', '-']]
            }
          })(),
        ]
      },
      layout: 'noBorders'
    },
      {text: '', width: '*'},
    ]
  }
}

export const HouseImages = ({ images }) => {
   if(_isEmpty(images)) {
     return {}
   };
   return {
     width: '100%',
     margin: [0,30,0,20],
     table: {
       widths: ['0%','25%','25%', '25%','25%', '0%'],
       body: [
         [{text: ''},{ text: 'Exterior Photos', fontSize: 12, margin: [0,0,0,10], colSpan: 2, bold: true}, '', '', '', {text: ''}],
         ['', 'Front', 'Back', 'Left', 'Right', ''],
         [{text: ''},(!_isEmpty(images.front) ? { image: images.front, width: 120, height: 120, alignment: 'left'} : {}),
         (!_isEmpty(images.back) ? { image: images.back, width: 120, height: 120, alignment: 'right'} : {}), (!_isEmpty(images.left) ? { image: images.left, width: 120, height: 120, alignment: 'left'} : {}),
         (!_isEmpty(images.right) ? { image: images.right, width: 120, height: 120, alignment: 'right'} : {}), {text: ''}],
         // [{text: ''},(!_isEmpty(images.left) ? { image: images.left, width: 150, height: 150, alignment: 'left'} : {}),
         // (!_isEmpty(images.right) ? { image: images.right, width: 150, height: 150, alignment: 'right'} : {}), {text: ''}],
       ]
     },
     layout: 'noBorders'
   }
}

export const HomeDetails = ({ home }) => {
  return {
    columns: [
      { text: '', width: '*' },
      {
        width: '90%',
        table: {
          widths: ['16%','34%','21%','29%'],
          body: [
            [{ text: 'Home Model: ', bold: true, margin: [0,3,0,3] }, { text: home.model, margin: [0,3,0,3]},
            { text: 'Square Footage: ', bold: true, margin: [0,3,0,3]}, {text: home.sqfoot, margin: [0,3,0,3]}],
            [{ text: 'Home Type: ', bold: true, margin: [0,3,0,3]}, { text: home.type, margin: [0,3,0,3] },
            { text: "Sub-Plan Name: ", bold: true, margin: [0,3,0,3]}, {text: home.subplan, margin: [0,3,0,3]}],
            [{ text: 'Foundation: ', bold: true, margin: [0,3,0,3]}, { text: home.foundation, margin: [0,3,0,3]},
            { text: 'Export File Name: ', bold: true, margin: [0,3,0,3]}, { text: home.export, margin: [0,3,0,3]}],
          ]
        },
        layout: 'noBorders'
      },
      { text: '', width: '*' },
    ]
  }
};

const MARGIN = [0,3,0,3];

export const Header = ({ home, builder, ratingOrg, rater, otherHomes }) => {
  return {
    margin: [0, 15, 0, 15],
    columns: [
      { width: '*', text: '' },
      {
        width: "85%",
        table: {
          widths: ["45%", "55%"],
          body: [
            [
              { text: "Primary Home:", bold: true, margin: MARGIN},
              { text: (() => {
                console.warn('home?', home);
                let merged = home.streetAddress;
                merged = !_isEmpty(home.communityName) ? merged + '\n' + home.communityName : merged;
                merged = !_isEmpty(home.lotNo) ? merged + ', Lot ' + home.lotNo : merged;
                merged = !_isEmpty(home.manualid) ? merged + '\n' + home.manualid : merged;
                return merged;
              })(), bold: true, margin: MARGIN, lineHeight: 1.5}
            ],
            [
              { text: "Builder:", bold: true, margin: MARGIN },
              { text: builder, margin: MARGIN }
            ],
            [
              { text: "Rating Organization:", bold: true, margin: MARGIN },
              { text: ratingOrg, margin: MARGIN },
            ],
            [
              { text: "Rater:", bold: true, margin: MARGIN },
              { text: rater, margin: MARGIN },
            ],
            (() => {
              if(_isEmpty(otherHomes)) {
                return ['', '']
              } else {
                return [
                  { text: "Other Homes in This Sample Set:", bold: true, margin: MARGIN },
                  { text: (() => {
                    let merged = '';
                    otherHomes.map((house) => {
                      merged = merged + house.address.communityName + (_isEmpty(house.address.lotNo) ? '' : ', Lot ' + house.address.lotNo) + '\n';
                    })
                    return merged;
                  })(), bold: true, margin: MARGIN, lineHeight: 1.5 }
                ]
              }
            })()
          ]
        },
        layout : 'noBorders',
      },
      { width: '*', text: '' },
    ]
  }
};

export const ChecklistItem = ({ checklist, icons }) => {
  return {
    margin: [0,0,0,15],
    headlineLevel: 1,
    columns: [
      { width: '*', text: '' },
      {
        width: "100%",
        fillColor: COLORS.LIGHT_GREY,
        table: {
          widths: ["50%", "25%", "25%"],
          headerRows: 1,
          body: [
            [
              { text: "Feature", fillColor: COLORS.DARK_GREY, alignment: "center", bold: true, margin: [5,0,5,0] },
              { text: "Pre-Drywall Status", fillColor: COLORS.DARK_GREY, alignment: "center", bold: true, margin: [5,0,5,0] },
              { text: "Final Status", fillColor: COLORS.DARK_GREY, alignment: "center", bold: true, margin: [5,0,5,0] }
            ],
            [
              { text: checklist.detail, margin: [5,0,5,0] },
              (() => {
                if(checklist.stage === 'PreDrywall') {
                  switch(checklist.response) {
                    case 'RaterVerified':
                      return {
                          table: {
                            widths: ['7%', '3%', '69%', '21%'],
                            body: [
                              [
                                { text: '' },
                                { text: '' },
                                { text: 'Rater Verified', alignment: 'center'},
                                { text: '' }
                              ]
                            ]
                          },
                          layout: 'noBorders'
                        }
                    case 'NotApplicable':
                      return { text: "Not Applicable", alignment: 'center'}
                    case 'MustCorrect':
                      return {
                            table: {
                              widths: ['7%', '3%', '69%', '21%'],
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.correct, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Must Correct', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          }
                      case 'BuilderVerified':
                        return {
                              table: {
                                widths: ['7%', '3%', '69%', '21%'],
                                body: [
                                  [
                                    { text: '' },
                                    { image: icons.verify, width: 10, height: 10, alignment: 'center'},
                                    { text: 'Builder Verified', alignment: 'center', bold: true},
                                    { text: '' }
                                  ]
                                ]
                              },
                              layout: 'noBorders'
                            };
                        default:
                          return { text: "-", alignment: 'center'}

                  }
                } else {
                  return {
                    margin: [5,0,5,0], alignment: "center",
                    text: '-'
                  }
                }
              })(),
              (() => {
                if(checklist.stage === 'Final') {
                  switch(checklist.response) {
                    case 'RaterVerified':
                      return {
                          table: {
                            widths: ['7%', '3%', '69%', '21%'],
                            body: [
                              [
                                { text: '' },
                                { text: '' },
                                { text: 'Rater Verified', alignment: 'center'},
                                { text: '' }
                              ]
                            ]
                          },
                          layout: 'noBorders'
                        }
                    case 'NotApplicable':
                      return { text: "Not Applicable", alignment: 'center'}
                    case 'MustCorrect':
                      return {
                            table: {
                              widths: ['7%', '3%', '69%', '21%'],
                              body: [
                                [
                                  { text: '' },
                                  { image: icons.correct, width: 10, height: 10, alignment: 'center'},
                                  { text: 'Must Correct', alignment: 'center', bold: true},
                                  { text: '' }
                                ]
                              ]
                            },
                            layout: 'noBorders'
                          }
                      case 'BuilderVerified':
                        return {
                              table: {
                                widths: ['7%', '3%', '69%', '21%'],
                                body: [
                                  [
                                    { text: '' },
                                    { image: icons.verify, width: 10, height: 10, alignment: 'center'},
                                    { text: 'Builder Verified', alignment: 'center', bold: true},
                                    { text: '' }
                                  ]
                                ]
                              },
                              layout: 'noBorders'
                            };
                        default:
                          return { text: "-", alignment: 'center'}

                  }
                } else {
                  return {
                    margin: [5,0,5,0], alignment: "center",
                    text: '-'
                  }
                }
              })(),
            ]
          ],
        },
        layout: 'noBorders'
      },
      { width: '*', text: '' },
    ]
  }
};

export const Comments = ({ comments, checklist, otherHomes, houseId, address, icons }) => {
  const commentsToPdf = comments.map((comment, i) => {
    return [{
      margin: [40,5,40,5],
      fillColor: COLORS.LIGHT_GREY,
      headlineLevel: (i == 0 ? 1 : 5),
      table: {
        body: [
          [produceText({ text: comment.username, fontStyle: { bold: true }})],
          [produceText({ text: moment(comment.timestamp).format('MM/DD/YYYY'), fontStyle: { bold: true }})],
          [{ text: INDENT + comment.comment, headlineLevel: 1}],
          (() => {
            if(_isEmpty(comment.photoUrl) || _isEmpty(comment.photoUri)) {
              return [{}]
            } else {
             return [{
                 image  : comment.photoUri,
                 width  : 250,
                 height : 250,
                 margin : [28, 10],
             }]
            }
          })()
        ],
      },
      layout: 'noBorders'
    }]
  })
  return {
    headlineLevel: 1,
    columns: [
      { width: '*', text: '' },
      (() => {
        if(_isEmpty(comments)) {
          return [{}]
        } else {
          return {
                  headlineLevel: 1,
                  width: "100%",
                  margin: [0,0,0,15],
                  table: {
                    widths: ["100%"],
                    body: [
                      (() => {
                        if(!_isEmpty(otherHomes)) {
                          return [{
                            margin: [10,10,10,10],
                            fillColor: COLORS.LIGHT_GREY,
                            text: [
                              { text: "Location\n\n", fontSize: 16, bold: true},
                              {
                                bold: true,
                                text: (() => {
                                  let cid = '',
                                      theHouse = {};
                                  if(checklist.houseId === houseId) {
                                    cid = houseId;
                                    theHouse = address;
                                  } else {
                                    otherHomes.map((oh => {
                                      if(checklist.houseId === oh.houseId) {
                                        cid = oh.houseId;
                                        theHouse = oh.address;
                                      }
                                    }))
                                  }
                                  return (theHouse.streetAddress + '\n' + theHouse.communityName + (_isEmpty(theHouse.lotNo) ? '' : ', Lot ' + theHouse.lotNo) + (_isEmpty(theHouse.manualId) ? '' : '| ' + theHouse.manualId))
                                })()
                              }
                            ]
                          }];
                        } else {
                          return [''];
                        }
                      })(),
                      [{  headlineLevel: 3,
                          fillColor: COLORS.LIGHT_GREY,
                          table: {
                          body: [
                            [{
                              image: icons.comment,
                              width: 15,
                              height: 13,
                              margin: [0,2,0,0]
                            },{ text: "Comments", fontSize: 14, bold: true, headlineLevel: 1 }]
                          ]
                        },
                        margin: [10,0,0,0],
                        layout: 'noBorders'
                      }],
                      ...commentsToPdf
                    ]
                  },
                  layout: 'noBorders'
                }
        }
      })(),
      { width: '*', text: '' }
    ]
  }
}
