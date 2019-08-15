/**
 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.
 * 
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//import { GUI, controllers } from 'D:/My documents/MyProjects/webgl/three.js/GitHub/dat.gui';
//Please download https://github.com/anhr/dat.gui/tree/CustomController to '../../dat.gui' folder
import { GUI, controllers } from '../../dat.gui';

//Localization

export var lang = {

	prevSymbol: '←',
	prevSymbolTitle: 'Go to previous object 3D',
	nextSymbol: '→',
	nextSymbolTitle: 'Go to next object 3D',
	playSymbol: '►',
	playTitle: 'Play',
	pause: '❚❚',
	pauseTitle: 'Pause',
	repeat: '⥀',
	repeatOn: 'Turn repeat on',
	repeatOff: 'Turn repeat off',
	controllerTitle: 'Rate of changing of selected of 3D objects per second.',

};

switch ( ( ( typeof THREE === 'undefined' ) || ( typeof THREE.getLanguageCode === 'undefined' ) ) ? 'en' : THREE.getLanguageCode() ) {

	case 'ru'://Russian language
		lang.prevSymbolTitle = 'Выбрать предыдущий 3D объект';//'Go to previous object 3D',
		lang.playTitle = 'Проиграть';//'Play'
		lang.nextSymbolTitle = 'Выбрать следующий 3D объект';//'Go to next object 3D';
		lang.pauseTitle = 'Пауза';//'Pause',
		lang.repeatOn = 'Повторять проигрывание';
		lang.repeatOff = 'Остановить повтор проигрывания';
		lang.controllerTitle = 'Скорость выбора 3D объекта в секунду.';

		break;

}

function addButton( innerHTML, title, onclick ) {

	var button = document.createElement( 'span' );
	button.innerHTML = innerHTML;
	button.title = title;
	button.style.cursor = 'pointer';
	button.style.margin = '0px 2px';
	button.onclick = onclick;
	return button;

}

/**
 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.
 * 
 * @class PlayController
 *
 * @extends dat.controllers.CustomController
 *
 */
class PlayController extends controllers.CustomController {

	/**
	 * @callback THREEGroup THREE.Group. See https://threejs.org/docs/index.html#api/en/objects/Group for details
	 */

	/**
	 * @callback Mesh Class representing triangular polygon mesh based objects. See https://threejs.org/docs/index.html#api/en/objects/Group for details
	 */

	/**
	 * @callback onEvent
	 * @param {Mesh} objects3DItem selected mesh.
	 */

	/**
	 * @callback onSelectedObject3D
	 * @param {Mesh} objects3DItem selected mesh.
	 * @param {number} index index of selected mesh.
	 */

	/**
	 * @callback onShowObject3D
	 * @param {Mesh} objects3DItem showed mesh.
	 * @param {number} index index of showed mesh.
	 */

	/**
	 * @callback onRenamePlayButton
	 * @param {string} name name of the Play button
	 * @param {string} title title
	 * @param {boolean} [play] true - start playing.
	 */

	/**
	 * @callback onRenameRepeatButton
	 * @param {string} title title of the Repeat button
	 * @param {string} color style.color of the Repeat button.
	 */

