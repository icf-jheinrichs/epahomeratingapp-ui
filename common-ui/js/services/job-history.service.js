
const SECOND_IN_MS   = 1000;
const MINS_IN_MS     = 60 * SECOND_IN_MS;
const MAX_DATE_DELTA = 30 * MINS_IN_MS;

class JobHistory {
    constructor (UI_ENUMS) {
        'ngInject';

        this.HISTORY = {
            CATEGORIES        : UI_ENUMS.HISTORY_CATEGORIES,
            SUBCATEGORIES     : UI_ENUMS.HISTORY_SUBCATEGORIES,
            TITLES            : UI_ENUMS.TITLES,
            SHORT_DESCRIPTION : UI_ENUMS.HISTORY_SHORT_DESCRIPTION
        };
    }

    getShortDescription (historyData) {
        let description = '';
        if (historyData.Category === this.HISTORY.CATEGORIES.EDITED) {
            description = this.HISTORY.SHORT_DESCRIPTION;
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
            DateTime,
            Category,
            Subcategory,
            UserId,
            UserName,
            Data,
            LatLongAccuracy
        };
    }

    parseHistory (history) {
        let parsedHistory = [];
        let historyGroup  = [];
        let previousRecord;

        history.forEach((historyRecord) => {
            const dateTimeDelta = previousRecord.DateTime - historyRecord.DateTime;

            if (previousRecord.UserId !== historyRecord.UserId
                || dateTimeDelta > MAX_DATE_DELTA
                || previousRecord.Category !== historyRecord.Category) {

                parsedHistory.push(historyGroup);
            } else {
                parsedHistory.push(historyGroup);
                historyGroup = [];
            }
        });

        return parsedHistory;
    }
}

export default JobHistory;
