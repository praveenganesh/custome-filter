import "./App.css";
import styled from "styled-components";
import Filters from "./components/Filters";
import useFiltersHook from "./hooks/useFiltersHook";

const AppContainer = styled.div`
  height: 100vh;
  padding: 3rem;
  @media only screen and (max-width: 48rem) {
    padding: 2rem;
  }
`;

function App() {
  let biz = useFiltersHook();
  let { listOfFilters, handleOnFilterListChange } = biz;

  return (
    <AppContainer className="App">
      {/* here i choosed to pass specific data as props only, instead of passing entire biz to avoid too much data sharing */}
      <Filters
        listOfFilters={listOfFilters}
        onFilterChange={biz.onFilterChange}
        handleOnFilterListChange={handleOnFilterListChange}
      />
    </AppContainer>
  );
}

export default App;
