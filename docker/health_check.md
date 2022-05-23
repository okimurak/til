# Health Check

docker run のオプション。

```text
  --health-cmd            Command to run to check health
  --health-interval       Time between running the check
  --health-retries        Consecutive failures needed to report unhealthy
  --health-timeout        Maximum time to allow one check to run
  --health-start-period   Start period for the container to initialize before starting health-retries countdown
  --no-healthcheck        Disable any container-specified HEALTHCHECK
```

もしくは下記のように Dockerfile に書ける。(デフォルトシェルを介さず、直接コマンドを叩きたい場合は下記のみ)

```dockerfile
HEALTHCHECK --interval=5s --retries=3 --start-period=5s --timeout=10s \
  CMD ["/bin/healthcommand", "-port=:8080"]
```

## Reference

- [Docker run reference | Docker Documentation](https://docs.docker.com/engine/reference/run/#healthcheck)
