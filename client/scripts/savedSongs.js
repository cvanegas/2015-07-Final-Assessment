var Playlist = React.createClass({
  propTypes: {
    tracks: React.PropTypes.array.isRequired,
    currentTrack: React.PropTypes.any,
    onTrackSelected: React.PropTypes.func
  },

  playTrack: function(track) {
    if( this.props.onTrackSelected ) {
      this.props.onTrackSelected(track);
    }
  },

  render: function() {
    var photoComponents = [];
    var i = 0;
    var len = this.props.tracks.length;
    var trackClasses;

    for( ; i < len; i++ ) {
      trackClasses = ['clickable'];

      if( this.props.currentTrack && this.props.currentTrack.id === this.props.tracks[i].id ) {
        trackClasses.push('selected');
      }

      photoComponents.push(
        <div className={ trackClasses.join(' ') } key={ this.props.tracks[i].id }>
          <Track track={ this.props.tracks[i] } />
        </div>
      )
    }

    return (
      <div className="savedPhotos">
        { photoComponents }
      </div>
    );
  }
});
