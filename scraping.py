import pandas as pd
import requests
from bs4 import BeautifulSoup
from sqlalchemy import create_engine
import pymysql
from pymysql import Error
# from urllib.request import Request, urlopen

page = requests.get('https://www.globes.co.il/portal/instrument.aspx?instrumentid=10463')
soup = BeautifulSoup(page.content, 'html.parser')
dailyCurrency = soup.find(id='divCurrencyRate')
instantCurrency = soup.find(id='bgLastDeal')
shaar_yacig=dailyCurrency.find('div').get_text()
shaar_racif=instantCurrency.get_text()


page2=requests.get('https://www.globes.co.il/portal/instrument.aspx?instrumentid=373853&feeder=1&mode=composition&showAll=true#jt40991')
soup2 = BeautifulSoup(page2.content, 'html.parser')
table = soup2.find_all('table',id="stocksTable2")
table=table[0]
data = []
singleData = []

sp500bgLastDeal=soup2.find(id='bgLastDeal')
sp500_rate=sp500bgLastDeal.get_text()
sp500bgChangePc=soup2.find(id='bgChangePc')
sp500_change_in_percent=sp500bgChangePc.get_text()
sp500divChangeText=soup2.find(id='divChangeText')
sp500_change_in_dollars=sp500divChangeText.get_text()
singleData.append(['SP500_rate',sp500_rate])
singleData.append(['SP500 change in %',sp500_change_in_percent])
singleData.append(['SP500_change in $',sp500_change_in_dollars])
singleData.append(['Daily Dollar to Shekel rate',shaar_yacig])
singleData.append(['Current Dollar to Shekel rate',shaar_racif])

try:
    connection  = pymysql.connect(host = 'localhost', database = 'project', user = 'root', password = '')
    cursor = connection.cursor()
    query =""" DROP TABLE project.single_stats """
    cursor.execute(query)
    connection.commit()
    i = 0
    while i < len(singleData):
        query =""" CREATE TABLE IF NOT EXISTS project.single_stats(Name VARCHAR(45),Value VARCHAR(45)) """
        cursor.execute(query)
        query = """INSERT INTO project.single_stats VALUES (%s ,%s )   """
        values =(tuple(singleData[i]))
        print(values)
        cursor.execute(query,values)
        connection.commit()
        i += 1
except Error as e:
    print('Error : ',e)


for row in table.find_all('tr'):
    cols = row.find_all('td')
    cols = [ele.text.strip() for ele in cols]
    data.append([ele for ele in cols if ele]) # Get rid of empty values

try:
    connection  = pymysql.connect(host = 'localhost', database = 'project', user = 'root', password = '')
    cursor = connection.cursor()
    query =""" DROP TABLE project.sp500_stats """
    cursor.execute(query)
    connection.commit()
    query =""" CREATE TABLE IF NOT EXISTS project.sp500_stats(Name VARCHAR(45),Symbol VARCHAR(45),Stock_Market VARCHAR(45),Last_Deal VARCHAR(45), Last_Stock_Value VARCHAR(45), Daily_Change VARCHAR(45), Daily_Change_in VARCHAR(45), Total VARCHAR(45),Daily_Max VARCHAR(45),Daily_Min VARCHAR(45)) """
    cursor.execute(query)
    connection.commit()
    i = 0
    while i < len(data):

        query = """INSERT INTO project.sp500_stats VALUES (%s ,%s ,%s ,%s, %s ,%s ,%s ,%s ,%s, %s)   """
        values =(tuple(data[i]))
        cursor.execute(query,values)
        connection.commit()
        i += 1
except Error as e:
    print('Error : ',e)

