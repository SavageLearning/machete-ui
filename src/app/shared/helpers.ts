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
  const VACCINE_REQUIREMENT_FLAG =
    "!!!---- VACCINATED WORKERS REQUIRED ---!!!\n\n";
  woDescription = woDescription ?? "";

  if (requiresVaccinatedWorkers) {
    return woDescription.includes(VACCINE_REQUIREMENT_FLAG)
      ? woDescription
      : VACCINE_REQUIREMENT_FLAG.concat(woDescription ?? "");
  }

  if (!requiresVaccinatedWorkers) {
    return woDescription.includes(VACCINE_REQUIREMENT_FLAG)
      ? woDescription.split(VACCINE_REQUIREMENT_FLAG)[1] ?? ""
      : woDescription;
  }
};
