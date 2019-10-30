from github import Github
from asciimatics.particles import RingFirework, SerpentFirework, StarFirework, PalmFirework
from asciimatics.screen import Screen
from asciimatics.scene import Scene
from asciimatics.effects import Print
from asciimatics.renderers import BarChart, FigletText
from random import randint, choice
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
    commList.sort()
    return commList

def fireWorksAtTime(screen):
    scenes = []
    effects = []
    for x in range(0, 50):
        effects.append(PalmFirework(screen, 
                randint(0, screen.width),
                randint(screen.height // 8, screen.height * 3 // 4),
                randint(25, 40),
                start_frame=randint(0, 250)))
    
    scenes.append(Scene(effects, -1))
    screen.play(scenes, stop_on_resize=True)
    ev = screen.get_key()
    if ev in (ord('Q'), ord('q')):
        return


# def loadingGraph(screen):
#     scenes.append(Scene(effects,-1))
#     screen.play(scenes, stop_on_resize=True)
#     commList = getAllCommits("dartse", 1)
#     for date in commList:
#         f1.write(str(date)+"\n")
#     ev = screen.get_key()
#     if ev in (ord('Q'), ord('q')):
#         exit(1)
#         return

def getAllCommits2(screen, userName, contributor_count):
    g = Github(os.environ['ACC_TOKEN_SWENG_GH'])
    repos = g.get_user().get_repos()
    i = 1
    commList = []
    for repo in repos:
        a = '#'*(repos.totalCount - i)
        screen.clear()
        screen.print_at("Repos Remaining", 1,0)
        screen.print_at("R"*repos.totalCount, 1,1)
        screen.print_at(a, 1,2)
        screen.refresh()
        i += 1
        authList = list(repo.get_contributors())
        if authList[0].login == userName and len(authList) == contributor_count:

            commitList = repo.get_commits()
            j = 1
            for commit in commitList:
                screen.print_at("Commits Remaining", 1,3)                
                screen.print_at("C"*commitList.totalCount,1,4)
                screen.print_at("#"*j, 1,5)
                screen.refresh()
                j+=1
                commList.append(repo.get_commit(commit.sha).commit.author.date)
    commList.sort()
    return commList


def manBar(screen):
    screen.print_at("=", 10, 10)
    leVals = getAllCommits2(screen, "dartse", 1)
    f1 = open('commits.txt', 'w+')
    f1.write(str(leVals) + "\n")
    f1.close
    screen.refresh()
    return leVals



# Main-y bit
if len(sys.argv) != 2:
    print(f'usage: {sys.argv[0]} <openType>\n       opentype: 0 = use existing dates\n                 1 = get fresh dates\n                 2 = *experimental* be smart and get only latest commits')
    exit(1)

if sys.argv[1] == '0':
    theF = open('commits.txt', 'r')
    Screen.wrapper(fireWorksAtTime)
    
elif sys.argv[1] == '1':
    
    
    Screen.wrapper(manBar)
    
    
else:
    print("err, invalid console input")
    exit(1)




