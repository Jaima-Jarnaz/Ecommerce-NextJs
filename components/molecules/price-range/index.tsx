import Grid from "@/components/atoms/grid";
import SplitField from "@/components/atoms/splitField";
import { ChangeEvent, useState } from "react";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import {
  MINIMUM_NUMBER_ERROR,
  MAXIMUM_NUMBER_ERROR,
} from "../../../helpers/constants";

// Define the prop types for the PriceRange component
export interface PriceRangeTypes {
  error?: boolean;
  errorMessage?: string;
  onDataChange: (min: number, max: number) => void;
}

const PriceRange = ({ onDataChange }: PriceRangeTypes) => {
  // State variables for minimum and maximum numbers, and error flags
  const [minNum, setMinNum] = useState<number | undefined>();
  const [maxNum, setMaxNum] = useState<number | undefined>();
  const [maxNumError, setMaxNumError] = useState(false);
  const [minNumError, setMinNumError] = useState(false);

  // Handler for the filter button click event
  const filterHandler = () => {
    // Check for minimum and maximum number validation
    if (maxNum && minNum && maxNum < minNum) {
      setMaxNumError(true);
    }

    if (maxNum && minNum && minNum > maxNum) {
      setMinNumError(true);
    }

    // Clear error flags if errors were displayed previously
    if (maxNumError || minNumError) {
      setMaxNumError(false);
      setMinNumError(false);
    }

    // Call the onDataChange function passed from the parent component
    onDataChange(minNum || 0, maxNum || 0);
  };

  // Handler to reset the input fields and errors
  const resetHandler = () => {
    setMinNum(undefined);
    setMaxNum(undefined);
    setMaxNumError(false);
    setMinNumError(false);
  };

  return (
    <section className="m-price-range">
      <div className="m-price-range__content">
        <Heading fontSize="16" tag="h5" alignment="left">
          Price Range
        </Heading>
        <Button type="small" onClick={resetHandler}>
          Reset
        </Button>
      </div>
      <SplitField>
        <Grid type="grid2">
          {/* Input field for minimum number */}
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
          {/* Input field for maximum number */}
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
          {/* Filter button */}
          <Button type="small" onClick={filterHandler}>
            Filter
          </Button>
        </Grid>
      </SplitField>
      {/* Display maximum number error if maxNumError is true */}
      {maxNumError ? (
        <span className="m-price-range__error">
          {MAXIMUM_NUMBER_ERROR + ". "}
        </span>
      ) : (
        ""
      )}
      {/* Display minimum number error if minNumError is true */}
      {minNumError ? (
        <span className="m-price-range__error">{MINIMUM_NUMBER_ERROR}</span>
      ) : (
        ""
      )}
    </section>
  );
};

export default PriceRange;