	/**
	 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.
	 * @param {THREEGroup} group group of 3D objects for playing.
	 * @param {Object} [events] controller events. Default no events is sent to your web page.
	 * @param {onShowObject3D} [events.onShowObject3D] The show 3D object event.
	 * @param {onEvent} [events.onHideObject3D] The hide 3D object event.
	 * @param {onEvent} [events.onRestoreObject3D] Event of restore of 3D object to original state.
	 * @param {onSelectedObject3D} [events.onSelectedObject3D] Event of selecting of 3D object.
	 * @param {onRenamePlayButton} [events.onRenamePlayButton] Event of renaming of the Play button.
	 * @param {onRenameRepeatButton} [events.onRenameRepeatButton] Event of renaming of the Repeat button.
	 */
	constructor( group, events ) {

		events = events || {};
		var _playNext, _prev, _play, _repeat, _next, _getGroup, _selectObject3D;
		super( {

			playRate: 1,//Default play rate is 1 changes per second
			property: function ( customController ) {

				var buttons = {};
				function RenamePlayButtons( innerHTML, title, play ) {

					buttons.buttonPlay.innerHTML = innerHTML;
					buttons.buttonPlay.title = title;
					if ( events.onRenamePlayButton !== undefined )
						events.onRenamePlayButton( innerHTML, title, play );

				}

				var selectObject3DIndex = -1;

				function play() {

/*
					if ( events.onPlay !== undefined )
						events.onPlay();
*/

					//show of selected object3D and hide others
					if ( ( selectObject3DIndex === -1 ) || ( selectObject3DIndex === group.children.length ) ) {

						selectObject3DIndex = 0;

					}
					for ( var i = 0; i < group.children.length; i++ ) {

						var objects3DItem = group.children[i];
						if ( selectObject3DIndex === i ) {

							if ( events.onShowObject3D !== undefined )
								events.onShowObject3D( objects3DItem, selectObject3DIndex );

						} else {

							if ( events.onHideObject3D !== undefined )
								events.onHideObject3D( objects3DItem );
	
						}

					}
//					RenamePlayButtons( lang.pause, lang.pauseTitle );

				}

				function pause() {

					//Restore colors and visible
					for ( var i = 0; i < group.children.length; i++ ) {

						var objects3DItem = group.children[i];
						if ( events.onRestoreObject3D !== undefined )
							events.onRestoreObject3D( objects3DItem );

					}

					RenamePlayButtons( lang.playSymbol, lang.playTitle );

					clearInterval( group.userData.timerId );
					group.userData.timerId = undefined;

				}
				function isRepeat() {

					return buttons.buttonRepeat.title !== lang.repeatOn;

				}
				function playNext() {

					selectObject3DIndex++;
					if ( selectObject3DIndex >= group.children.length ) {

						if ( isRepeat() )
							selectObject3DIndex = 0;
						else {

							pause();
							return;

						}

					}
					play();

				}
				_playNext = playNext;

				//Go to previous object 3D button
				function prev() {

					selectObject3D( selectObject3DIndex - 1 );
/*
					if ( selectObject3DIndex === -1 )
						selectObject3DIndex = group.children.length;
					var objects3DItem = group.children[selectObject3DIndex];
					if ( objects3DItem !== undefined ) {

						if ( events.onRestoreObject3D !== undefined )
							events.onRestoreObject3D( objects3DItem );

					}
					selectObject3DIndex--;
					if ( selectObject3DIndex < 0 )
						selectObject3DIndex = group.children.length - 1;
					objects3DItem = group.children[selectObject3DIndex];
					if ( events.onSelectedObject3D !== undefined )
						events.onSelectedObject3D( objects3DItem, selectObject3DIndex );
*/

				}
				_prev = prev;
				buttons.buttonPrev = addButton( lang.prevSymbol, lang.prevSymbolTitle, prev );

				//Play/Pause button
				function play3DObject( value ) {

					if ( buttons.buttonPlay.innerHTML === lang.playSymbol ) {

						group.userData.timerId = -1;
						play( group, events );
						RenamePlayButtons( lang.pause, lang.pauseTitle, true );
						group.userData.timerId = setInterval( playNext,
							1000 / ( typeof customController.controller === 'undefined' ? 1 : customController.controller.getValue() ) );

					} else pause();

				}
				_play = play3DObject;
				buttons.buttonPlay = addButton( lang.playSymbol, lang.playTitle, play3DObject );

				//Repeat button
				var colorGray = 'rgb(200,200,200)';
				function repeat( value ) {

					function RenameRepeatButtons( title, color ) {

						buttons.buttonRepeat.title = title;
						buttons.buttonRepeat.style.color = color;
						if ( events.onRenameRepeatButton !== undefined )
							events.onRenameRepeatButton( title, color );

					}
					if ( buttons.buttonRepeat.title === lang.repeatOn ) {

						RenameRepeatButtons( lang.repeatOff, 'rgb(255,255,255)' );

					} else {

						RenameRepeatButtons( lang.repeatOn, colorGray );

					}

				}
				_repeat = repeat;
				buttons.buttonRepeat = addButton( lang.repeat, lang.repeatOn, repeat );

				//Go to next object 3D button
				function next( value ) {

					selectObject3D( selectObject3DIndex + 1 );

/*
					var objects3DItem = group.children[selectObject3DIndex];
					if ( objects3DItem !== undefined ) {

						if ( events.onRestoreObject3D !== undefined )
							events.onRestoreObject3D( objects3DItem );

					}
					selectObject3DIndex++;
					if ( selectObject3DIndex >= group.children.length )
						selectObject3DIndex = 0;
					objects3DItem = group.children[selectObject3DIndex];
					if ( events.onSelectedObject3D !== undefined )
						events.onSelectedObject3D( objects3DItem, selectObject3DIndex );
*/

				}
				_next = next;
				buttons.buttonNext = addButton( lang.nextSymbol, lang.nextSymbolTitle, next );

				//select Object 3D
				function selectObject3D( index ) {

					if ( selectObject3DIndex === -1 )
						selectObject3DIndex = group.children.length;
					var objects3DItem = group.children[selectObject3DIndex];
					if ( objects3DItem !== undefined ) {

						if ( events.onRestoreObject3D !== undefined )
							events.onRestoreObject3D( objects3DItem );

					}
					selectObject3DIndex = index;
					if ( selectObject3DIndex >= group.children.length )
						selectObject3DIndex = 0;
					if ( selectObject3DIndex < 0 )
						selectObject3DIndex = group.children.length - 1;
					objects3DItem = group.children[selectObject3DIndex];
					if ( events.onSelectedObject3D !== undefined )
						events.onSelectedObject3D( objects3DItem, selectObject3DIndex );

				}
				_selectObject3D = selectObject3D;

				function getGroup() {

					return group;

				}
				_getGroup = getGroup;

				return buttons;

			},

		}, 'playRate', 1, 25, 1 );
		this.onChange = function ( value ){

			//console.log( '_controller.onChange: ' + value );
			if ( group.userData.timerId === undefined )
				return;

			clearInterval( group.userData.timerId );
			group.userData.timerId = setInterval( _playNext, 1000 / value );

		}
		this.prev = function () {

			_prev();

		}
		this.play = function () {

			_play();

		}
		this.repeat = function () {

			_repeat();

		}
		this.next = function () {

			_next();

		}
		this.getGroup = function () {

			return _getGroup();

		}
		this.selectObject3D = function ( index ) {

			_selectObject3D( parseInt( index ) );

		}

	}
	set controller( newController ) {

//		super.controller = newController;
		this._controller = newController;
//		this._controller = newController;
		var _this = this;
		this._controller.onChange( function ( value ) {

			_this.onChange( value );

		} );
		this._controller.domElement.title = lang.controllerTitle;

	}
	get controller() {

		return this._controller;

	}

}
export function create( group, events ) {

	return new PlayController( group, events );

}
