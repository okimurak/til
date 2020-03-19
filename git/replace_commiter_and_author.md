# CommitterとAuthorの修正

## 全置換

```
git filter-branch -f --env-filter \ 
 "GIT_COMMITTER_NAME='New Author'; \
  GIT_AUTHOR_NAME='New Author'; \
  GIT_COMMITTER_EMAIL='New Email'; \
  GIT_AUTHOR_EMAIL='New Email';" \
HEAD
```

## 条件付き

ifを付与
```
git filter-branch --commit-filter ' 
  if [ "$GIT_COMMITTER_EMAIL" = "target" ];
    then
        GIT_COMMITTER_NAME="New Author";
        GIT_AUTHOR_NAME="New Author";
        GIT_COMMITTER_EMAIL="New Email";
        GIT_AUTHOR_EMAIL="New Email";
        git commit-tree "$@";
    else
        git commit-tree "$@";
    fi'  HEAD
```

## 参考
- [GitのCommitユーザを修正する方法 - Qiita](https://qiita.com/y10exxx/items/dcea0e39788d649ca8ba)