import { useState, useEffect } from "react";
import Select, { components } from "react-select";




const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex "
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const multiValueContainer = ({ selectProps, data }) => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex(selected => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
  const val = `${label}${labelSuffix}`;
  return val;
};


const TableHeading = ({ tableFilter, refreshParent, changeFilters }) => {
  const [filterObj, setFilterObj] = useState({});

  useEffect(() => {
    changeFilters(filterObj);
  }, [filterObj]);


  return tableFilter ? (
    <>
      {
        Object.keys(tableFilter).map(v => {
          return (
            <th
              
              key={tableFilter[v]}
              style={{ textAlign: 'left' }}>
              {v}
              <Select
                defaultValue={tableFilter[v]}
                isMulti
                controlShouldRenderValue={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={(options) => {
                  if (Array.isArray(options)) {
                    let tempFilterObj = { ...filterObj };
                    tempFilterObj[v] = options.map((opt) => opt.value);
                    setFilterObj(tempFilterObj);
                  }
                }}
                options={tableFilter[v]}
                components={{
                  MultiValueContainer: multiValueContainer,
                  Option: InputOption
                }}
              />
            </th>
          );
        })
      }
    </>
  ) : null;
};

export default TableHeading;