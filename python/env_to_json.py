#!/usr/bin/env python
'''
Convert envfile to json
# Usage
  python env_to_json.py <envfile>
# Reference
  https://gist.github.com/GabLeRoux/d6b2c2f7a69ebcd8430ea59c9bcc62c0
'''
import json
import sys

def convert_env_to_json(content):
  # removes whitespace chars like '\n' at the end of each line
  content = [x.strip().split('=') for x in content if '=' in x]
  print(json.dumps(dict(content), indent=2))

def open_file(file):
  with open(file, 'r') as f:
    content = f.readlines()
  return content

def main():
  try:
    dotenv = sys.argv[1]
  except IndexError as e:
    dotenv = '.env'
  content = open_file(dotenv)
  convert_env_to_json(content)

if __name__ == '__main__':
  main()