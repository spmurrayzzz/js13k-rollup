var guid = 0;
var cache = {};
var emptyArr = [];

function Emitter() {
  Object.defineProperty( this, '_emitterId', { value: ++guid } );
  cache[ this._emitterId ] = {};
}

Emitter.prototype.on = function( ev, fn ) {
  var events = cache[ this._emitterId ];
  ( events[ ev ] || ( events[ ev ] = [] ) ).push( fn );
  return this;
};

Emitter.prototype.off = function( ev, fn ) {
  var events;
  var target;

  if ( arguments.length === 0 ) {
    cache[ this._emitterId ] = {};
    return this;
  }

  if ( arguments.length === 1 ) {
    cache[ this._emitterId ][ ev ] = [];
    return this;
  }

  if ( typeof fn === 'function' ) {
    events = cache[ this._emitterId ][ ev ]
    target = events.indexOf( fn );
    events.splice( target, 1 );
    return this;
  }
};

Emitter.prototype.emit = function( ev ) {
  var args = [];
  var events = cache[ this._emitterId ];
  var len = arguments.length;
  var i;

  if ( len > 1 ) {
    for ( i = 1; i < len; i++ ) {
      args.push( arguments[ i ] );
    }
  }

  ( events[ ev ] || emptyArr ).forEach(function( fn ) {
    fn.apply( null, args );
  });

  return this;
};

Emitter.prototype.once = function( ev, fn ) {
  var self = this;
  var wrapped = function() {
    fn.apply( null, arguments );
    self.off( ev, wrapped );
  }
  return this.on( ev, wrapped );
};

export default Emitter;
