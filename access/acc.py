from github import Github
import os

f1 = open('commits.txt', 'w+')

g = Github(os.environ['ACC_TOKEN_SWENG_GH'])
repos = g.get_user().get_repos()
for repo in repos:
    # keyKey = (list(repo.get_branches())[0].commit).sha
    # print(repo.get_commit(keyKey).commit.author.date)
    # print(list(repo.get_contributors()))
    authList = list(repo.get_contributors())
    if authList[0].login == "dartse" and len(authList) == 1:
        print(authList)
    #     commitList = g.get_user().get_repos()[0].get_commits()
    #     for commit in commitList:
    #         # f1.writelines()
    #         print(commit.author)
    #         # print(repo.get_commit(commit.sha).commit.author.date)
