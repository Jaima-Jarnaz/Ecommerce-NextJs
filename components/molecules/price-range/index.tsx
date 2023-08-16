import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import { ChangeEvent, useState } from "react";
export interface PriceRangeTypes {
  onDataChange: (min: number, max: number) => void;
}
const PriceRange = ({ onDataChange }: PriceRangeTypes) => {
  const [minNum, setMinNum] = useState<number | undefined>();
  const [maxNum, setMaxNum] = useState<number | undefined>();
  const [maxNumError, setMaxNumError] = useState(false);
  const [minNumError, setMinNumError] = useState(false);

  // handler for click event
  const filterHandler = () => {
    if (maxNum && minNum && maxNum < minNum) {
      setMaxNumError(true);
    } else {
      setMinNumError(true);
    }
    onDataChange(minNum || 0, maxNum || 0); //calling function which is declared in parent component
  };

  const resetHandler = () => {
    setMinNum(undefined);
    setMaxNum(undefined);
  };

  return (
    <section className="m-price-range">
      <div className="m-price-range__content">
        <h5>Price Range</h5>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <SplitField>
        <Grid type="grid2">
          <input
            className="m-price-range__input"
            name="minValue"
            placeholder="Minimum number"
            value={minNum !== undefined ? minNum : ""}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinNum(parseInt(e.target.value))
            }
          />
          <input
            className="m-price-range__input"
            name="maxValue"
            placeholder="Maximum number"
            value={maxNum !== undefined ? maxNum : ""}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxNum(parseInt(e.target.value))
            }
          />
          <button onClick={filterHandler}>Filter</button>
        </Grid>
      </SplitField>
      {maxNumError
        ? "Maximum number should be greater then minimum number"
        : ""}
      {minNumError ? "Minimum number should be less then maximum number" : ""}
    </section>
  );
};

export default PriceRange;
