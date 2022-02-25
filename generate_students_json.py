"""Python script that creates a json file which maps homeroom codes to lists
of student names using the teacherhelper module."""

import json
from pathlib import Path

from teacherhelper import Helper


BASE_DIR = Path(__file__).parent

helper = Helper.read_cache()

mapping = {}
for key, value in helper.homerooms.items():
    mapping[key] = [s.name for s in value.students]

teacher_name_to_homeroom_code = {
    "Macaluso, David": '7A',
    "Rehe, Lindsey": '6E',
    "Davis, Shondell": '7B',
    "Wilder, Jack": '7E',
    "Zhu, Zhu": '7C',
    "Chambers, TyNiesha": '7D',
    "Zou, Jiying": '6C',
    "Chung, Soyoun": '6D',
    "Silvestri, Melissa": '5D',
    "Irizarry, Gina": '6A',
    "Saadeh, Salwa": '6B',
    "Armstead, Joseph": '5C',
    "Geltzeiler, Katelyn": '5B',
    "Kassalow, Anne": '5A',
    "DuVal, Dina": '4B',
    "Ruffee, Michele": '5E',
    "Carrie, Jannine": '4E',
    "Morrow, Lisa": '4C',
    "Chartier, Jessica": '4E',
    "Rodriguez, Joseph": '4D',
    "McNeill, Kaity": '4A',
}

updated = {teacher_name_to_homeroom_code[key] : value for key, value in mapping.items()}


with open(Path(BASE_DIR, 'students.json'), 'w') as fp:
    json.dump(updated, fp)
