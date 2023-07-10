import pandas as pd
import matplotlib.pyplot as plt

class App:
    def __init__(self, filename):
        self.df = pd.read_csv(filename)

    def plot(self, graphs):
        for g in graphs:
            plt.plot(self.df[g[0]], self.df[g[1]], label=g[2])

        plt.legend()
        plt.savefig('a.png')
        return

    def describe(self):
        return self.df.describe()

    @property
    def columns(self):
        return self.df.columns.to_list()

    @property
    def shape(self):
        return f'{self.df.shape[0]} x {self.df.shape[1]}'