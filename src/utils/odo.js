import 'howler';

export default class ODO {
  constructor (options = {}) {
    this.host = options.host;
    this.playlist = options.playlist || [];
    this.current  = options.current || 0;
    this.onEnd    = options.onEnd;
    this.onPause  = options.onPause;
    this.onPlay   = options.onPlay;
    this.onStop   = options.onStop;
  }

  _onEnd (instanceId) {
    console.log('_onEnd (instanceId) {')
    if(typeof this.onEnd === 'function') {
      this.onEnd(instanceId);
    }
  }

  _onPause (instanceId) {
    console.log('_onPause (instanceId) {')
    if(typeof this.onPause === 'function') {
      this.onPause(instanceId);
    }
  }

  _onPlay (instanceId) {
    console.log('_onPlay (instanceId) {')
    if(typeof this.onPlay === 'function') {
      this.onPlay(instanceId);
    }
  }

  _onStop (instanceId) {
    console.log('_onStop (instanceId) {')
    if(typeof this.onStop === 'function') {
      this.onStop(instanceId);
    }
  }

  _playWithNewAudioInstance () {
    console.log('_playWithNewAudioInstance () {')
    if(this.audio) {
      delete this.audio;
    }

    this.audio = new Howl({
      src: `${this.host || ''}${this.playlist[this.current].path}`,
      onend:   this._onEnd.bind(this),
      onpause: this._onPause.bind(this),
      onplay:  this._onPlay.bind(this),
      onstop:  this._onStop.bind(this),
    });

    this.instanceId = this.audio.play();
  }

  setPlaylist (playlist) {
    console.log('setPlaylist (playlist) {')
    this.playlist = playlist;
    this.instanceId = undefined;
    if(this.audio) {
      delete this.audio;
    }

    return this;
  }

  play (index) {
    console.log('play (index) {')
    if(index !== undefined && index !== this.current) {
      this.current = index;
      this._playWithNewAudioInstance();
      return this;
    }

    if(this.instanceId) {
      this.audio.play(this.instanceId);
      return this;
    }

    this._playWithNewAudioInstance();
    return this;
  }

  pause () {
    console.log('pause () {')
    this.audio.pause();
    return this;
  }

  stop () {
    console.log('stop () {')
    this.audio.stop();
    return this;
  }

  next () {
    console.log('next () {')

  }

  prev () {
    console.log('prev () {')

  }

  plyaing () {
    console.log('plyaing () {')
    return this.audio.playing();
  }
}
