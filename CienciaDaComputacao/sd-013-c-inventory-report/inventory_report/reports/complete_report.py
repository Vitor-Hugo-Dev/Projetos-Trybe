# from simple_report import SimpleReport
from inventory_report.reports.simple_report import SimpleReport
from collections import Counter

mocked = [
    {
        "id": 1,
        "nome_do_produto": "CALENDULA OFFICINALIS FLOWERING TOP",
        "nome_da_empresa": "Forces of Nature",
        "data_de_fabricacao": "2020-07-04",
        "data_de_validade": "2023-02-09",
        "numero_de_serie": "FR48 2002 7680 97V4 W6FO LEBT 081",
        "instrucoes_de_armazenamento": "in blandit ultrices enim",
    },
    {
        "id": 2,
        "nome_do_produto": "sodium ferric gluconate complex",
        "nome_da_empresa": "sanofi-aventis U.S. LLC",
        "data_de_fabricacao": "2020-05-31",
        "data_de_validade": "2023-01-17",
        "numero_de_serie": "SE95 2662 8860 5529 8299 2861",
        "instrucoes_de_armazenamento": "duis bibendum morbi",
    },
    {
        "id": 3,
        "nome_do_produto": "Dexamethasone Sodium Phosphate",
        "nome_da_empresa": "sanofi-aventis U.S. LLC",
        "data_de_fabricacao": "2019-09-13",
        "data_de_validade": "2023-02-13",
        "numero_de_serie": "BA52 2034 8595 7904 7131",
        "instrucoes_de_armazenamento": "morbi quis tortor id",
    },
    {
        "id": 4,
        "nome_do_produto": "Uricum acidum, Benzoicum acidum",
        "nome_da_empresa": "Newton Laboratories",
        "data_de_fabricacao": "2019-11-08",
        "data_de_validade": "2019-11-25",
        "numero_de_serie": "FR38 9203 3060 400T QQ8B HHS0 Q46",
        "instrucoes_de_armazenamento": "velit eu est congue elementum",
    },
]


class CompleteReport(SimpleReport):
    def generate(list_dicts):
        simple_report = SimpleReport.generate(list_dicts)

        empresas = []
        produtos_por_empresa = []

        for dict in list_dicts:
            empresas.append(dict["nome_da_empresa"])

        quantidade_empresas = Counter(empresas)

        # adaptado de: https://stackoverflow.com/a/34734989/18637712
        for chave, valor in quantidade_empresas.items():
            produtos_por_empresa.append(f"- {chave}: {valor}\n")

        # adaptado de: http://disq.us/t/3w416xi
        string_empresas_produtos = "".join(
            empresa for empresa in produtos_por_empresa
        )

        produtos_estocados = (
            "Produtos estocados por empresa: \n" + string_empresas_produtos
        )

        return simple_report + "\n" + produtos_estocados


# print(CompleteReport.generate(mocked))
