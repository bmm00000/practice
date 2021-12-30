INTRO
https://www.canva.com/design/DAETQyFE6pM/mLt1oYF8gP_mqBS3ghb-BA/view?utm_content=DAETQyFE6pM&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton#2

stackshare.io: you can see the tech stack that companies use.

INSTALLATION
https://www.canva.com/design/DAEXMu7dx04/x1kkoUK-g_j6UtObmUwbDA/view?utm_content=DAEXMu7dx04&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

CHECK YOUR EXISTING NAME AND EMAIL ON GIT:
git config user.name
git config user.email

CLI COMMANDS:
in git bash: open . is start .

ls name-of-folder (you can see what's inside the folder)
ls name-of-folder/name-of-folder-inside
open name-of-folder

clear

pwd (prints out the path, your location)

rm purple.txt (deletes a file)
rm -rf plants (deletes a folder; r=recursive, f=force)

ls -a (lists all files, including hidden files)

BASICS OF GIT
https://www.canva.com/design/DAEPH_Lq4Wk/Wp_d5Rvk_OjVvgPH0xmzhg/view?utm_content=DAEPH_Lq4Wk&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

USE 'git status' TO MAKE SURE YOU ARE NOT ALREADY INSIDE OF A GIT REPO!!

git log

https://www.canva.com/design/DAEXMibkysc/4PgPWiQqZ5UwCxMruH6BmQ/view?utm_content=DAEXMibkysc&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

if you don't use atomic commits, and then need to undo a commit, you can lose a lot of work made by others, that's why we use atomic commits.

when we need to include a long message in the commit, we cannot use the -m flag. we need to open an editor. by default, VIM is very annoying. that's why we can configure any editor that will pop up by default when we 'git commit':
https://git-scm.com/book/en/v2/Appendix-C%3A-Git-Commands-Setup-and-Config

when we 'git log' and we want to avoid to see very long commit messages and commit codes, we use:
git log --oneline

that's why, when we use long messages, we have to summarize the commit IN THE FIRST LINE, then leave an empty line, and add the rest of the long message.

'--amend' allows you to re-do ONLY the previous commit.

when writing .gitignore, make sure you name the directories like this: ignore-this-directory/

in this website, you type the language of your project, for example 'Python', and it gives you a template for a .gitignore file:
https://www.toptal.com/developers/gitignore
