from abc import ABC, abstractmethod


class CyberWebSearcher(ABC):
    @abstractmethod
    def searchForCyberNews(self, searchQuery):
        pass