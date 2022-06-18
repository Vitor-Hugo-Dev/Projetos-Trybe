from collections import Counter
from src.analyze_log import (
    mais_pedido_por_cliente, prato_nunca_pedido, dias_nao_idos
)


class TrackOrders:
    # aqui deve expor a quantidade de estoque

    # construtor
    def __init__(self):
        self.orders = []

    def __len__(self):
        return len(self.orders)

    def add_new_order(self, customer, order, day):
        return self.orders.append([customer, order, day])

    def get_most_ordered_dish_per_customer(self, customer):
        return mais_pedido_por_cliente(customer, self.orders)

    def get_never_ordered_per_customer(self, customer):
        return prato_nunca_pedido(customer, self.orders)

    def get_days_never_visited_per_customer(self, customer):
        return dias_nao_idos(customer, self.orders)

    def get_busiest_day(self):
        dias = [linha[2] for linha in self.orders]
        return Counter(dias).most_common()[0][0]

    def get_least_busy_day(self):
        dias = [linha[2] for linha in self.orders]
        return Counter(dias).most_common()[-1][0]
