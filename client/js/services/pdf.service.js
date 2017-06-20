import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

class PDFService {
    constructor ($q) {
        'ngInject';

        this.$q = $q;

        this.PDFDocument = PDFDocument;
        this.blobStream  = blobStream;
    }

    generateBuilderNotification (jobDataResponse) {
        return this.$q((resolve, reject) => {
            let builderNotification       = new PDFDocument();
            let builderNotificationStream = builderNotification.pipe(blobStream());

            builderNotification
                .fontSize(25)
                .text('Must Correct issues', 100, 80);

            builderNotification
                .image('https://s3.amazonaws.com/rating-company-images/DemoRatingCompanyId/932876091b531e106a2ced4251f358bc/1492720098104/1493412783710.jpg', 100, 80, {width : 300});

            builderNotification
                .fontSize(25)
                .text('More Correct issues', 100, 80);

            builderNotification
                .end();

            builderNotificationStream.on('finish', () => {
                resolve(builderNotificationStream.toBlob('applicaiton/pdf'));
            });
        });
    }
}

export default PDFService;
