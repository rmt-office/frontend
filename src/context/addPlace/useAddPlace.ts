import { useContext } from "react";
import { FormContext } from "./addPlaceContext";

export const useAddPlace = () => {
  const formValues = useContext(FormContext)
  if (formValues == null) {
		throw `Use inside the wrapper`
  }

  return formValues
}