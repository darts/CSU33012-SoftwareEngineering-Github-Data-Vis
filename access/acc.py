from github import Github
import os

g = Github(os.environ['ACC_TOKEN_SWENG_GH'])

for repo in g.get_user().get_repos():
    print(repo.full_name)
