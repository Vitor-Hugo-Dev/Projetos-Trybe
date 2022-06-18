from functools import lru_cache
import csv


@lru_cache
def read(path):
    with open(path) as file:
        reader = csv.DictReader(file, delimiter=",", quotechar='"')

        list_of_rows = [row for row in reader]

    return list_of_rows
