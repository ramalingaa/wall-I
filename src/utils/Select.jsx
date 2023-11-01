import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";

const SelectComponent = ({itemsData, changeHandlerFunction, errorMessage, placeholder}) => {
  return (
                    <Select
                        items={itemsData}
                        placeholder={placeholder}
                        errorMessage={errorMessage}
                        className=""
                        onChange={changeHandlerFunction}
                        >
                        {(language) => <SelectItem key={language.value}>{language.label}</SelectItem>}
                    </Select>
  )
}

export default SelectComponent