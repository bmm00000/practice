https://www.canva.com/design/DAEVUT6HslA/tbdbyITzamUidWfk-HcSug/view?utm_content=DAEVUT6HslA&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

in the chunk header, there's a line from the provided context that is not technically part of the chunk. This is confusing, do not care about it. In reality, the chunk starts after the header.

usually the symbols - and + (red and green) mean old vs new, but not always.

git commit -am "message here" (this this work???)

staging area is also referred to as the index in the documentation, sometimes this is confusing.

git diff compares staging area and working directory. another way to think about it: it tells us the changes that we could tell git to add to the staging area:: '-' is what the staging area last knew about (old version), and '+' is the new version with the changes that we currently have in our working directory (it doesn't always means that something is new, it just means that it came from file 'b', and in our case file 'b' are the new changes)

remember, HEAD points to a branch reference, which points to the last commit of that branch. Therefore, 'git diff HEAD' lists all the changes in the working directory since your last commit: IT INCLUDES STAGED AND UNSTAGED CHANGES (everything new in the working directory since the HEAD commit)

WATCH OUT! when you create a new file in the working directory, it's untracked (neither the staging area nor former commits never knew about it). therefore, if you 'git diff' or 'git diff HEAD' it will appear nothing. only when the staging area knows about it for the first time, THEN it will be able to compare it with future versions, and the changes start to appear when you 'git diff'.
when you 'git add' the new file for the first time, and then you 'git diff' it will appear nothing (no difference between current working directory and staging area). but when you 'git add' the new file for the first time, and then you 'git diff HEAD', it appears what you get in the screenshot: (when we create a new file, git will tell us like this: --- /dev/null (see screenshot)).
rule of thumb: 'git status' shows you the new files, but 'git diff' shows you the difference between existing files in different moments.

(VIEW AGAIN VIDEO 65, REPEAT THE DEMO)?

IN A NUTSHELL, 'git diff' tells us only unstaged changes (difference between working directory and staging area). 'git diff HEAD' tells us all uncommited channges currently in the working directory (unstaged and staged: difference between working directory and last commit in current branch (HEAD))

'git diff --staged' will show you only the staged changes.
'git diff' will show you only the unstaged changes.
'git diff HEAD' will show you all staged and unstaged changes.

when you diff specific files, you can add several files, eg: git diff HEAD index.html app.css

when you are comparing branches, you can separate them by .. or just a space. the order that you type the branches matters for what the result of the comparison (it doesn't matter which branch you are in at the moment)

to compare commits, you only need the oneline hashes (short version) that you get when you 'git log --oneline' (the order also matters, the same as with comparing branches)

QUESTION TO POST IN FORUMS: IS IT POSSIBLE TO COMPARE COMMITS FROM DIFFERENT BRANCHES?
