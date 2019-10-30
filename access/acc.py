from github import Github
from asciimatics.particles import RingFirework, SerpentFirework, StarFirework, PalmFirework
from asciimatics.screen import Screen
from asciimatics.scene import Scene
from asciimatics.effects import Print
from asciimatics.renderers import BarChart, FigletText
from random import randint, choice
import os
import sys

a = 0
b = 0

def c():
    return lambda:a

# returns a sorted list of all commit dates and times
def getAllCommits(userName, contributor_count):
    g = Github(os.environ['ACC_TOKEN_SWENG_GH'])
    repos = g.get_user().get_repos()
    i = 1
    commList = []
    for repo in repos:
        print("Repo: " + str(i) + " of " + str(repos.totalCount))
        i += 1
        a = i
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


def loadingGraph(screen):
    scenes = []
    Print(screen,
                BarChart(
                      10, 80,
                      [c],
                      colour=[c for c in range(1, 8)],
                      bg=[c for c in range(1, 8)],
                      scale=2.0,
                      axes=BarChart.X_AXIS,
                      intervals=0.5,
                      labels=True,
                      border=False),
                  x=3, y=13, transparent=False, speed=2)
    screen.play(scenes, stop_on_resize=True)
    ev = screen.get_key()
    if ev in (ord('Q'), ord('q')):
        return


# Main-y bit
if len(sys.argv) != 2:
    print(f'usage: {sys.argv[0]} <openType>\n       opentype: 0 = use existing dates\n                 1 = get fresh dates\n                 2 = *experimental* be smart and get only latest commits')
    exit(1)

if sys.argv[1] == '0':
    theF = open('commits.txt', 'r')
    Screen.wrapper(fireWorksAtTime)
    
elif sys.argv[1] == '1':
    f1 = open('commits.txt', 'w+')
    commList = getAllCommits("dartse", 1)
    Screen.wrapper(loadingGraph)
    for date in commList:
        f1.write(str(date)+"\n")
    f1.close
else:
    print("err, invalid console input")
    exit(1)




