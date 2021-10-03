BRANCHING
https://www.canva.com/design/DAEPOwX2Zzs/90STrbMXNysYIkSsxUCu-g/view?utm_content=DAEPOwX2Zzs&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton#1

the hash that we get on every commit is a unique identifier that is made out of a hashing function, and the hash corresponds to the contents of the commit, among other things.

when we create a git repo (git init), there are no branches yet, but when we make the first commit, the default branch (master or main) is created by default.

from git's perspective, there's nothing special about the master branch. however, many companies treat it as the ultimate source of truth (the main copy, where everything works), where the current ultimate version of the project is. it's up to you if you want to do that. that approach is commonly known as 'feature branching' (see slide where the experimental 'adding a new feature' branch is merged back into the main branch)

the 'tip of the branch' is the last commit
'head' points to the tip of the reference branch
'head' is a reference to a branch pointer, and a branch pointer is where a branch currently is (last commit).
we can have many branches, and each one has a branch reference, that refers to where the branch is (last commit).

look at the slide: the branch pointer (or branch reference) updates to new commits as you create new commits (and 'head' points to that branch pointer), but when you create a new branch, the new branch pointer still refers to the same commit (the last commit you did under master), these are two branch references pointing at the same commit, but 'head' now points to 'DarkMode' which indicates that now you are on that branch. in a nutshell, 'head' indicates where you are currently checking out in your repo.
each branch has a branch reference, pointing where we left off (the last commit of that branch): a branch is a reference to some commit, when you create a new commit, it updates to the new commit. BUT in which branch are we?where are we?? 'head' will tell you in which branch we are (like a bookmark in a book), ie. which branch we are checking out.
You can see the 'head' when you type 'git log'

see screenshot: we are in the master branch, but we just created the new 'oldies' branch, that's why head points to master, but the branch reference 'oldies' is also at the same commit, because we just created it out of the master branch (two branch references pointing to the same commit, although head points to master, ie. we are on master)
next screenshot: after we switch branch to oldies, head points to oldies.
next screenshot: we are in the oldies branch, but you can see that the branch reference for master is pointing to an older commit, if we switch to the master branch, we go to that commit, since that's the last commit of the master branch. if we add additional commits to master branch, and then we switch to oldies, the master branch reference will not appear anymore when we git log from the oldies branch, because the last commit from master is not anymore in the oldies history of commits.

this is how to add all and commit at the same time:
git commit -a -m "our message"
(sometimes this doesn't work?)

if you want to create a branch and switch to it in the same step, using git checkout:

git checkout -b <branch-name>

if you try to switch branches but have not committed your work, it will tell you to commit your changes (or to stash them, we will see later what this means), or your work will be lost. THIS ONLY HAPPENS WHEN YOUR UNSTAGED WORK AND THE CONTENT OF THE BRANCH YOU ARE TRYING TO SWITCH TO, ARE IN CONFLICT. IF THEY ARE NOT IN CONFLICT (FOR EXAMPLE, YOU JUST ADD A NEW FILE, AND SWITCH BRANCH), YOU WILL BE ABLE TO CHANGE BRANCH (AND YOU WILL BRING THE NEW FILE WITH YOU TO THE BRANCH THAT YOU SWITCHED TO)

MERGING AND DELETING BRANCHES
after you merge a branch, you may not want to have this extra branch around, so you may want to delete it.

TO DELETE A BRANCH:
git branch -d <branch-name>

BUT WATCH OUT! you can't delete the branch you are checked out at. you have to switch branch, but then, if the branch is not merged, then you would get a warning message since your work in this branch will be lost (see screenshot) and then if you want to finally delete the branch:
git branch -D <branch-name>

TO RENAME A BRANCH:
first you have to change to the branch that you want to rename (this is opposite to what happens with deleting a branch: to delete a branch you have to switch to another branch, but to rename a branch you have to be ON that branch). Then:
git branch -m <new-name>

REMINDER: HEAD REFERENCES TO A PARTICULAR BRANCH, AND THE BRANCH REFERENCES TO A PARTICULAR COMMIT (THE LAST COMMIT IN THAT BRANCH). YOU CAN SEE THIS IF YOU GO INSIDE THE .git FOLDER: INSIDE THE 'HEADS' FOLDER THERE ARE FILES NAMED AS THE DIFFERENT BRANCHES THAT YOU HAVE, AND IF YOU OPEN ANY OF THESE FILES, YOU WILL FIND THE REFERENCE OF THE LATEST COMMIT OF THAT BRANCH (SEE SCREENSHOT), SO THESE BRANCH REFERENCES (THE FILES) ARE LIKE BOOKMARKS. THE 'HEAD' FILE CHANGES DEPENDING ON WHICH BRANCH WE ARE IN.

MERGING BRANCHES
https://www.canva.com/design/DAEUZEra8W0/b4I77uG1YJAu4q6UOTIG6Q/view?utm_content=DAEUZEra8W0&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

if you follow the 'feature branching' workflow in your team, you will not do any experiments in the master/main branch since you don't want to screw things up there. people will work in feature branches, and that work will be merged in the master/main branch if it is deemed appropriate.

a 'merge commit' is the first commit that we have seen that has two parent commits, this is something that will come up later on.
THE MERGE COMMIT WILL TAKE PLACE ON THE RECEIVING BRANCH (EG. MASTER)! THE OTHER BRANCH REFERENCE (EG. BUGFIX) WILL REMAIN IN THE FORMER COMMIT, NOT IN THE MERGE COMMIT!

imagine your colleage changed line 39 in the master branch, and you changed the same line in the bugfix branch. or another situation: your collague changed a file in the master branch, and you deleted that file in the bugfix branch. which one wins in the merge commit when we try to merge the branches? we have a conflict. you have to manually resolve conflicts: open the files where there are conflicts, fix them, and commit these changes. (the files where there are conflicts are decorated, they have new content to indicate where there are conflicts)

in a conflict, vs code gives you some functionality (accept current change, accept incoming change, accept both changes, compare changes)
BUT KEEP IN MIND, when you are resolving conflicts, you are not limited to either current or incoming, you can edit the file and write WHATEVER YOU WANT! (new comments to explain, code changes or whatever)

in a team, you have to merge often, or you will end up having conflicts

when you merge a branch into master, and then git log on master, you will see all the commits from master and also from the other merged branch, chronologically.

if you merge two branches with commits in different files, there will not be conflict for sure, but even if they were in the same file, it doesn't necessarily mean that there would be a conflict (I need to understand under what circumstances there are no conflict if both commits are in the same file): if changes are in the same file, but the master branch just has to fast forward (catch up with the incoming branch), there will be no conflict.

(REWATCH DEMOS AND REDO EXERCISES FROM SECTION 7?)