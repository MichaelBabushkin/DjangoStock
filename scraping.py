import pandas as pd
import requests
from bs4 import BeautifulSoup
from sqlalchemy import create_engine
import pymysql
from pymysql import Error
# from urllib.request import Request, urlopen


page = requests.get('https://www.globes.co.il/portal/instrument.aspx?instrumentid=373853&feeder=1')
soup = BeautifulSoup(page.content, 'html.parser')
bgLastDeal = soup.find(id ="bgLastDeal")
sp500=bgLastDeal.get_text()
page2=requests.get('https://www.globes.co.il/portal/instrument.aspx?instrumentid=373853&feeder=1&mode=composition&showAll=true#jt40991')
soup2 = BeautifulSoup(page2.content, 'html.parser')
table = soup2.find_all('table',id="stocksTable2")
table=table[0]

data = []

for row in table.find_all('tr'):
    cols = row.find_all('td')
    cols = [ele.text.strip() for ele in cols]
    data.append([ele for ele in cols if ele]) # Get rid of empty values

try:
    connection  = pymysql.connect(host = 'localhost', database = 'project', user = 'root', password = '')
    cursor = connection.cursor()
    query =""" CREATE TABLE IF NOT EXISTS project.sp500_stats(Name VARCHAR(45),Symbol VARCHAR(45),Stock_Market VARCHAR(45),Last_Deal VARCHAR(45), Last_Stock_Value VARCHAR(45), Daily_Change VARCHAR(45), Daily_Change_in VARCHAR(45), Total VARCHAR(45),Daily_Max VARCHAR(45),Daily_Min VARCHAR(45)) """
    values =(tuple(data[0]))
    cursor.execute(query)
    connection.commit()
except Error as e:
    print('Error : ',e)

try:
    connection  = pymysql.connect(host = 'localhost', database = 'project', user = 'root', password = '')
    cursor = connection.cursor()
    i = 0
    while i < len(data):

        query = """INSERT INTO project.sp500_stats VALUES (%s ,%s ,%s ,%s, %s ,%s ,%s ,%s ,%s, %s)   """
        values =(tuple(data[i]))
        print(values)
        cursor.execute(query,values)
        connection.commit()
        i += 1
except Error as e:
    print('Error : ',e)




# currency=pd.DataFrame({shaar_yacig})
# items=week.findAll(class_='tombstone-container')
# print(items[0].find(class_='period-name').get_text())
# print(items[0].find(class_='short-desc').get_text())
# print(items[0].find(class_='temp').get_text())