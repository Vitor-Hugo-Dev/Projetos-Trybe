import json
from inventory_report.importer.importer import Importer


class JsonImporter(Importer):
    def import_data(path):
        json_file_path = path.split(".")[1]

        if json_file_path == "json":
            with open(path) as file:
                content = file.read()
                return json.loads(content)
        else:
            raise ValueError("Arquivo inválido")
