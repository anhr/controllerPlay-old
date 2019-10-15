/**
 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D objects in my projects.
 * 
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//import { GUI, controllers } from 'D:/My documents/MyProjects/webgl/three.js/GitHub/dat.gui';
//Please download https://github.com/anhr/dat.gui/tree/CustomController to '../../dat.gui' folder
//import { GUI, controllers } from '../../dat.gui';
import { GUI, controllers } from '../../dat.gui/master/build/dat.gui.module.js';

import { getLanguageCode } from '../../commonNodeJS/master/lang.js';

//Localization

export var lang = {

	prevSymbol: '←',
	prevSymbolTitle: 'Go to previous animation scene',
	nextSymbol: '→',
	nextSymbolTitle: 'Go to next animation scene',
	playSymbol: '►',
	playTitle: 'Play',
	pause: '❚❚',
	pauseTitle: 'Pause',
	repeat: '⥀',
	repeatOn: 'Turn repeat on',
	repeatOff: 'Turn repeat off',
	controllerTitle: 'Rate of changing of animation scenes per second.',
	fullScreen: 'Full Screen',
	nonFullScreen: 'Non Full Screen',
	stereoEffects: 'Stereo effects',
	mono: 'Mono',
	sideBySide: 'Side by side',
	topAndBottom: 'Top and bottom',

};

//switch ( ( ( typeof THREE === 'undefined' ) || ( typeof THREE.getLanguageCode === 'undefined' ) ) ? 'en' : THREE.getLanguageCode() )
switch ( getLanguageCode() ) {

	case 'ru'://Russian language
		lang.prevSymbolTitle = 'Кадр назад';//'Go to previous animation scene',
		lang.playTitle = 'Проиграть';//'Play'
		lang.nextSymbolTitle = 'Кадр вперед';//'Go to next animation scene';
		lang.pauseTitle = 'Пауза';//'Pause',
		lang.repeatOn = 'Повторять проигрывание';
		lang.repeatOff = 'Остановить повтор проигрывания';
		lang.controllerTitle = 'Скорость смены кадров в секунду.';
		lang.fullScreen = 'На весь экран';
		lang.nonFullScreen = 'Восстановить размеры экрана';
		lang.stereoEffects = 'Стерео эффекты';
		lang.mono = 'Моно';
		lang.sideBySide = 'Слева направо';
		lang.topAndBottom = 'Сверху вниз';

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
 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D objects in my projects.
 * 
 * @class PlayController
 *
 * @extends dat.controllers.CustomController
 *
 */
export class PlayController extends controllers.CustomController {

