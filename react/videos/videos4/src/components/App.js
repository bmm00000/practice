import React from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';

class App extends React.Component {
	state = { videos: [], selectedVideo: null };

	componentDidMount() {
		this.onTermSearch('arabic horse');
	}

	onTermSearch = async (term) => {
		const results = await youtube.get('/search', {
			params: {
				q: term,
			},
		});
		this.setState({
			videos: results.data.items,
			selectedVideo: results.data.items[0],
		});
	};

	onVideoSelect = (video) => {
		this.setState({ selectedVideo: video });
	};

	render() {
		return (
			<div className='ui container'>
				<SearchBar onTermSearch={this.onTermSearch} />
				<div className='ui grid'>
					<div className='ui row'>
						<div className='eleven wide column'>
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className='five wide column'>
							<VideoList
								videos={this.state.videos}
								onVideoSelect={this.onVideoSelect}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
