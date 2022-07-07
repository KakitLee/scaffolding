// Limit the number of request
import moment from 'moment';
import { MAX_NUM_REQUEST, TIME_WINDOW } from '../constants/constants';
import { RATE_LIMIT_EXCEEDED } from '../constants/msg';

const map = {};

// Determine whether is a new window
const isOutsidePreviousTimeWindow = (timestamp) => {
  return moment(timestamp).add(TIME_WINDOW, 'ms').isBefore(moment());
};

const rateLimit = (req, res, next) => {
  const userId = req.headers.userid;
  // Check if this user has called this API before
  if (!map[userId] || isOutsidePreviousTimeWindow(map[userId].timestamp)) {
    map[userId] = {
      timestamp: moment().valueOf(),
      count: 1,
    };
    next();
  } else {
    const currentCount = map[userId].count;
    if (currentCount < MAX_NUM_REQUEST) {
      map[userId] = {
        ...map[userId],
        count: map[userId].count + 1
      }
      next();
    } else {
      res.status(429).send({
        message: RATE_LIMIT_EXCEEDED,
      });
    }
  }
};

export { isOutsidePreviousTimeWindow, rateLimit };
