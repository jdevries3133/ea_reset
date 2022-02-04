export const HOMEROOM_TO_ROOM_MAPPING = {
  "4A": "101",
  "4B": "303",
  "4C": "302",
  "4D": "301",
  "4E": "300",
  "5A": "102",
  "5B": "306",
  "5C": "307",
  "5D": "308",
  "5E": "309",
  "6A": "103",
  "6B": "200",
  "6C": "201",
  "6D": "203",
  "6E": "202",
  "7A": "206",
  "7B": "207",
  "7C": "212",
  "7D": "209",
  "7E": "208",
};

export const HOMEROOMS = Object.keys(HOMEROOM_TO_ROOM_MAPPING);

export const ROOMS = [
  "300",
  "209",
  "301",
  "208",
  "106",
  "207",
  "210",
  "105",
  "307",
  "203",
  "304",
  "309",
  "310",
  "G6",
  "104",
  "211",
  "100",
  "313",
  "206",
  "212",
  "306",
  "M2",
  "M4",
  "302",
  "ROOM 4 (BASEMENT)",
  "103",
  "303",
  "201",
  "M5",
  "308",
  "204",
  "N/A",
  "312",
  "202",
  "305",
  "102",
  "205",
  "213",
  "G5",
  "101",
  "311",
  "Music Room",
  "200",
  "Art Room",
  "107",
];

export const MS_EMAILS = ["nkanuteh@empacad.org", "mclinton@empacad.org"];
export const UES_EMAILS = ["balbanese@empacad.org", "mdiaz@empacad.org"];

export const getContact = (
  homeroom: keyof typeof HOMEROOM_TO_ROOM_MAPPING
): typeof MS_EMAILS | typeof UES_EMAILS => {
  const grade = homeroom.slice(0, 1);
  if (["4", "5"].includes(grade)) {
    return UES_EMAILS;
  }
  if (["6", "7"].includes(grade)) {
    return MS_EMAILS;
  }
  throw new Error("invalid homeroom");
};
