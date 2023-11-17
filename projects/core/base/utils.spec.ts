import moment from "moment";

import { Utils } from "./utils";

describe("Utils", () => {
  describe("toSysDateStr(Date)", () => {

    it("should convert a Date to string (en-US)", () => {
      moment.locale("en");
      expect(Utils.toSysDateStr(new Date("2022-12-31"))).toEqual("2022-12-31 01:00:00");
      expect(Utils.toSysDateStr(new Date("2022-12-31 18:12:36"))).toEqual("2022-12-31 18:12:36");
      expect(Utils.toSysDateStr(new Date("2022-12-31T18:12:36+00:00"))).toEqual("2022-12-31 19:12:36");
      expect(Utils.toSysDateStr(new Date("2022-12-31T18:12:36Z"))).toEqual("2022-12-31 19:12:36");

      // moment et Date cannot parse this format
      expect(Utils.toSysDateStr(new Date("2022-12-31T181236Z"))).toEqual("Invalid date");

      // week
      expect(Utils.toSysDateStr(new Date("2022-W52"))).toEqual("Invalid date");
      // week + weekday
      expect(Utils.toSysDateStr(new Date("2022-W52-1"))).toEqual("Invalid date");
      // ordinal date
      expect(Utils.toSysDateStr(new Date("2022-365"))).toEqual("Invalid date");
    });

    it("should convert a Date to string (french)", () => {
      moment.locale("fr");
      expect(Utils.toSysDateStr(new Date("2022-12-31"))).toEqual("2022-12-31 01:00:00");
      expect(Utils.toSysDateStr(new Date("2022-12-31 18:12:36"))).toEqual("2022-12-31 18:12:36");
      expect(Utils.toSysDateStr(new Date("2022-12-31T18:12:36+00:00"))).toEqual("2022-12-31 19:12:36");
      expect(Utils.toSysDateStr(new Date("2022-12-31T18:12:36Z"))).toEqual("2022-12-31 19:12:36");

      // moment et Date cannot convert this format
      expect(Utils.toSysDateStr(new Date("2022-12-31T181236Z"))).toEqual("Invalid date");

      // week
      expect(Utils.toSysDateStr(new Date("2022-W52"))).toEqual("Invalid date");
      // week + weekday
      expect(Utils.toSysDateStr(new Date("2022-W52-1"))).toEqual("Invalid date");
      // ordinal date
      expect(Utils.toSysDateStr(new Date("2022-365"))).toEqual("Invalid date");
    });

  })


  describe("fromSysDateStr(string)", () => {

    it("should convert a Sinequa date (YYYY-MM-DD [HH:mm:ss]) string to Date", () => {
      expect(Utils.fromSysDateStr("2022-12-31") instanceof Date).toBeTruthy();
      expect(Utils.fromSysDateStr("2022-12-31")).toEqual(new Date("2022-12-31 00:00:00"));

      expect(Utils.fromSysDateStr("2022-12-31 18:12:36") instanceof Date).toBeTruthy();
      expect(Utils.fromSysDateStr("2022-12-31 18:12:36")).toEqual(new Date("2022-12-31 18:12:36"));

      expect(Utils.fromSysDateStr("2022-12-31 18:12") instanceof Date).toBeTruthy();
      expect(Utils.fromSysDateStr("2022-12-31 18:12")).toEqual(new Date("2022-12-31 18:12:00"));

      expect(Utils.fromSysDateStr("2022-12-31 18") instanceof Date).toBeTruthy();
      expect(Utils.fromSysDateStr("2022-12-31 18")).toEqual(new Date("2022-12-31 18:00:00"));

      expect(Utils.fromSysDateStr("") instanceof Date).toBeFalsy();
      expect(Utils.fromSysDateStr("")).toBeUndefined();

      // below the function returns incorrect dates, should be "undefined"
      // expect(Utils.fromSysDateStr("31/12/2022")).toBeUndefined();
      // expect(Utils.fromSysDateStr("31-12-2022")).toBeUndefined();
    });

  })

  describe("fromJson()", () => {

    it("should convert a string to an object", () => {
      // Expected format is : YYY-MM-DD [HH:mm:ss]
      // in comment unknown formats by Moment
      const json = [
        ['{"number": 1, "text": "abc", "date": "2022-12-31"}', 'Sat Dec 31 2022 00:00:00 GMT+0100 (Central European Standard Time)'],
        ['{"number": 1, "text": "abc", "date": "2022-12-31 18:12:36"}', 'Sat Dec 31 2022 18:12:36 GMT+0100 (Central European Standard Time)'],
        // ['{"number": 1, "text": "abc", "date": "2022-12-31 18:12"}', 'Sat Dec 31 2022 18:12:00 GMT+0100 (Central European Standard Time)'],
        // ['{"number": 1, "text": "abc", "date": "2022-12-31 18"}', 'Sat Dec 31 2022 18:00:00 GMT+0100 (Central European Standard Time)'],
        // ['{"number": 1, "text": "abc", "date": "2022-12-31Z"}', 'Sat Dec 31 2022 01:00:00 GMT+0100 (Central European Standard Time)'],
        // ['{"number": 1, "text": "abc", "date": "2022-12-31T"}', 'Sat Dec 31 2022 00:00:00 GMT+0100 (Central European Standard Time)'],
      ];

      json.map(item => {
        expect(Utils.fromJson(item[0], { reviveDates: true }).date instanceof Date).toBeTruthy();
        expect(Utils.fromJson(item[0], { reviveDates: true }).date.toString()).toEqual(item[1]);
      })


      // no date conversion here
      const json1 = '{"number": 1, "text": "abc", "date": "2022-31-12"}';
      expect(Utils.fromJson(json1, { reviveDates: true }).date instanceof Date).toBeFalsy();
      expect(Utils.fromJson(json1, { reviveDates: true }).date).toEqual("2022-31-12");

      // when string is invalid, return null
      spyOn(console, 'log'); // intercept console.log() call
      expect(Utils.fromJson("{")).toBeNull();
    });

  })
})