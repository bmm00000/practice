https://www.canva.com/design/DAEPtdekgz0/L9rfbid7gCFMGEZBLJcmlw/view?utm_content=DAEPtdekgz0&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

a very standard name for remotes is 'origin'

when you create a new repo in github, it doesn't have content, only the instructions (screenshot). when you push for the first time, then it gets the content

when you push a branch to origin (git push origin <branch-name>), you don't need to be on that branch, although that's what happens more often than not.

RE-WATCH VIDEO 99

usually, what we do is we work with different branches in our local environment, then we merge into master, and then we push master to github (we don't usually push many branches into github).

git push origin cats (if the branch 'cats' doesn't exist yet in github, it will create it when we push our local 'cats' branch)

you can also set an upstream with a different name (although in reality we would very rarely do this):
git push -u origin cats:dogs

WITH THE SECOND OPTION (CREATING A REPO ON GITHUB AND CLONING IT DOWN), you can add a .gitignore, README.md, and license, on github, and then clone it down and it will be done in your local.

if you create a new repo in github and you initialize it with a readme, .gitignore, etc. the default branch will be called 'main' (this happens since 2020). this will not happen if you create an empty repo: since there is no content, there will be no branch.
on the other hand, when you create a new repo in your local environment, and make the first commmit, the default branch is called 'master'

when you have a local repo with a 'master' branch as default, but you want to change the name to 'main': you change the name of the local branch to 'main', you push it to origin, and github will create a new branch called 'main'. however, the old 'master' branch will still be on github as the default one. you can make 'main' the default branch by going to 'settings', 'branches', 'default branch'

see screenshot: git log --oneline:
learn how to read lattest commits for different branches in origin

RE-DO VIDEO 105
