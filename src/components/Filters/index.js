import MultiSelect from "../elements/MultiSelect";
import DateRangeSelect from "../elements/DaterRangeSelect";
import CustomFilter from "../CustomFilter";
import FilterContainer from "./FilterContainer";

const Filters = ({
  listOfFilters,
  onFilterChange,
  handleOnFilterListChange,
}) => {
  return (
    <div>
      {listOfFilters
        .filter((filter) => filter.choosen === true)
        .map((filterObj, i) => {
          if (filterObj.type === "multi_select") {
            return (
              //FilterContainer created as wrapper, to having common control over filters,
              //same like close button we can add more
              //functionality through this wrapper
              <FilterContainer
                key={i}
                showCloseBtn
                onClose={() => {
                  handleOnFilterListChange(null, filterObj.id);
                }}
              >
                <MultiSelect
                  variant="outlined"
                  endIcon="▼"
                  onFilterChange={onFilterChange}
                  filter={filterObj}
                >{`${filterObj.label}:`}</MultiSelect>
              </FilterContainer>
            );
          } else if (filterObj.type === "date_range") {
            return (
              <FilterContainer
                key={i}
                showCloseBtn
                onClose={() => {
                  handleOnFilterListChange(null, filterObj.id);
                }}
              >
                <DateRangeSelect
                  variant="outlined"
                  endIcon="▼"
                  filter={filterObj}
                  onFilterChange={onFilterChange}
                >{`${filterObj.label}:`}</DateRangeSelect>
              </FilterContainer>
            );
          }
          return null;
        })}

      {/* this condition is to hide dropdown if all options are choosed */}
      {listOfFilters.some((item) => item.choosen === false) && (
        <CustomFilter
          variant="outlined"
          endIcon="▼"
          showCloseOnHover
          onFilterChange={(option) => {
            handleOnFilterListChange(option);
          }}
          filterData={listOfFilters}
        ></CustomFilter>
      )}
    </div>
  );
};

export default Filters;
