# controllerPlay
node.js version of the controllerPlay.
My custom controller in my version of [dat.gui](https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.

Uses in my projects:
 * [DropdownMenu](https://github.com/anhr/DropdownMenu)

## Packaged Builds
The easiest way to use controllerPlay in your code is by using the built source at `build/controllerPlay.js`. These built JavaScript files bundle all the necessary dependencies to run controllerPlay.

In your `head` tag, include the following code:
```
<script src="https://raw.githack.com/anhr/DropdownMenu/master/build/controllerPlay.js"></script>
```

Now you can use window.controllerPlay for append to the dat.gui.

### new controllerPlay.PlayController( group, events )

Creates new PlayController.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>THREE.Group</code> |  | group of 3D objects for playing. See https://threejs.org/docs/index.html#api/en/objects/Group for details. |
| [events] | <code>String or HTMLElement</code> | "" | If string then menu item name. If HTMLElement then item element. Optional. |
| [events.onShowObject3D] | <code>callback</code> |  | The show 3D object event. callback function ( objects3DItem ). objects3DItem is selected mesh. |
| [events.onHideObject3D] | <code>callback</code> |  | The hide 3D object event. callback function ( objects3DItem ). objects3DItem is selected mesh. |
| [events.onRestoreObject3D] | <code>callback</code> |  | Event of restore of 3D object to original state. callback function ( objects3DItem ). objects3DItem is selected mesh. |
| [events.onSelectedObject3D] | <code>callback</code> |  | Event of selecting of 3D object. callback function ( objects3DItem ). objects3DItem is selected mesh. |

**Example. Simple menu.**  
```
<script>
dropdownMenu.create( [

	'Menu 1 ',
	{

		name: 'Menu 2 ',
		items: [

			'Item 2.1',
			{
				name: 'Item 2.2',
				onclick: function ( event ) {

					var message = 'Item 2.2 onclick';
					//console.log( message );
					alert( message )

				}
			},

		],

	},
	{

		name: 'Menu 3',
		onclick: function ( event ) {

			var message = 'Menu 3 onclick';
			//console.log( message );
			alert( message )

		},

	},

] );
</script>
```

**Example. Drop menu to the left or/and up.**  
```
<script>
dropdownMenu.create( [

	{

		name: 'Drop up',
		drop: 'up',
		items: [

			'up item 1',
			{
				name: 'up item 2',
				onclick: function ( event ) {

					var message = 'up item 2 onclick';
					//console.log( message );
					alert( message )

				}
			},

		],

	},
	{

		name: 'Left',
		drop: 'left',
		items: [

			'left item 1',
			{
				name: 'left item 2',
				onclick: function ( event ) {

					var message = 'left item 2 onclick';
					//console.log( message );
					alert( message )

				}
			},

		],

	},
	{

		name: 'Up left',
		drop:
		{

			left: true,
			up: true,

		},
		items: [

			'up left item 1',
			{
				name: 'up left item 2',
				onclick: function ( event ) {

					var message = 'up left item 2 onclick';
					//console.log( message );
					alert( message )

				}
			},

		],

	},

], {

		decorations: 'Gradient',

	} );
</script>
```

**Example. Button inside canvas.**  
```
<div class="container" id="containerDSE">
	<canvas id="canvas"></canvas>
</div>
<script>
var elContainer = document.getElementById( "containerDSE" ),
elCanvas = elContainer.querySelector( 'canvas' );

dropdownMenu.create( [

	{

		name: 'Button',
		onclick: function ( event ) {

			var message = 'Button onclick';
			//console.log( message );
			alert( message )

		},

	},

], {

	elParent: elContainer,
	canvas: elCanvas,
	decorations: 'Transparent',

} );
</script>
```

## Directory Contents

```
└── build - Compiled source code.
└── styles - Menu styles.
└── Examples/html/ - Example.
```

## Building your own DropdownMenu

In the terminal, enter the following:

```
$ npm install
$ npm run build
```

## npm scripts

- npm run build - Build development and production version of scripts.


## On the following browsers have been successfully tested:

Windows 10

	IE 11

	Microsoft Edge 41

	Chrome 74

	Opera 60

	Safari 5.1.7 

	FireFox 56

Android 6.0.1

	Chrome 74 - Some very strange issues if you append into your web page three and more menus and include an elements between menus.
		Please see "Attention! Line below is not compatible with Android mobile version of the Chrome." comment
		in https://github.com/anhr/DropdownMenu/blob/master/Examples/html/index.html file for more details.


	Samsung Galaxy S5 Internet 9.2 - Same issues as Chrome

	FireFox 67

	Opera 52

	Opera Mini 43 - Same issues as Chrome

LG Smart tv

	Chrome 


## Thanks
The following libraries / open-source projects were used in the development of DropdownMenu:
 * [Rollup](https://rollupjs.org)
 * [Node.js](http://nodejs.org/)
 * [three.js](https://threejs.org/)

 ## Have a job for me?
Please read [About Me](https://anhr.github.io/AboutMe/).
