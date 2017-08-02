import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar';
const API_KEY = "AIzaSyBPnMMXx5X6Bd8OtpOQgsc3u0m_ffZRgUA";


//Create a new component, produce some HTMl
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
     this.setState({ 
       videos: videos,
       selectedVideo: videos[0]
     });
    });
  }


  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
           videos={this.state.videos} />
      </div>
    );
  }
}


  //Take this components's HTML and put it on the page
  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  );
