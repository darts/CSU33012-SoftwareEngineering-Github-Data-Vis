# Basic Access to the Github API

This Python script takes the user currently logged in (determined by the access token) and prints all of their commit times to a file.  
A loading bar is also included.  
Some fireworks are available through: `python acc.py 0`. Not very useful but I was playing with a library.  

If you actually want to run the code you will need an active **Github Access Token**. If it is in your bash environment, it should be named `ACC_TOKEN_SWENG_GH`, otherwise just replace that line in the program with the string of the token.  
After this simply type: `python acc.py 1` into the command line and it will work it's way through your repos, adding commit times to 1 big friendly file. This will be slow as it is synchronous.  

Disclaimer: only tested on MacOS 10.14.6
