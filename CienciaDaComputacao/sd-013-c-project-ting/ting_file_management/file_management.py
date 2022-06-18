import sys


def txt_importer(path_file):
    """Aqui irá sua implementação"""
    if not path_file.endswith('.txt'):
        return sys.stderr.write('Formato inválido\n')

    try:
        with open(path_file, 'r') as f:
            linhas = f.readlines()

            for index, linha in enumerate(linhas):
                linhas[index] = linha.rstrip('\n')
            # sobre enumerate: https://realpython.com/python-enumerate/
            return linhas
    except FileNotFoundError:
        return sys.stderr.write(f'Arquivo {path_file} não encontrado\n')
