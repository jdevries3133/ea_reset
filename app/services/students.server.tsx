// load in the mapping between homerooms and student names from the environment.
// The app will blow up if this is not provided.

const rawMapping = process.env.HOMEROOM_TO_STUDENT_MAPPING;

if (rawMapping === undefined) {
  throw new Error(
    "homeroom to student mapping was not provided in the environment"
  );
}
export const STUDENTS = JSON.parse(rawMapping);
