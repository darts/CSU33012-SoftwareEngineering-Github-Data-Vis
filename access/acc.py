from github import Github
import os

f1 = open('commits.txt', 'w+')

g = Github(os.environ['ACC_TOKEN_SWENG_GH'])
repos = g.get_user().get_repos()
i = 1
for repo in repos:
    print("Repo: " + str(i) + " of " + str(repos.totalCount))
    i += 1
    # keyKey = (list(repo.get_branches())[0].commit).sha
    # print(repo.get_commit(keyKey).commit.author.date)
    # print(list(repo.get_contributors()))
    authList = list(repo.get_contributors())
    if authList[0].login == "dartse" and len(authList) == 1:
        # print(authList)
        commitList = repo.get_commits()
        j = 1
        for commit in commitList:
            print("Commit: " + str(j) + " of " + str(commitList.totalCount))
            j+=1
            f1.write(str(repo.get_commit(commit.sha).commit.author.date)+ "\n")
            # print(commit)
            # print(repo.get_commit(commit.sha).commit.author.date)
f1.close