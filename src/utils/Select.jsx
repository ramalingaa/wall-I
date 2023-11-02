import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";

const SelectComponent = ({itemsData, changeHandlerFunction, errorMessage, placeholder, size="md", className="", arialabel= ""}) => {
  return (
                    <Select
                        items={itemsData}
                        placeholder={placeholder}
                        errorMessage={errorMessage}
                        className={className}
                        onChange={changeHandlerFunction}
                        size={size}
                        aria-label={arialabel}
                        >
                        {(language) => <SelectItem key={language.value} >{language.label}</SelectItem>}
                    </Select>
  )
}

export default SelectComponent