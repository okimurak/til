#!/bin/bash
# Mackerel Custom Metric Sample Script
# mackerel-agent.conf
# [plugin.metrics.MySQL_RemainingSlowQueryCount]
# command = "/path/to/sample_custom_metric.sh"
# or
# command = ["/bin/bash", "/path/to/sample_custom_metric.sh"]

METRICS_NAME="sample.metric"
EPOCH_TIME=$(date +%s)
echo "${METRICS_NAME}\t10\t${EPOCH_TIME}"