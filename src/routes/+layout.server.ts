import { XMLParser } from 'fast-xml-parser'

export const prerender = true

async function fetch_channel_yt_videos(channel_id: string) {
	const response = await fetch(
		'https://www.youtube.com/feeds/videos.xml?channel_id='+channel_id,
	)
	const text = await response.text()
	const parser = new XMLParser()
	const xml: {
		feed: {
			entry: {
				title: string
				'yt:videoId': string
			}[]
		}
	} = parser.parse(text)
	return xml.feed.entry.map((entry) => ({
		title: entry.title,
		id: entry['yt:videoId'],
	}))
}

// old code for Lacuna SoundCloud tracks - SoundCloud API token is not valid
// SC.initialize({
// 	client_id: "6ibYZTmF5qnpvp88S9V3werVrC18WCdC" //change
// });
// SC.get("/users/247370320/tracks", {limit: 8}).then(function(tracks) {
// 	for (var i = 0; i < tracks.length; i++) {
// 		nthChild = i+1;
// 		// coverSrc = JSON.stringify(tracks[i].artwork_url.replace("large", "t300x300"));
// 		$("section.lacuna .item:nth-child("+nthChild+") div.img")
// 			.attr("style", 'background-image: url("'+tracks[i].artwork_url.replace("large", "t300x300")+'")')
// 			.parent().attr("href", tracks[i].permalink_url);
// 	}
// });

export async function load() {
	return {
		synctan_videos: fetch_channel_yt_videos('UCoMimPRPeR28TM3_0cinjVQ'),
		trap_united_videos: fetch_channel_yt_videos('UC0kHs8aHGQEtQODjt9XHjfQ'),
		personal_videos: fetch_channel_yt_videos('UCy6jcAF6fZGttRvihyQixbA'),
	}
}
