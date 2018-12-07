
import moment from 'moment';

const SECOND_IN_MS   = 1000;
const MINS_IN_MS     = 60 * SECOND_IN_MS;
const MAX_DATE_DELTA = 60 * MINS_IN_MS;

class JobHistory {
    constructor (UI_ENUMS) {
        'ngInject';

        this.HISTORY = {
            CATEGORIES        : UI_ENUMS.HISTORY_CATEGORIES,
            SUBCATEGORIES     : UI_ENUMS.HISTORY_SUBCATEGORIES,
            TITLES            : UI_ENUMS.HISTORY_TITLES,
            SHORT_DESCRIPTION : UI_ENUMS.HISTORY_SHORT_DESCRIPTION
        };
    }

    getShortDescription (historyData) {
        let description = '';
        if (historyData.Category === this.HISTORY.CATEGORIES.EDITED) {
            description = this.HISTORY.SHORT_DESCRIPTION[historyData.Category];
        } else {
            description = this.HISTORY.SHORT_DESCRIPTION[historyData.Category][historyData.Subcategory];
        }

        return description;
    }

    serializeHistoryRecord (historyData) {
        return [
            historyData.DateTime,
            historyData.Category,
            historyData.Subcategory,
            historyData.UserId,
            historyData.UserName,
            historyData.Data,
            historyData.LatLongAccuracy
        ];
    }

    deserializeHistoryRecord (historyData) {
        const [
            DateTime,
            Category,
            Subcategory,
            UserId,
            UserName,
            Data,
            LatLongAccuracy
        ] = historyData;

        return {
            DateTime : new Date(DateTime),
            Category,
            Subcategory,
            UserId,
            UserName,
            Data,
            LatLongAccuracy
        };
    }

    groupHistory (history) {
        let index;
        let groupedHistory = [];
        let previousRecord = history[0];
        let historyGroup  = [previousRecord];

        for (index = 1; index < history.length; index++) {
            const historyRecord = history[index];
            const dateTimeDelta = new Date(historyRecord.DateTime) - new Date(previousRecord.DateTime);

            if (previousRecord.UserId !== historyRecord.UserId
                || dateTimeDelta > MAX_DATE_DELTA
                || previousRecord.Category !== historyRecord.Category) {

                groupedHistory.push(historyGroup);
                historyGroup = [historyRecord];
            } else {
                historyGroup.push(historyRecord);
            }

            previousRecord = historyRecord;
        }

        if (historyGroup.length > 0) {
            groupedHistory.push(historyGroup);
        }

        return groupedHistory;
    }

    deserializeHistory (history) {
        return history.map((historyRecord) => {
            return this.deserializeHistoryRecord(historyRecord);
        });
    }

    mapReduceHistory (history) {
        return history.map((historyGroup) => {
            const isEditedCategory = historyGroup[0].Category === this.HISTORY.CATEGORIES.EDITED;
            let details;

            if (isEditedCategory) {
                const durationInMs  = historyGroup[historyGroup.length - 1].DateTime - historyGroup[0].DateTime;
                const subQuantities = historyGroup.reduce((quantities, historyRecord) => {
                    quantities[historyRecord.Subcategory] += 1;

                    return quantities;
                }, {
                    'COMMENT'           : 0,
                    'PROVIDER_COMMENT'  : 0,
                    'EDIT_MRF'          : 0,
                    'PHOTO'             : 0,
                    'UPDATE_PREDRYWALL' : 0,
                    'UPDATE_FINAL'      : 0
                });

                details = [];

                details.push(`Total Editing Time: ${moment.duration({milliseconds : durationInMs}).humanize()}`);

                Object.keys(subQuantities).forEach((key) => {
                    if (subQuantities[key] > 0) {
                        details.push(`${subQuantities[key]} ${this.HISTORY.TITLES.EDITED[key]}`);
                    }
                });
            }

            return {
                title   : isEditedCategory ? 'Edited' : this.HISTORY.TITLES[historyGroup[0].Category][historyGroup[0].Subcategory],
                date    : historyGroup[0].DateTime,
                user    : historyGroup[0].UserName,
                details : details
            };
        });
    }

    parseHistory (history) {
        let parsedHistory = this.deserializeHistory(history);

        parsedHistory.sort((a, b) => {
            const aDateTime = a.DateTime;
            const bDateTime = b.DateTime;

            if (aDateTime > bDateTime) {
                return 1;
            } else if (aDateTime < bDateTime) {
                return -1;
            } else if (aDateTime.toUTCString() === bDateTime.toUTCString()) {
                return 0;
            }
        });

        parsedHistory = this.groupHistory(parsedHistory);

        return this.mapReduceHistory(parsedHistory);
    }
}

export default JobHistory;
