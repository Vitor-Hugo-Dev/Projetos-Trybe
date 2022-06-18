import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    if path_file in instance.list:
        return

    linhas = txt_importer(path_file)
    instance.enqueue(path_file)

    print({
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(linhas),
        "linhas_do_arquivo": linhas
    })


def remove(instance):
    if len(instance.list) == 0:
        return print('Não há elementos')
    path = instance.list[0]
    instance.dequeue()
    print(f"Arquivo {path} removido com sucesso")


def file_metadata(instance, position):
    if len(instance.list) - 1 < position or position < 0:
        return sys.stderr.write('Posição inválida')

    path = instance.list[position]
    linhas = txt_importer(path)

    print({
        "nome_do_arquivo": path,
        "qtd_linhas": len(linhas),
        "linhas_do_arquivo": linhas
    })
    return linhas
