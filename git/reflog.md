# Reflog

過去のコミットの操作を参照できる
これを使えばどのコミットにでも戻れる

    git reflog
    
    b06701d HEAD@{2}: rebase -i (start): checkout HEAD~1
    71b8750 (HEAD -> feature/update_readme, origin/feature/update_readme) HEAD@{3}: reset: moving to HEAD
    71b8750 (HEAD -> feature/update_readme, origin/feature/update_readme) HEAD@{4}: rebase -i (finish): r
    71b8750 (HEAD -> feature/update_readme, origin/feature/update_readme) HEAD@{5}: rebase -i (start): ch
    71b8750 (HEAD -> feature/update_readme, origin/feature/update_readme) HEAD@{6}: commit (amend): Fix R
    62b2702 HEAD@{7}: commit: Fix README.MD from review.
    b06701d HEAD@{8}: checkout: moving from hotfix/change_cron_hogehoge to feature/update_readme
    e2b7aac (origin/hotfix/change_cron_hogehoge, hotfix/change_cron_hogehoge) HEAD@{9}: commit: C
    68274fe (origin/develop, develop) HEAD@{10}: checkout: moving from develop to hotfix/change_cron_hoge
    68274fe (origin/develop, develop) HEAD@{11}: checkout: moving from feature/279_Additemsrelatedtoplace
    35a8db4 (origin/feature/279_Additemsrelatedtohogehoge, feature/279_Additemsrelatedtohogehoge) HEAD@
    68274fe (origin/develop, develop) HEAD@{13}: pull origin develop: Fast-forward
    9e92cad HEAD@{14}: checkout: moving from fix/changed_fugafuga to develop
    06db36c (origin/fix/changed_fugafuga, fix/changed_fugafuga) HEAD@
    9e92cad HEAD@{16}: checkout: moving from develop to fix/changed_fugafuga
    9e92cad HEAD@{17}: pull origin develop: Fast-forward
    44d7293 HEAD@{18}: checkout: moving from feature/update_readme to develop
    b06701d HEAD@{19}: commit: Update release procedure.
    44d7293 HEAD@{20}: checkout: moving from develop to feature/update_readme
    44d7293 HEAD@{21}: pull origin develop: Fast-forward
    17a8c03 HEAD@{22}: reset: moving to HEAD^^
    
    # HEAD@{数字}でコミット指定できる
    # 例えばresetで戻すときは
    git reset --hard HEAD@{6}