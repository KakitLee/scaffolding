import { isOutsidePreviousTimeWindow } from '../rateLimit';
import moment from 'moment';
import { TIME_WINDOW } from '../../constants/constants';

describe('RateLimit', () => {
  it('isOutsidePreviousTimeWindow should work', () => {
    expect.assertions(2);
    const timestamp1 = moment().add(TIME_WINDOW, 'ms');
    expect(isOutsidePreviousTimeWindow(timestamp1)).toEqual(false);

    const timestamp2 = moment().subtract(TIME_WINDOW + 1, 'ms');
    expect(isOutsidePreviousTimeWindow(timestamp2)).toEqual(true);
  });
});
