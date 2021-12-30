

		var xNumber = new Object();
		xNumber = {
			_chances : 5,
			_scope : 20,
			_minNum : 0,
			_maxNum : 0,
			_ansNum : 0,
			_limit : 3,
			_score : 0,
			_state : 0,
			_outputText : '',
			_defaultTextOut : 'X is a just a number',
			_render : {
				minNumber : '#minimumNumber',
				maxNumber : '#maximumNumber',
				scoreNumber : '#scoreNumber',
				chanceNumber : '#chances',
				gameText : '#statusBox',
				inputNumber : '#guessNumber'
			},
			_output : {
				less : {
					almost : "That's close but low",
					far : "That's too low",
					gif : "low.gif"
				},
				more : {
					almost : "That's close but high",
					far : "That's too high",
					gif : 'high.gif'
				},
				equal : {
					text : "<b class='w3-text-green'>Whoa, You Got It!</b>",
					gif : 'success.gif'
				},
				lose : {
					text : '<span class=\'w3-text-red\'>Out of Chances</span>',
					gif : 'failure.gif'
				}
			}
		};
		// Helpers
		// Setters
		xNumber.setChances = function (num) {
			this._chances = Number(num);
		}
		xNumber.setScope = function (num) {
			this._scope = Number(num);
		}
		xNumber.setSmallRandomNumber = function () {
			this._minNum = Math.floor((Math.random() * Number(this._scope) + 1 ) - 0);
		}
		xNumber.setLargeRandomNumber = function () {
			this._maxNum = Math.floor((Math.random() * Number(this._scope) + 1 ) + Number(this._scope));
		}
		xNumber.setAnswerRandomNumber = function () {
			this._ansNum = Math.floor(Math.random() * (this._maxNum - this._minNum) + this._minNum);
		}
		// Gettters
		xNumber.getChances = function  () {
			return this._chances;
		}
		xNumber.getScore = function () {
			return this._score;
		}
		xNumber.getScope = function () {
			return this._scope;
		}
		xNumber.getMinNum = function () {
			return this._minNum;
		}
		xNumber.getMaxNum = function () {
			return this._maxNum;
		}
		xNumber.getAnsNum = function () {
			return this._ansNum;
		}
		// Starting 
		xNumber.startGame = function () {
			// Set min & max number
			this.setSmallRandomNumber();
			this.setLargeRandomNumber();
			// The answer
			this.setAnswerRandomNumber();
			// Text 
			this._outputText = this._defaultTextOut;
			// GIF
			this._state = 0;
			// Render in game
			this.renderHTML();
		}
		// Reload game => Loop
		// Auto Mode
		xNumber.reloadGame = function () {
			// Restore Chances
			// If Player won the game // Still playing
			if (this._chances>=0) { // this line should be away
				// Make it harder & Also adjust close - LIMIT => Range in which right answer is lying
				// If score is < 500; adjust scope to 20 => 40max // Introduction 
				if (this._score < 500) {
					// scope
					this._scope = 20;
					// limt
					this._limit = 3;
					// chances
					this.setChances(5);
					// reduce score
					if (this.score >= 0 && this.score <= 100) {
						this.score -= 0;
					} else if (this.score > 100 && this.score < 250) {
						this.score -= 25;
					} else if (this.score > 250 && this.score < 500) {
						this.score -= 50;
					}
				} else
				// If score is > 500; adjust scope to 30 => 60max // Beginner
				if (this._score > 500) {
					// scope
					this._scope = 30;
					// limt
					this._limit = 5;
					// chances
					this.setChances(6);
					// reduce score
					this.score -= 75;
				} else
				// If score is > 1000; adjust scope to 40 => 80max // Regular
				if (this._score > 1000) {
					// scope
					this._scope = 40;
					// limt
					this._limit = 7;
					// chances
					this.setChances(8);
					// reduce score
					this.score -= 75;
				} else
				// If score is > 1250; adjust scope to 50 => 100max // Professional
				if (this._score > 1250) {
					// scope
					this._scope = 50;
					// limt
					this._limit = 9;
					// chances
					this.setChances(8);
					// reduce score
					this.score -= 75;
				} else
				// If score is > 1500; adjust scope to 60 => 120max // Top player
				if (this._score > 1000) {
					// scope
					this._scope = 60;
					// limt
					this._limit = 11;
					// chances
					this.setChances(8);
					// reduce score
					this.score -= 75;
				} else
				// If score is > 1750; adjust scope to 100 => 200max // Expert
				if (this._score > 1750) {
					// scope
					this._scope = 100;
					// limt
					this._limit = 13;
					// chances
					this.setChances(10);
					// reduce score
					this.score -= 100;
				}
			
			} 

			// Text 
			//this._outputText = '';
			// Clear input
			if (this._render.inputNumber && document.querySelector(this._render.inputNumber)) {
				document.querySelector(this._render.inputNumber).value = '';
			}

			// Start Again
			setTimeout(function () {
				// Run
				xNumber.startGame();
			}, 5000);
		}
		// Display in HTML
		xNumber.renderHTML = function () {
			// Min Number Display 
			if (this._render.minNumber && document.querySelector(this._render.minNumber)) {
				document.querySelector(this._render.minNumber).innerHTML = this._minNum;
			}
			// Max Number Display
			if (this._render.maxNumber && document.querySelector(this._render.maxNumber)) {
				document.querySelector(this._render.maxNumber).innerHTML = this._maxNum;
			}
			// Score Number Display 
			if (this._render.scoreNumber && document.querySelector(this._render.scoreNumber)) {
				document.querySelector(this._render.scoreNumber).innerHTML = this._score;
			}
			// Chances Display 
			if (this._render.chanceNumber && document.querySelector(this._render.chanceNumber)) {
				document.querySelector(this._render.chanceNumber).innerHTML = this._chances;
			}
			// Game Text Display 
			if (this._render.gameText && document.querySelector(this._render.gameText)) {
				document.querySelector(this._render.gameText).innerHTML = '<img class="w3-image w3-show-inline-block" src="img/'+this.reactNow()+'" style="width: 50px;height:50px"><div class="w3-show-inline-block">'+this._outputText+'</div>';
			}
		}
		// Check Guess - Game Logic
		xNumber.confirmGuess = function (_x_guess) {
			// Object Ref
			let $this = this;
			// Check the Player's answer
			_x_guess = Number(_x_guess);
			// Reduces Remaining chances
			$this._chances--;
			//check if Player has chances to continue playing
			if($this._chances > 0) { 
				// If the guess is less than the answer
				if (_x_guess < $this._ansNum) {
					// How close / Range in which right answer is
					if (($this._ansNum - _x_guess) <= $this._limit) {
						// Add 25 to score
						$this._score += 25;
						// Status text
						$this._outputText = $this._output.less.almost;
						// React with close
						$this._state = 1;
					} else {
						// Add 25 to score
						$this._score += 0;
						// Status text
						$this._outputText = $this._output.less.far;
						// React with close
						$this._state = 5;
					}
				// If the guess is equal to the answer
				} else if (_x_guess == $this._ansNum) {
					// Add 100 to score
					$this._score += 100;
					// Guessed right
					$this._outputText = $this._output.equal.text;
					// React with close
					$this._state = 2;
					// Then add 1 chance
					$this._chances += 1;
					// Load game again
					$this.reloadGame();
				} else if (_x_guess > $this._ansNum) {
					// How close / Range in which right answer is
					if ((_x_guess - $this._ansNum) <= $this._limit) {
						// Add 25 to score
						$this._score += 25;
						// Status text
						$this._outputText = $this._output.more.almost;
						// React with close
						$this._state = 3;
					} else {
						// Add 25 to score
						$this._score += 0;
						// Status text
						$this._outputText = $this._output.more.far;
						// React with close
						$this._state = 5;
					}
				} else {
					// Error
					$this._outputText =  '';
					// React with close
					$this._state = 5;
				}
			// If Chances are zero
			} else if ($this._chances <= 0) {
				// Restore
				$this._chances = 0;
				// Status text
				$this._outputText = $this._output.lose.text + ' : ' + $this._ansNum;
				// React with close
				$this._state = 4;
				// Load game again
				$this.reloadGame();
			} 

			// Render in HTML
			$this.renderHTML();
			
		}
		// Reaction GIF
		xNumber.reactNow = function () {
			switch (this._state) {
				// thinking state/ Playing
				case 0:
					return 'thinking.gif';
					break;
				// Alomst but Low
				case 1:
					return 'low.gif';
					break;
				// Got it!
				case 2:
					return 'success.gif';
					break;
				// Alomst but High
				case 3:
					return 'high.gif';
					break;
				// Wrong
				case 4:
					return 'failure.gif';
					break;
				// else playing
				default:
					return 'thinking.gif';
					break;
			}
		}
		
		window.addEventListener('load',function () {
			// Start
			xNumber.startGame();
			document.getElementById('gameBox').style.display = 'block';
			document.getElementById('introView').style.display = 'none';
		});


		var checkMyGuess = document.querySelector('#submitGuess');
		var guessNumber = document.querySelector('#guessNumber');
		if (checkMyGuess && guessNumber) {
			checkMyGuess.addEventListener('click',function () {
				xNumber.confirmGuess(guessNumber.value);
			});
			guessNumber.addEventListener('focus',function () {
				guessNumber.value = '';
			});
			window.addEventListener('load',function () {
				guessNumber.value = '';
			});
		}
