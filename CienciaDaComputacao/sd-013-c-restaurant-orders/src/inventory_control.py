class InventoryControl:
    INGREDIENTS = {
        'hamburguer': ['pao', 'carne', 'queijo'],
        'pizza': ['massa', 'queijo', 'molho'],
        'misto-quente': ['pao', 'queijo', 'presunto'],
        'coxinha': ['massa', 'frango'],
    }
    MINIMUM_INVENTORY = {
        'pao': 50,
        'carne': 50,
        'queijo': 100,
        'molho': 50,
        'presunto': 50,
        'massa': 50,
        'frango': 50,
    }

    def __init__(self):
        self.igredientes_consumidos = {
            key: 0 for key in self.MINIMUM_INVENTORY}

    def add_new_order(self, customer, order, day):
        for igrediente in self.INGREDIENTS[order]:
            consumidos = self.igredientes_consumidos[igrediente]
            valor_minimo = self.MINIMUM_INVENTORY[igrediente]
            if consumidos >= valor_minimo:
                return False
            else:
                self.igredientes_consumidos[igrediente] += 1

    def get_quantities_to_buy(self):
        return self.igredientes_consumidos

    def prato_por_igrediente(self, igrediente):
        prato = set([
            receita for receita, ingredientes in
            self.INGREDIENTS.items() if igrediente in ingredientes
        ])
        return prato

    def get_available_dishes(self):
        pratos_disp = set(self.INGREDIENTS.keys())

        for igrediente, quantidade in self.igredientes_consumidos.items():
            quantidade_minima = self.MINIMUM_INVENTORY[igrediente]
            if quantidade >= quantidade_minima:
                prato = self.prato_por_igrediente(igrediente)
                pratos_disp.difference_update(prato)
        # sobre o difference_update:
        # https://www.w3schools.com/python/ref_set_difference_update.asp
        return pratos_disp
