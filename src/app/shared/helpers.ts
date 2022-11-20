/**
 * Part of a temporary solution to dealing with vaccine requirements for workers
 * handles the logic for either appending a custom message to the
 * wo description or not
 * @param requiresVaccinatedWorkers order requires vaccinated workers
 * @param woDescription the wo description from the form
 * @returns the resolved description
 */
export const vaccineReqFlagResolver = (
  requiresVaccinatedWorkers: boolean,
  woDescription: string
): string => {
  const VACCINE_REQUIREMENT_FLAG = `
    **REQUIERE TRABAJADORES VACUNADXS**\n
  `;
  woDescription = woDescription ?? "";

  if (requiresVaccinatedWorkers) {
    return woDescription.includes(VACCINE_REQUIREMENT_FLAG)
      ? woDescription
      : VACCINE_REQUIREMENT_FLAG.concat(woDescription ?? "");
  }

  if (!requiresVaccinatedWorkers) {
    return woDescription.replace(VACCINE_REQUIREMENT_FLAG, "");
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEmpty = (obj: Object): boolean => {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};
