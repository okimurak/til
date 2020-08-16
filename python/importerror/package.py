try:
  from sample_module.v2 import utils
except ImportError:
  from sample_module.v1 import utils

utils.say()