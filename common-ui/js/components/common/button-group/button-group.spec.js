'use strict';

describe('Component: Common: Button Group', function testButtonGroup () {
    const ACTIVE_CLASS = 'active';

    describe('Initialization', function testInitialization () {
        it('should draw a button for each option passed in');
        it(`should add class "${ACTIVE_CLASS}" to buttons in initial value`);
    });

    describe('Toggle - Single Active', function testSingleToggle () {
        it('should allow initial activation of a button');
        it('should only have one active button at a time');
        it('should allow deselection of an item');
    });

    describe('Toggle - Multiple Active', function testSingleToggle () {
        it('should allow initial activation of a button');
        it('should allow several active buttons at a time');
        it('should allow deselection of an item');
    });
});
