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
//Please download https://github.com/anhr/dat.gui/tree/CustomController to '../../../../My documents/MyProjects/webgl/three.js/GitHub/dat.gui' folder
import { GUI, controllers } from '../../../../My documents/MyProjects/webgl/three.js/GitHub/dat.gui';

//Localization

var lang = {

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
export class PlayController extends controllers.CustomController {

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
	 *
	 * @param {THREEGroup} group group of 3D objects for playing.
	 * @param {Object} [events] controller events. Default no events is sent to your web page.
	 * @param {onEvent} [events.onShowObject3D] The show 3D object event.
	 * @param {onEvent} [events.onHideObject3D] The hide 3D object event.
	 * @param {onEvent} [events.onRestoreObject3D] Event of restore of 3D object to original state.
	 * @param {onEvent} [events.onSelectedObject3D] Event of selecting of 3D object.
	 */
	constructor( group, events ) {

		events = events || {};
		var _playNext;
		super( {

			playRate: 1,//Default play rate is 1 changes per second
			property: function ( customController ) {

				var buttons = {};
				function RenamePlayButtons( innerHTML, title ) {

					buttons.buttonPlay.innerHTML = innerHTML;
					buttons.buttonPlay.title = title;

				}

				var selectObject3DIndex = -1;

				function play() {

					//red color of selected object3D and hide others
					if ( ( selectObject3DIndex === -1 ) || ( selectObject3DIndex === group.children.length ) ) {

						selectObject3DIndex = 0;

					}
					for ( var i = 0; i < group.children.length; i++ ) {

						var objects3DItem = group.children[i];
						if ( selectObject3DIndex === i ) {

							if ( events.onShowObject3D !== undefined )
								events.onShowObject3D( objects3DItem );

						} else {

							if ( events.onHideObject3D !== undefined )
								events.onHideObject3D( objects3DItem );
	
						}

					}
					RenamePlayButtons( lang.pause, lang.pauseTitle );

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
				buttons.buttonPrev = addButton( lang.prevSymbol, lang.prevSymbolTitle, function ( value ) {

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
						events.onSelectedObject3D( objects3DItem );

				} );

				//Play/Pause button
				buttons.buttonPlay = addButton( lang.playSymbol, lang.playTitle, function ( value ) {

					if ( buttons.buttonPlay.innerHTML === lang.playSymbol ) {

						group.userData.timerId = -1;
						play( group, events );
						group.userData.timerId = setInterval( playNext, 1000 / customController.controller.getValue() );

					} else pause();

				} );

				//Repeat button
				var colorGray = 'rgb(200,200,200)';
				buttons.buttonRepeat = addButton( lang.repeat, lang.repeatOn, function ( value ) {

					function RenameRepeatButtons( title, color ) {

						buttons.buttonRepeat.title = title;
						buttons.buttonRepeat.style.color = color;

					}
					if ( buttons.buttonRepeat.title === lang.repeatOn ) {

						RenameRepeatButtons( lang.repeatOff, 'rgb(255,255,255)' );

					} else {

						RenameRepeatButtons( lang.repeatOn, colorGray );

					}

				} );

				//Go to next object 3D button
				buttons.buttonNext = addButton( lang.nextSymbol, lang.nextSymbolTitle, function ( value ) {

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
						events.onSelectedObject3D( objects3DItem );

				} );

				return buttons;

			}/*init*/,

		}, 'playRate', 1, 25, 1 );
		this.onChange = function ( value ){

			//console.log( '_controller.onChange: ' + value );
			if ( group.userData.timerId === undefined )
				return;

			clearInterval( group.userData.timerId );
			group.userData.timerId = setInterval( _playNext, 1000 / value );

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
