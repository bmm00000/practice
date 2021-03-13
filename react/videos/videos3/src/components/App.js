import React from 'react';
import youtube from '../api/youtube';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';

class App extends React.Component {
	state = { videos: [], selectedVideo: null };

	componentDidMount = () => {
		this.onSearchSubmit('snakes');
	};

	onSearchSubmit = async (term) => {
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
				<SearchBar onSearchSubmit={this.onSearchSubmit} />
				<div className='ui grid'>
					<div className='ui row'>
						<div className='eleven wide column'>
							<VideoDetail selectedVideo={this.state.selectedVideo} />
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
