# theres-a-hole-in-my-ceiling

## Running the app for development

From inside this directory, run 
```
python3 -m http.server 8000
```
and go to `http://localhost:8000` in your browser.

## Pushing changes (Professional Git 101)

The basics of git are the following:
```
git add .
git commit -m "what we changed"
git pull
git push
```
The first two lines can be merged into `git -am "what we changed"` but NOTE this will ignore new files that you create. It only pays attention to edits within files previously tracked.

`git pull` can be skipped if you know others didn't change anything in this branch.

The expected style for commit messages is an imperative tense: "add better logging", "fix issue #456", "rename PoorlyNamedClass", etc. Pretend you're telling git to do the thing you just did. The act of commiting your change is the act of doing that message, after all. Standardizing around this makes shorter and more readable commit messages for us to dig through later, as is sometimes necessary. Past tense is like a parenthetical: "we made the background orange, change it back to blue." Being consistent with imperative tense makes it clear that this commit did not make the background orange.

NOTE when starting to develop a feature, make a branch, called something like `ryan/cool-feature`:
```
git branch ryan/cool-feature
git checkout ryan/cool-feature
git add .
git commit -m "make cool feature"
git push origin HEAD
```
This creates the branch and then moves you there. The first two lines can be merged into
`git branch -M ryan/cool-feature` with no downside, but knowing how to switch branches (`git checkout`) is important. `git push origin HEAD` instead of `git push` is needed to make GitHub also create the branch on their side so they track your changes correctly.

(in summary, the shortened version of putting your edits into a new branch is
```
git branch -M ryan/cool-feature
git commit -am "cool feature"
git push origin HEAD
```
, if there are no new files in the first commit of the branch).

Note that you can use `git add` multiple times to name particular files to include in your branch, allowing you to exclude some of your edits in other files. Like
```
git branch -M ryan/cool-feature
git add src/cool/feature/helper.js
git add src/cool/feature/core.js
git add src/cool/feature/assets/logo.png
git commit -m "make cool feature"
git push origin HEAD
```

Whatever the case, once you do `git push origin HEAD` you'll be given a github link:
<img width="1039" height="291" alt="image" src="https://github.com/user-attachments/assets/e8f1e18a-7d62-4776-9d12-1a1d3d723070" />

Click that link to create the PR for your branch. YOU DON'T HAVE TO BE READY TO MERGE YET, you should create the PR anyway. Any future commits you push to that branch will get added to the PR, and we won't merge it until we all agree it's finished. It's much easier to create a PR with this link than to create a PR for a branch later, though both are possible.

You can add features to your features with further branches that branch off your branches. Be careful with this though. My (Ryan) personal style is to stick to branching off `main` only. It's more limiting but it avoids certain headaches that will make me sound like a deranged man touched by Cthulhu if I describe them to you.

Of course, feel free to `git checkout` into other people's branches to play with what they made before they merge! It's easier to fix things before merging than after anyway, so this can genuinely be very helpful.
