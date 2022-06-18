import csv
import xmltodict
import json
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    @classmethod
    def read_csv(cls, path, type):
        with open(path) as file:
            reader = csv.DictReader(file, delimiter=",", quotechar='"')
            list_dicts = list(reader)
            if type == "simples":
                return SimpleReport.generate(list_dicts)
            else:
                return CompleteReport.generate(list_dicts)

    @classmethod
    def read_json(cls, path, type):
        with open(path) as file:
            content = file.read()
            list_dicts = json.loads(content)
            if type == "simples":
                return SimpleReport.generate(list_dicts)
            else:
                return CompleteReport.generate(list_dicts)

    @classmethod
    def read_xml(cls, path, type):
        with open(path) as file:
            content = file.read()
            root = xmltodict.parse(content)
            list_dicts = [
                dict(produto) for produto in root["dataset"]["record"]
            ]
            if type == "simples":
                return SimpleReport.generate(list_dicts)
            else:
                return CompleteReport.generate(list_dicts)

    @classmethod
    def import_data(cls, path, type):

        file_path = path.split(".")[1]

        if file_path == "csv":
            return Inventory.read_csv(path, type)

        elif file_path == "json":
            return Inventory.read_json(path, type)

        elif file_path == "xml":
            return Inventory.read_xml(path, type)
