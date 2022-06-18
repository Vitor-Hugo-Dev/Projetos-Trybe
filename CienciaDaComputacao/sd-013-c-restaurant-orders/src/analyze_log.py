import csv


def readFile(filename):
    with open(filename, 'r') as f:
        conteudo = list(csv.reader(f, delimiter=','))
        return conteudo


def mais_pedido_por_cliente(cliente, lista):
    pedidos = []
    for linha in lista:
        if linha[0] == cliente:
            pedidos.append(linha[1])
    return max(pedidos, key=pedidos.count)
    # como usar key function no max():
    # https://thepythonguru.com/python-builtin-functions/max/


def quantas_vezes_pedido(cliente, lista, prato):
    quantidade = 0
    for linha in lista:
        if linha[0] == cliente and linha[1] == prato:
            quantidade += 1
    return quantidade


def prato_nunca_pedido(cliente, lista):
    todos_os_pratos = set()
    pratos_nao_pedidos = set()
    for linha in lista:
        todos_os_pratos.add(linha[1])
        if linha[0] == cliente:
            pratos_nao_pedidos.add(linha[1])
    return todos_os_pratos.difference(pratos_nao_pedidos)


def dias_nao_idos(cliente, lista):
    dias = set()
    nao_idos = set()
    for linha in lista:
        dias.add(linha[2])
        if linha[0] == cliente:
            nao_idos.add(linha[2])
    return dias.difference(nao_idos)
    # sobre o uso do set e do difference:
    # https://pythonhelp.wordpress.com/2013/06/18/conjuntos-em-python/#:~:text=difference(b)%20%C3%A9%20o%20mesmo,usar%20o%20m%C3%A9todo%20difference_update()%20.


def analyze_log(path_to_file):
    # https://www.w3schools.com/python/ref_string_endswith.asp
    if not path_to_file.endswith("csv"):
        raise FileNotFoundError(f"Extensão invalida {path_to_file}")
    try:
        conteudo = readFile(path_to_file)
        mais_pedidos_por_maria = mais_pedido_por_cliente('maria', conteudo)
        pedidos_de_hamburguer_de_arnaldo = quantas_vezes_pedido(
            'arnaldo', conteudo, 'hamburguer')
        nunca_pedidos_por_joao = prato_nunca_pedido('joao', conteudo)
        dias_que_joao_nao_foi = dias_nao_idos('joao', conteudo)
        with open("data/mkt_campaign.txt", "w") as f:
            f.write(
                f"{mais_pedidos_por_maria}\n"
                f"{pedidos_de_hamburguer_de_arnaldo}\n"
                f"{nunca_pedidos_por_joao}\n"
                f"{dias_que_joao_nao_foi}\n"
            )

    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente {path_to_file}")
