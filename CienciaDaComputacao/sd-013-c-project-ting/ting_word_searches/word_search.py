

from ting_file_management.file_management import txt_importer


def exists_word(word, instance):
    lista = []
    path = instance.list[0]
    linhas = txt_importer(path)

    conteudo = []
    for index, linha in enumerate(linhas):
        if word.upper() in linha.upper():
            conteudo.append({"linha": index + 1})

    lista.append({
            "palavra": word,
            "arquivo": path,
            "ocorrencias": conteudo
    })

    if len(conteudo) != 0:
        return lista
    else:
        return []


def search_by_word(word, instance):
    lista = []
    path = instance.list[0]
    linhas = txt_importer(path)

    conteudo = []

    for index, linha in enumerate(linhas):
        if word.upper() in linha.upper():
            conteudo.append({"linha": index + 1, "conteudo": linha})

    lista.append({
            "palavra": word,
            "arquivo": path,
            "ocorrencias": conteudo
    })

    if len(conteudo) != 0:
        return lista
    else:
        return []
