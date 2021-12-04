https://www.canva.com/design/DAEPtdekgz0/L9rfbid7gCFMGEZBLJcmlw/view?utm_content=DAEPtdekgz0&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

ssh: secure shell (protocol that allows us to be authenticated without entering email and password each time). we need to generate one of these keys and tell github about it. the first thing you do is to check whether or not you already have a key (see screenshot)

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

a remote is a destination URL where the hosted repo lives, and we give it a name (because urls are very long, a name is more convenient for us to fetch and push code). a very standard name for remotes is 'origin'. when you 'git remote -v', you can see the list of remote names and the urls they represent.

when you create a new repo in github, it doesn't have content, only the instructions (screenshot). when you push for the first time, then it gets the content

you can push any branch to github, but usually you may not want all your branches in github, or you may not want to push them all at once. often, you will push the master or main branch, and keep the other branches just in your local repo.

when you push a branch to origin (git push origin <branch-name>), you don't need to be on that branch, although that's what happens more often than not.

see screenshot: 'this branch is one commit ahead, one commit behind master'. What it means is that this branch has one commit that master doesn't have, but also that master has a commit that this branch doesn't have (this is the situation when there would be a merge commit if we merged these branches)

in github, you can see the most recent commit that affected each one of the files of the repo (see screenshot)

usually, what we do is we work with different branches in our local environment, then we merge into master, and then we push master to github (we don't usually push many branches into github).

git push origin cats (if the branch 'cats' doesn't exist yet in github, it will create it when we push our local 'cats' branch). the same will happen if we 'git push origin master' when the remote repo is empty (it will create the 'master' branch, and that will be the default branch in github, and the remote and local 'master' branches will be connected (see screenshot)). usually, we want to connect the remote and local branches with the same name, but we don't have to.

//
//

when you follow the instructions in github to rename your local 'master' branch to 'main' (git branch -M main), it's assuming that you are checkingout the master branch, so you rename 'master' to 'main'.
but you don't need to rename your 'master' branch. you can just 'git push origin master', and the 'main' default branch in the remote called origin will be renamed to 'master'

//
//

you can also set an upstream with a different name (although in reality we would very rarely do this):
git push -u origin cats:dogs

WITH THE SECOND OPTION (CREATING A REPO ON GITHUB AND CLONING IT DOWN), you can add a .gitignore, README.md, and license, on github, and then clone it down and it will be done in your local.

if you create a new repo in github and you initialize it with a readme, .gitignore, etc. the default branch will be called 'main' (this happens since 2020). this will not happen if you create an empty repo: since there is no content, there will be no branch.
on the other hand, when you create a new repo in your local environment, and make the first commmit, the default branch is called 'master'

when you have a local repo with a 'master' branch as default, but you want to change the name to 'main': you change the name of the local branch to 'main', you push it to origin, and github will create a new branch called 'main'. however, the old 'master' branch will still be on github as the default one. you can make 'main' the default branch by going to 'settings', 'branches', 'default branch'

see screenshot: git log --oneline:
learn how to read lattest commits for different branches in origin

RE-DO VIDEO 105

https://www.canva.com/design/DAEPyYicrxQ/EaXIXD_WWryEq7Z7YUSVlg/view?utm_content=DAEPyYicrxQ&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton
