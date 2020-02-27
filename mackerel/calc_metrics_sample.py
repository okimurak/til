import datetime
import time
import json
import requests
from enum import Enum

'''
MackerelのAPI経由で、1週間のメトリクスを集計する

TODO : 
 - Enumはconfigとして切り出す
 - API_KEYの扱い
'''

class Conf(Enum):
  '''
  設定をまとめた Enumクラス
  '''
  MACKEREL_APIKEY = "HOGEHOGEKEY"

class Hostid(Enum):
  '''
  Mackerelの hostidをまとめた Enum クラス
  '''
  host1 = "hostid1"
  host2 = "hostid2"
  host3 = "hostid3"

class Metrics(Enum):
  metrics1 = "metrics1
  metrics2 = "metrics2"
  metrics3 = "metrics3"
  metrics4 = "metrics4"

def get_epoctime(dt):
  '''
    Get epoctime
  '''
  return int(dt.timestamp())


def get_epoctime_from_and_to(dt):
  '''
  指定した日付から1週間のfrom と toを取得する
  '''
  weekAgo = datetime.datetime.combine(dt - datetime.timedelta(days = 7),datetime.time(0,0,0,0))
  return get_epoctime(weekAgo),  get_epoctime(dt)

def get_metrics(hostid, metrics, fromTime, toTime):
  '''
  Mackerel API から メトリックを取得する
  '''
  headers = {
    'X-Api-Key': Conf.MACKEREL_APIKEY.value,
  }

  params = (
    ('name', metrics),
    ('from', fromTime),
    ('to', toTime),
  )

  request_url = "https://api.mackerelio.com/api/v0/hosts/" + hostid + "/metrics"
  response = requests.get(request_url, headers=headers, params=params)

  return response

def collect_data(datas):
  '''
  データを集計して、平均と最大、最小を算出する
  '''

  values_list = []
  sum = 0

  for data in datas:
    value = data['value'] * 8 ## Bps -> bps
    values_list.append(value)
    sum += value

  return sum / len(values_list), max(values_list), min(values_list)


def main():
  '''
  メトリックの結果を出力する

  host, Metrics, Average, Max, Min
  host1, metrics1, 103.4, 531.1, 50.124
  host1, metrics2, 433.4, 2141.1, 20.175
  host1, metrics3, 42.4, 314.1, 12.141
  host1, metrics4, 234.4, 782.1, 0.11
  host2, metrics1, 75.4, 360.1, 45.1
   .... 
  '''
  time = datetime.datetime.now()
  fromTime, toTime = get_epoctime_from_and_to(time)
  print("from = " + str(fromTime) + " | to = " + str(toTime))
  print("host, Metrics, Average, Max, Min")
  for hostid in Hostid:
    for metrics in Metrics:
      response = get_metrics(hostid.value, metrics.value, fromTime, toTime)
      resdata = response.json() 
      ave, max, min = collect_data(resdata['metrics'])
      l = []
      l += [hostid.name, metrics.name, str(ave), str(max), str(min)]
      print(','.join(l))

if __name__ == '__main__':
  main()