	/**
	 * PlayController class for using in my version of dat.gui(https://github.com/anhr/dat.gui) for animate of 3D objects in my projects.
	 * @param {object} player 3D objects animation. See nodejs\myThreejs\player.js
	 */
	constructor( player ) {

//		scenesCount = scenesCount || 2;
//		events = events || {};
		var _getGroup, _selectScene, _renamePlayButtons, _renameRepeatButtons, _repeat;//,_playNext, timerId, _prev, _play, _next;
		var colorOff = 'rgb(255,255,255)', colorOn = 'rgb(128,128,128)';//'rgb(200,200,200)';
		super( {

			playRate: 1,//Default play rate is 1 changes per second
			property: function ( customController ) {

				var buttons = {};
				function RenamePlayButtons( innerHTML, title ) {

					buttons.buttonPlay.innerHTML = innerHTML;
					buttons.buttonPlay.title = title;
/*
					if ( events.onRenamePlayButton !== undefined )
						events.onRenamePlayButton( innerHTML, title, play );
*/

				}
				_renamePlayButtons = RenamePlayButtons;

/*
				var selectSceneIndex = 0;//-1;
				function play() {

					//show of selected object3D and hide others
					//if ( ( selectSceneIndex === -1 ) || ( selectSceneIndex === group.children.length ) )
					if ( ( selectSceneIndex === -1 ) || ( selectSceneIndex === scenesCount ) ){

						selectSceneIndex = 0;

					}
					onSelectScene( selectSceneIndex );

				}
*/
/*
				function pause() {

					RenamePlayButtons( lang.playSymbol, lang.playTitle );

					clearInterval( timerId );
					timerId = undefined;

				}
				function isRepeat() {

					return buttons.buttonRepeat.title !== lang.repeatOn;

				}
				_isRepeat = isRepeat;
*/
/*
				function playNext() {

					selectSceneIndex++;
					if ( selectSceneIndex >= scenesCount ) {

						if ( isRepeat() )
							selectSceneIndex = 0;
						else {

							pause();
							return;

						}

					}
					play();

				}
				_playNext = playNext;
*/
/*
				//Go to previous object 3D button
				function prev() {

					selectScene( selectSceneIndex - 1 );

				}
				_prev = prev;
*/
				buttons.buttonPrev = addButton( lang.prevSymbol, lang.prevSymbolTitle, player.prev );
/*
				//Play/Pause button
				function play3DObject( value ) {

					if ( buttons.buttonPlay.innerHTML === lang.playSymbol ) {

						timerId = -1;
//						play( group, events );
//						play();
						if ( selectSceneIndex >= scenesCount )
							selectSceneIndex = -1;
						playNext();
						RenamePlayButtons( lang.pause, lang.pauseTitle, true );
						timerId = setInterval( playNext,
							1000 / ( typeof customController.controller === 'undefined' ? 1 : customController.controller.getValue() ) );

					} else pause();

				}
				_play = play3DObject;
*/
				buttons.buttonPlay = addButton( lang.playSymbol, lang.playTitle, player.play3DObject );

				//Repeat button

				function RenameRepeatButtons( isRepeat ) {

					var title, color;
					if ( isRepeat ) {

						title = lang.repeatOff;
						color = colorOff;

					} else {

						title = lang.repeatOn;
						color = colorOn;

					}

					if ( buttons.buttonRepeat.title === title )
						return;//stop of infinite recursive call

					buttons.buttonRepeat.title = title;
					buttons.buttonRepeat.style.color = color;

					player.onChangeRepeat( isRepeat );

				}
				_renameRepeatButtons = RenameRepeatButtons;
				function repeat( value ) {

					RenameRepeatButtons( buttons.buttonRepeat.title === lang.repeatOn );
/*
					if ( buttons.buttonRepeat.title === lang.repeatOn ) {

						isRepeat = true;
						RenameRepeatButtons( lang.repeatOff, colorOff );

					} else {

						isRepeat = false;
						RenameRepeatButtons( lang.repeatOn, colorOn );

					}
*/

				}
				_repeat = repeat;
				var title, color;
				if ( player.getOptions().repeat ) {

					title = lang.repeatOff;
					color = colorOff;

				} else {

					title = lang.repeatOn;
					color = colorOn;

				}
				buttons.buttonRepeat = addButton( lang.repeat, title, repeat );
				buttons.buttonRepeat.style.color = color;
/*
				//Go to next object 3D button
				function next( value ) {

					player.selectScene( selectSceneIndex + 1 );
//					selectScene( selectSceneIndex + 1 );

				}
				_next = next;
*/
				buttons.buttonNext = addButton( lang.nextSymbol, lang.nextSymbolTitle, player.next );
/*
				//select scene for playing
				function selectScene( index ) {

					if ( index >= scenesCount )
						index = 0;
					else if ( index < 0 )
						index = scenesCount - 1;
					selectSceneIndex = index;
					onSelectScene( index );

				}
				_selectScene = selectScene;
*/
				function getGroup() {

					return group;

				}
				_getGroup = getGroup;

				return buttons;

			},

		}, 'playRate', 1, 25, 1 );
/*
		player.getOptions().controllers.push( function ( playing ) {

			_renamePlayButtons( lang.pause, lang.pauseTitle, true );

		});
*/
//		this.isRepeat = function () { return _isRepeat(); }
		this.onRenamePlayButtons = function ( playing ) {

			var name, title;
			if ( playing ) {

				name = lang.pause;
				title = lang.pauseTitle;

			} else {

				name = lang.playSymbol;
				title = lang.playTitle;

			}
			_renamePlayButtons( name, title, true );

		}
		this.onChangeRepeat = function () {

			_renameRepeatButtons( player.getOptions().repeat );

		}
//		player.controllers.push( this );
		player.pushController( this );
		this.onChange = function ( value ){

			player.onChangeTimerId( value );

		}
		this.getGroup = function () {

			return _getGroup();

		}
		this.selectScene = function ( index ) {

			_selectScene( parseInt( index ) );

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
export function create( player ) {

	return new PlayController( player );

}
/*
export function create( scenesCount, onSelectScene, events ) {

	return new PlayController( scenesCount, onSelectScene, events );

}
*/
