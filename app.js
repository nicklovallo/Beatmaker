class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playButton = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.tempoSlider = document.querySelector('.tempo-slider');
    this.TimeSigButton = document.querySelector('.time-signature-button');
    this.timeSigOptionOne = document.querySelector('.time-sig-option-1');
    this.timeSigOptionTwo = document.querySelector('.time-sig-option-2');
  }
  activePad() {
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.classList.add('bar-animation');
      if (bar.classList.contains('active')) {
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    if (this.timeSigOptionOne.classList.contains('bold')) {
        const interval = (60 / this.bpm) * 1000;
      if (!this.isPlaying) {
        this.isPlaying = setInterval(() => {
          this.repeat();
        }, interval);
      } else {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
      }
    } else {
      const interval = (30 / this.bpm) * 1000;
      if (!this.isPlaying) {
        this.isPlaying = setInterval(() => {
          this.repeat();
        }, interval);
      } else {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
      }
    }
  }
  updatePlayButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = 'Pause';
      this.playButton.classList.add('active');
    } else {
      this.playButton.innerText = 'Play';
      this.playButton.classList.remove('active');
    }
  }
  changeTempo(event) {
    const tempoText = document.querySelector('.tempo-number');
    this.bpm = event.target.value;
    tempoText.innerText = event.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playButton = document.querySelector('.play');
    if (playButton.classList.contains('active')) {
      this.start();
    }
  }
  changeTimeSig() {
    if (this.timeSigOptionOne.classList.contains('bold')) {
      this.timeSigOptionOne.classList.remove('bold');
      this.timeSigOptionTwo.classList.add('bold');
    } else {
      this.timeSigOptionTwo.classList.remove('bold');
      this.timeSigOptionOne.classList.add('bold');
    }
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playButton = document.querySelector('.play');
    if (playButton.classList.contains('active')) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(function(pad) {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function() {
    this.classList.remove('bar-animation');
  });
});

drumKit.playButton.addEventListener('click', function() {
  drumKit.updatePlayButton();
  drumKit.start();
});

drumKit.tempoSlider.addEventListener('input', function(event) {
  drumKit.changeTempo(event);
});

drumKit.tempoSlider.addEventListener('change', function(event) {
  drumKit.updateTempo(event);
});

drumKit.TimeSigButton.addEventListener('click', function() {
  drumKit.changeTimeSig();
});