var SearchSoundCloud = React.createClass({
  propTypes: {
    onSearchResults: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      query: ''
    };
  },

  performQuery: _.debounce(
    function() {
      // SC.get('/photos', { q: this.state.query }, this.updateResults);

      $.ajax({
        url: "http://api.giphy.com/v1/gifs/search",
        type: "get", //send it through get method
        data:{
          api_key: GIPHY_KEY,
          q: this.state.query,
          limit: 12
        },
        success: this.updateResults,
        error: function(err) {
          console.log("error: ", err);
        }
      });
    },
    300
  ),

  updateResults: function(results) {
    console.log("Results: ", results);
    this.setState({
      currentResults: results.data
    });

    if( this.props.onSearchResults ) {
      this.props.onSearchResults(results.data);
    }
  },

  updateQuery: function(event) {
    this.setState({
      query: event.target.value
    });

    this.performQuery();
  },

  clearSearch: function() {
    this.setState({
      query: ''
    });

    this.updateResults([]);
  },

  render: function() {
    var clearIconClasses = 'glyphicon glyphicon-remove form-control-feedback clickable';
    if( this.state.query === '' ) {
      clearIconClasses += ' hidden';
    }

    return (
      <div className="row">
          <div className="form-group has-feedback">
            <input name="query"
                   type="text"
                   placeholder="Find Photos"
                   value={ this.state.query }
                   onChange={ this.updateQuery }
                   className="form-control"
                   autoComplete="false" />
            <span onClick={ this.clearSearch } className={ clearIconClasses }></span>
          </div>
      </div>
    );
  }
});
