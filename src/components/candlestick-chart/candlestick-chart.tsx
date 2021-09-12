import "banderole/dist/style.css";

import { Banderole } from "banderole";
import React, { forwardRef, useEffect, useRef } from "react";

import { Study } from "../../types";
import { Pane as PaneView } from "../pane";
import styles from "./candlestick-chart.module.css";
import { Chart } from "./chart";
import { Pane } from "./pane";

export interface StudyOptions {
  id: string;
  study: Study;
}
export interface Options {
  studies: StudyOptions[];
}

export type CandlestickChartProps = {
  options?: Options;
  onOptionsChanged?: (options: Options) => void;
};

export interface CandlestickChartHandle {}

export const CandlestickChart = forwardRef(
  (
    { options = { studies: [] }, onOptionsChanged }: CandlestickChartProps,
    ref: React.Ref<CandlestickChartHandle>
  ) => {
    const chartRef = useRef<Chart>(null!);
    const mainRef = useRef<HTMLElement | null>(null);
    const paneRef = useRef<Record<string, HTMLElement>>({});
    const axisRef = useRef<HTMLElement | null>(null);

    const previousStudyIds = useRef<string[]>([]);

    const studies = options.studies;

    useEffect(() => {
      if (axisRef.current) {
        chartRef.current = new Chart(axisRef.current);
      }

      if (mainRef.current) {
        chartRef.current.addPane(
          new Pane(mainRef.current, { closable: false })
        );
      }
    }, []);

    useEffect(() => {
      const ids = studies.map((study) => study.id);

      const enter = ids.map((id) => !previousStudyIds.current.includes(id));
      const exit = previousStudyIds.current.map((id) => !ids.includes(id));

      for (let i = exit.length - 1; i >= 0; i--) {
        if (exit[i]) {
          chartRef.current?.removePane(i + 1); // FIXME: Main pane gets in way
        }
      }

      enter.forEach((flag, index) => {
        if (flag) {
          if (paneRef.current[ids[index]]) {
            chartRef.current?.addPane(
              new Pane(paneRef.current[ids[index]], { closable: true })
            );
          }
        }
      });

      previousStudyIds.current = ids;
    }, [studies]);

    const handleClosePane = (id: string) => {
      const index = studies.findIndex((study) => study.id === id);

      if (index !== -1) {
        const newStudies = [...options.studies];
        newStudies.splice(index, 1);

        onOptionsChanged?.({
          ...options,
          studies: newStudies,
        });
      }
    };

    return (
      <div className={styles.container}>
        <div style={{ flex: "1 1 0" }}>
          <Banderole vertical>
            <PaneView
              ref={(el: HTMLElement | null) => {
                mainRef.current = el;
              }}
              closable={false}
            >
              <div
                style={{ color: "white", padding: "8px", userSelect: "none" }}
              >
                Main
              </div>
            </PaneView>
            {studies.map((study) => (
              <PaneView
                key={study.id}
                ref={(el: HTMLElement | null) => {
                  if (el) {
                    paneRef.current[study.id] = el;
                  } else {
                    delete paneRef.current[study.id];
                  }
                }}
                onClose={() => {
                  handleClosePane(study.id);
                }}
              >
                <div
                  style={{ color: "white", padding: "8px", userSelect: "none" }}
                >
                  {study.id}
                </div>
              </PaneView>
            ))}
          </Banderole>
        </div>
        <div style={{ flex: "0 0 20px" }}>
          <PaneView
            ref={(el: HTMLElement | null) => {
              axisRef.current = el;
            }}
            closable={false}
          >
            <div style={{ color: "white", padding: "8px", userSelect: "none" }}>
              Axis
            </div>
          </PaneView>
        </div>
      </div>
    );
  }
);

CandlestickChart.displayName = "CandlestickChart";
