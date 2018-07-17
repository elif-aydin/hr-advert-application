"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */
var findClosestEnabledDate = exports.findClosestEnabledDate = function findClosestEnabledDate(_ref) {
  var date = _ref.date,
      utils = _ref.utils,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      shouldDisableDate = _ref.shouldDisableDate;

  var now = utils.date();

  if ((disableFuture || disablePast) && !shouldDisableDate(now)) {
    return now;
  }

  var diffFromMaxDate = Math.abs(utils.getDiff(date, maxDate));
  var diffFromMinDate = Math.abs(utils.getDiff(date, minDate));

  return diffFromMaxDate < diffFromMinDate ? utils.date(maxDate) : utils.date(minDate);
};