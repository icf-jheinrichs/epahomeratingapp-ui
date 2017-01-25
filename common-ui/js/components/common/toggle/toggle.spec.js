'use strict';

describe('Component: Common: Toggle', function testToggle () {
    const CHECKED_BORDER   = '#64a71a';
    const UNCHECKED_BORDER = '#d0d0d0';

    describe('Initialization', function testTotalProgress () {
        it(`should have border color of ${CHECKED_BORDER} if checked`);
        it(`should have border color of ${UNCHECKED_BORDER} if unchecked`);
    });

    describe('Toggle', function testTotalProgress () {
        it(`should have border color of ${CHECKED_BORDER} if toggled on`);
        it(`should have border color of ${UNCHECKED_BORDER} if toggled off`);
    });
});
