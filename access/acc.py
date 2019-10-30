from github import Github
import os
import sys

# returns a sorted list of all commit dates and times
def getAllCommits(userName, contributor_count):
    g = Github(os.environ['ACC_TOKEN_SWENG_GH'])
    repos = g.get_user().get_repos()
    i = 1
    commList = []
    for repo in repos:
        print("Repo: " + str(i) + " of " + str(repos.totalCount))
        i += 1

        authList = list(repo.get_contributors())
        if authList[0].login == userName and len(authList) == contributor_count:

            commitList = repo.get_commits()
            j = 1
            for commit in commitList:
                print("Commit: " + str(j) + " of " + str(commitList.totalCount))
                j+=1
                commList.append(repo.get_commit(commit.sha).commit.author.date)

    return commList.sort()





# Main-y bit
if len(sys.argv) != 2:
    print(f'usage: {sys.argv[0]} <openType>\n       opentype: 0 = use existing dates\n                 1 = get fresh dates\n                 2 = *experimental* be smart and get only latest commits')
    exit(1)

if sys.argv[1] == '0':
    theF = open('commits.txt', 'r')
elif sys.argv[1] == '1':
    f1 = open('commits.txt', 'w+')
    commList = getAllCommits("dartse", 1)
    for date in commList:
        f1.write(str(date)+"\n")
    f1.close
else:
    print("err, invalid console input")
    exit(1)


