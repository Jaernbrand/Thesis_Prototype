# Thesis_Prototype
Interface prototype for community driven text simplification. 
The prototype consists of two parts: (1) a very simple game 
built with [Phaser](http://phaser.io/) and (2) the GUI for the text 
simplification program.

## Game Assets
The game uses the following sound assets:
- Castle Theme by [Visager](http://freemusicarchive.org/music/Visager/)
- Magical thing by [jobro](https://www.freesound.org/people/jobro)
- Money Bag by [PhilSavlem](http://www.freesound.org/people/PhilSavlem/)

The human sprites are created by [SLEEP](http://sleepy-rpgmaker.tumblr.com/post/62480708702/character-from-legend-of-the-last-princess-a).

The remaining game assets are from [opengameart.org](http://opengameart.org/) and
are under public domain.

## Requirements
The prototype has to run in a webserver. The [install](#Install) 
target copies the prototype to the specified location.

Generating the documentation requires [jsdoc](https://github.com/jsdoc3/jsdoc).

## Install
Installation requires the variable *location* to be set.
Do this via the commandline when the target is called.

Usage:
```
make install location=<install directory>
```

Example:
```
make install location=$HOME/public_html/
```

## Documentation
The documentation is located in the directory *doc*.

To generate documentation call the *doc* target in the makefile:
```
make doc
```

The doc target is currently the default target, so the *doc*
target can be call by simply running:
```
make
```

To remove the documentation run the *clean* target: 
```
make clean
```
