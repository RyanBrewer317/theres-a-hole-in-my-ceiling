# theres-a-hole-in-my-ceiling

### Running the app for development

From inside this directory, run 
```
python3 -m http.server 8000
```
and go to `http://localhost:8000` in your browser.

### Pushing changes

The basics of git are the following:
```
git add .
git commit -m "what we changed"
git pull
git push
```
The first two lines can be merged into `git -am "what we changed"` but NOTE this will ignore new files that you create. It only pays attention to edits within files previously tracked.

`git pull` can be skipped if you know others didn't change anything in this branch.

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

Doing this will give you a github link you should click.