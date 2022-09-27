const sd = require('silly-datetime');

module.exports = {
  formatTime(unix) {
    return sd.format(new Date(unix * 1000), 'YYYY-MM-DD HH:mm');
  },
};
