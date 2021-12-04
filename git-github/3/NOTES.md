https://www.canva.com/design/DAEVUT6HslA/tbdbyITzamUidWfk-HcSug/view?utm_content=DAEVUT6HslA&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

git diff is an informative command (like git status and git log), ie. it doesn't change anything.

in the chunk header, there's a line from the provided context that is not technically part of the chunk. This is confusing, do not care about it. In reality, the chunk starts after the header.

usually the symbols - and + (red and green) mean old vs new, but not always.

git commit -am "message here" (does this work??? I think it does only if the file was already created and we are commiting changes in the pre-existing file, ie. all the files are tracked)

staging area is also referred to as the index in the documentation, sometimes this is confusing.

'git diff' compares staging area and working directory. another way to think about it: it tells us the changes that we could tell git to add to the staging area:: '-' is what the staging area last knew about (old version), and '+' is the new version with the changes that we currently have in our working directory (it doesn't always mean that something is new, it just means that it came from file 'b', and in our case file 'b' are the new changes)

remember, HEAD points to a branch reference, which points to the last commit of that branch. Therefore, 'git diff HEAD' lists all the changes in the working directory since your last commit: IT INCLUDES STAGED AND UNSTAGED CHANGES (everything new in the working directory since the HEAD commit, it doesn't matter if the changes are staged or not)

WATCH OUT! when you create a new file in the working directory, it's untracked (neither the staging area nor former commits never knew about it). therefore, if you 'git diff' or 'git diff HEAD' it will appear nothing. only when the staging area knows about it for the first time, THEN it will be able to compare it with future versions, and the changes start to appear when you 'git diff'.
when you 'git add' the new file for the first time, and then you 'git diff' it will appear nothing (no difference between current working directory and staging area). but when you 'git add' the new file for the first time (now it's tracked), and then you 'git diff HEAD', it appears what you get in the screenshot: (when we create a new file, git will tell us like this: --- /dev/null (see screenshot)).
rule of thumb: 'git status' shows you the new files, but 'git diff' shows you the difference between existing files in different moments.

IN A NUTSHELL, 'git diff' tells us only unstaged changes (difference between working directory and staging area). 'git diff HEAD' tells us all uncommited channges currently in the working directory (unstaged and staged: difference between working directory and last commit in current branch (HEAD))

(VIEW AGAIN VIDEO 65, REPEAT THE DEMO)

'git diff --staged' will show you only the staged changes.
'git diff' will show you only the unstaged changes.
'git diff HEAD' will show you all staged and unstaged changes.

when you diff specific files, you can add several files, eg: git diff HEAD index.html app.css
you can also just 'git diff <file-name>' (this option is not included in the slides, but it works as well)

when you are comparing branches, you can separate them by .. or just a space. the order that you type the branches matters for what the result of the comparison (it doesn't matter which branch you are in at the moment)

to compare commits, you only need the oneline hashes (short version, or you can also copy part of the complete hash) that you get when you 'git log --oneline' (the order also matters, the same as with comparing branches). I have tried, and it is also POSSIBLE TO COMPARE COMMITS FROM DIFFERENT BRANCHES.

to compare the HEAD commit with the previous one (its parent commit):
git diff HEAD HEAD~1

if you want to compare the previous commit to the head:
git diff HEAD~1 HEAD

if you want to compare the previous commit to the working directory (staged and unstaged changes):
git diff HEAD~1

STASHING:
https://www.canva.com/design/DAEPsQa6BFE/uNs08sHSGN1XziSUt1BLHQ/view?utm_content=DAEPsQa6BFE&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

some people don't use stashing much, it's more of a convenient tool that can help you in certain situations

imagine that you have to change branches (for example, a co-worker asks for help), but you are not done with what you are doing and don't want to commit yet (you never commit unnecessarily, since commits are the history of your project). when you are trying to change branches, if there's a conflict, git will not let you change branches. how to solve this problem? you don't need to wait until you commit on your current branch, because you can stash changes (or, git lets you switch branches because there is no conflict but you don't want to bring the changes with you to the other branch)

(HOW TO THINK ABOUT CONFLICT IN GENERAL: if you were merging, would it be a fast-forward? if yes, THERE IS NO CONFLICT, otherwise, there's conflict.)

YOU CAN USE STASH TO PAUSE OR 'SAVE' YOUR CHANGES BEFORE YOU COMMIT THEM

git stash pop: you can use the stashed changes in any other branch, not only to the original one. if there's conflict, the following also applies:

git stash apply: there may be a conflict when you are trying to apply the changes from one branch to another branch. in that case, you need to resolve the conflict manually, add and commit (the same as with merging)

staging area is also known as index
WIP: work in progress

when you are popping or applying stashes from the stash stack, the last stash pops up first: LIFO (last in first out)

UNDOING CHANGES AND TIME TRAVELING:
https://www.canva.com/design/DAEPZZHOafo/uagxrNdvbI_wDpjfNpK_4w/view?utm_content=DAEPZZHOafo&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

in 'detached head' state, HEAD points to a commmit, not to a branch reference (see screenshot)

you can 'git checkout HEAD~1' consecutive times to go back further. since the head is detached, it will go back one more commit, and one more commit, etc.

git switch - : when you are on detached head, this will take you back to whatever branch you were last, so you don't need to remember in which branch you were before.

git restore --source: when you restore former commits, you don't go back in time, you are still in HEAD, your branch reference, and the latest commit. only that the file is modified copying what appears on that commit that you are restoring.

you can restore several files, for example:
git restore --source HEAD~2 cat.txt dog.txt

git reset: with a basic or plain reset, the commits are eliminated but the content of your files remains the same as before the reset (the files remain as changed in the working directory). this is useful when you don't want to lose that work, eg. you made some commits on the wrong branch, you want to keep that work, but commit it to another branch.

sometimes, git revert can result in conflicts, where you need to go to the file and decide what to keep, like any other conflict when you merge. this happens if you revert not the latest commit but a former one.

QUESTIONS:

1. The message says you can make commits in detached state. What I understand from the lecture is that, if you want to make commits, you have to create a new branch in that past commit, and then you can commit in that branch, but then you are not on detached head state anymore. Why does the message say that you can commit in detached head state?

Good question! So you can technically make commits in detached HEAD, but those commits will not be associated with any branch. When you leave detached HEAD and go back to a branch, those commits are lost. They aren't attached to any branch. You'll see a message like this when you try to leave:

Warning: you are leaving 1 commit behind, not connected to
any of your branches:
If you want to keep it by creating a new branch, this may be a good time
to do so with...

You can keep the commits if you create a new branch while in detached HEAD, as the message above mentions. Let me know if you have any other questions!

2. 'Indigo' should be in black because it's common between both versions. Why is it colored?

This is an issue with whitespace changes and line endings in Git. In the first version, the file ends with "indigo". In the second version, you added a return or some whitespaces after "indigo" (even though we can't see it), so Git thinks it changed. You can prevent this behavior by running this in your terminal:

git config --global core.autocrlf true
