from datetime import datetime, date
from collections import Counter


class SimpleReport:
    # consulta em: shorturl.at/ahotC
    # Com a ajuda do Tulio na monitoria
    @classmethod
    def str_to_dt(cls, string_date):
        return datetime.strptime(string_date, "%Y-%m-%d").date()

    @classmethod
    def generate(cls, list_dicts):
        valid_dates = []
        fabrication_dates = []
        empresas = []

        for item in list_dicts:
            valid_date = cls.str_to_dt(item["data_de_validade"])
            fabrication_date = cls.str_to_dt(item["data_de_fabricacao"])
            if valid_date > date.today():
                valid_dates.append(valid_date)
            fabrication_dates.append(fabrication_date)
            empresas.append(item["nome_da_empresa"])

        # Consulta em: https://realpython.com/python-counter/
        # Com a ajuda do Carlos em monitoria
        # adaptado de: https://stackoverflow.com/a/3594522/18637712
        quantidade_empresas = Counter(empresas)
        empresa_mais_frequente = quantidade_empresas.most_common(1)
        nome_empresa = empresa_mais_frequente[0][0]

        str_data_fab = f"Data de fabricação mais antiga: {date.strftime(min(fabrication_dates), '%Y-%m-%d')}\n"  # noqa: E501
        str_data_val = f"Data de validade mais próxima: {date.strftime(min(valid_dates), '%Y-%m-%d')}\n"  # noqa: E501
        nome_empresa = f"Empresa com maior quantidade de produtos estocados: {nome_empresa}\n"  # noqa: E501

        relatorio = f"{str_data_fab}" + f"{str_data_val}" + f"{nome_empresa}"

        return relatorio
