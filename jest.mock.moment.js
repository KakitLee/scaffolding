jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  moment.jj = () => {
    console.log('fake');
  };
  return moment;
});
