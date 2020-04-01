import requests
import re
from bs4 import BeautifulSoup as soup
r = requests.get('https://www.yad2.co.il/realestate/rent?city=4000&neighborhood=637&rooms=2--1&price=1600-2800', proxies={'http':'85.10.219.100'}).text
results = re.findall('Revenue of \$[a-zA-Z0-9\.]+', r)
s = soup(r, 'lxml')
titles = list(map(lambda x:x.text, s.find_all('span', {'class':'title-period'})))
epas = list(map(lambda x:x.text, s.find_all('span', {'class':'eps'})))
deciding = list(map(lambda x:x.text, s.find_all('span', {'class':re.compile('green|red')})))
results = list(map(list, zip(titles, epas, results, epas)))
print(r)