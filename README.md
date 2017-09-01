# analise

This is a quick handy tool that helps traverse your filesystem and find possible file duplicates and also tells you the file storage you will save if they are deleted. It prints the list of possible duplicates so that you can delete it if required.

## How to run

This helps run analise and print the possible duplicates on sysout.
```
node analise.js -p /path/you/would/like/to/analyse
```

You can also store your index using the -o option. Note: the output file will have an extension of ".index".
```
node analise.js -p /path/you/would/like/to/analyse -o out
```

If you would like to use an existing index then you can run the following and it will provide possible duplicates.
```
node analise.js -i out
```

> This was a quick 1-2 hour exercise. The code is quite raw and not performant nor functional tested. It doesn't follow any particular standards. Will get this sorted in days to come.