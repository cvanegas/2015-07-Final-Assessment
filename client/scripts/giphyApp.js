// TODO: Handle async stream loading vs play/pause/stop state
// TODO: Implement the state pattern
var GiphyApp = React.createClass({
  propTypes: {
  },

  getInitialState: function() {
    // TODO: Inject dependencies, don't rely on globals
    
    return {
      queriedPhotos: [],
      savedPhotos: []
    };
  },

  addToPlaylist: function(track) {
    var trackIndex = this.findTrackInPlaylist(track);

    if( trackIndex === -1 ) {
      this.state.savedPhotos.push(track);
      this.forceUpdate();
    }
  },

  removeFromPlaylist: function(track) {
    var trackIndex = this.findTrackInPlaylist(track);

    if( trackIndex !== - 1 ) {
      this.state.savedPhotos.splice(trackIndex, 1);
      this.forceUpdate();
    }
  },

  findTrackInPlaylist: function(track) {
    return _.findIndex(
      this.state.savedPhotos,
      function(t) {
        return track.id === t.id;
      }
    );
  },

  handleSearchResults: function(results) {
    console.log("handleSearchResults: ", results);
    this.setState({
      queriedPhotos: results
    });
  },

  render: function() {
    
    return (
      <section className="has-footer">
        <header>
          <div className="container text-center">
            <h1>Giphy</h1>
          </div>
        </header>

        <article>
          <div className="container text-center">
            <AudioVisualizer />

            <SearchSoundCloud onSearchResults={ this.handleSearchResults } />

            <TrackSelector tracks={ this.state.queriedPhotos } onTrackSelected={ this.addToPlaylist } />
          </div>
        </article>

        <footer className="fixed-footer">
          <Playlist tracks={ this.state.savedPhotos } />
        </footer>
      </section>
    );
  }
});
