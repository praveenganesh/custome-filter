import { useState, useEffect } from "react";
export default function useFiltersHook(props) {
  let [listOfFilters, setListOfFilters] = useState(
    props?.listOfFilters || [
      {
        id: "invoice_status",
        type: "multi_select",
        label: "Invoice Status",
        choosen: false,
        selectedValue: [],
        options: [
          "payment pending",
          "fully paid",
          "partially paid",
          "is dispute",
          "closed",
        ],
      },
      {
        id: "last_reported",
        type: "date_range",
        label: "Last Reported",
        choosen: false,
        selectedValue: {},
        selectedOption: "",
        options: [
          "This Week",
          "Last 7 Days",
          "Last 30 Days",
          "More than 30 Days",
          "custom-range",
        ],
      },
    ]
  );

  useEffect(() => {
    console.warn = () => {};
    console.error = () => {};
  }, []);

  const onFilterChange = (filterId, value, selectedOption) => {
    setListOfFilters((list) => {
      list.forEach((item) => {
        if (item.id === filterId) {
          item.selectedValue = value;
          if (selectedOption || selectedOption === "") {
            item.selectedOption = selectedOption;
          }
        }
      });
      printRequest(list);
      return [...list];
    });
  };

  const printRequest = (list) => {
    let req = {
      invoice_status: [],
      last_responded_from: "",
      last_responded_to: "",
      last_responded_type: "",
    };
    list.forEach((filter) => {
      if (filter.id === "invoice_status") {
        req[filter.id] = filter.selectedValue;
      } else if (filter.id === "last_reported") {
        req["last_responded_type"] = filter.selectedOption;
        req["last_responded_from"] = filter.selectedValue.startDate || "";
        req["last_responded_to"] = filter.selectedValue.endDate || "";
      }
    });
    console.log("request ---->", req);
  };

  const handleOnFilterListChange = (option, closeId) => {
    let list = [...listOfFilters];
    list.forEach((item) => {
      if (option && item.label === option) {
        item.choosen = true;
      }
      if (closeId && closeId === item.id) {
        let selectedValue = item.selectedValue;
        if (Array.isArray(selectedValue)) {
          selectedValue = [];
        } else if (typeof selectedValue === "object") {
          selectedValue = {};
        } else {
          selectedValue = "";
        }
        onFilterChange(closeId, selectedValue, "");
        item.choosen = false;
      }
    });
    setListOfFilters([...list]);
  };

  return {
    listOfFilters,
    setListOfFilters,
    onFilterChange,
    handleOnFilterListChange,
  };
}
