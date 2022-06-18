import csv
from inventory_report.importer.importer import Importer


class CsvImporter(Importer):
    def import_data(path):
        csv_file_path = path.split(".")[1]

        if csv_file_path == "csv":
            with open(path) as file:
                reader = csv.DictReader(file, delimiter=",", quotechar='"')
                return list(reader)
        else:
            raise ValueError("Arquivo inválido")
