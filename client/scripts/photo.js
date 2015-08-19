var TrackShape = {
  title: React.PropTypes.string.isRequired,
  images: React.PropTypes.object
};

var Track = React.createClass({
  propTypes: {
    track: React.PropTypes.shape(TrackShape).isRequired
  },

  render: function() {
    return (
      <div className="track">
        <img src={ this.props.track.images.downsized.url } className="img-thumbnail artwork" />
        <div className="title">{ this.props.track.title }</div>
      </div>
    );
  }
});
