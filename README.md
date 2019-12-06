## Advent of Code Day 1

Run the program by executing `node main.mjs`.

### Goals of the project:
* write as functional as possible
* avoid building a full node app for bloat
* avoid Babel transpile
    * This means either write in a way that node natively understands or use the ES6 module format (mjs)

Getting the mjs format is tricky without also pulling in a package.json and specifying formats of the modules.  Node natively doesn't seem to understand the import (or maybe can't tell which format to use more likely) command.
To use import and arrow functions I used node v13.2.0 and all javascript files were mjs extensions.  A js extension throws an error that the import command can't be used.

The fuel.txt is a test file to validate simple examples that were provided on the Advent of Code website.
[Advent of Code website](https://adventofcode.com/2019)

## Advent Of Code Day 2

Whew, that was more complex by far than day 1!

Answer is 3895705 for part 1. I'll come back to this for cleanup.  I want to toggle the `restoreGravityAssist` so it can run without commenting that out. Part 2 made me write some ugly code.  Had to keep a "working copy" that I reset and an ugly for loop that had a label used to break out.