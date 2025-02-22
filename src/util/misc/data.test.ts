import { Candle } from "@util/types";
import { range } from "d3-array";

import { mergeData } from "./data";

const arrayA = range(10).map((d) => new Date(2021, 1, d));
const arrayC = range(10).map((d) => new Date(2021, 1, d + 5));

describe("mergeData", () => {
  it("merges empty arrays", () => {
    const a: Candle[] = [];
    const b: Candle[] = [];
    expect(mergeData(a, b)).toEqual([]);
  });

  it("merges with second array empty", () => {
    const a: Candle[] = arrayA.map((d) => ({
      date: d,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    }));
    const b: Candle[] = [];
    expect(mergeData(a, b)).toEqual(
      arrayA.map((d) => ({
        date: d,
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0,
      }))
    );
  });

  it("merges with first array empty", () => {
    const a: Candle[] = arrayA.map((d) => ({
      date: d,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    }));
    const b: Candle[] = [];
    expect(mergeData(b, a)).toEqual(
      arrayA.map((d) => ({
        date: d,
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0,
      }))
    );
  });

  it("merges overlapping arrays", () => {
    const a: Candle[] = arrayA.map((d) => ({
      date: d,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    }));
    const b: Candle[] = arrayC.map((d) => ({
      date: d,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    }));
    expect(mergeData(a, b)).toEqual(
      range(15)
        .map((d) => new Date(2021, 1, d))
        .map((d) => ({
          date: d,
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
        }))
    );
  });
});
