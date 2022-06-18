import xmltodict
from inventory_report.importer.importer import Importer


class XmlImporter(Importer):
    def import_data(path):
        xml_file_path = path.split(".")[1]

        if xml_file_path == "xml":
            with open(path) as file:
                content = file.read()
                root = xmltodict.parse(content)
                list_dicts = [
                    dict(produto) for produto in root["dataset"]["record"]
                ]
                return list_dicts
        else:
            raise ValueError("Arquivo inválido")
