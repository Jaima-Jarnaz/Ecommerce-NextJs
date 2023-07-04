import Grid from "@/components/atoms/grid";
import SplitField from "@/components/atoms/splitField";
import { ChangeEvent, useState } from "react";
export interface PriceRangeTypes {
  onDataChange: (min: string, max: string) => void;
}
const PriceRange = ({ onDataChange }: PriceRangeTypes) => {
  const [minNum, setMinNum] = useState<string>("");
  const [maxNum, setMaxNum] = useState<string>("");

  // handler for click event
  const filterHandler = () => {
    onDataChange(minNum, maxNum); //calling function which is declared in parent component
  };

  const resetHandler = () => {
    setMinNum("");
    setMaxNum("");
  };

  return (
    <div className="m-price-range">
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
            value={minNum}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinNum(e.target.value)
            }
          />
          <input
            className="m-price-range__input"
            name="maxValue"
            placeholder="Maximum number"
            value={maxNum}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxNum(e.target.value)
            }
          />
          <button onClick={filterHandler}>Filter</button>
        </Grid>
      </SplitField>
    </div>
  );
};

export default PriceRange;
