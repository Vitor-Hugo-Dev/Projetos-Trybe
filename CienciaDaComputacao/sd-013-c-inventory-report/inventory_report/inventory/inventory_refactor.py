from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter


class InventoryRefactor:

    @classmethod
    def import_data(cls, path, type):

        file_path = path.split(".")[1]

        list_dicts = []

        if file_path == "csv":
            list_dicts = CsvImporter.import_data(path)

        elif file_path == "json":
            list_dicts = JsonImporter.import_data(path)

        elif file_path == "xml":
            list_dicts = XmlImporter.import_data(path)

        if type == "simples":
            return SimpleReport.generate(list_dicts)
        else:
            return CompleteReport.generate(list_dicts)

# print(InventoryRefactor.import_data("inventory_report/data/inventory.csv", "completo"))
