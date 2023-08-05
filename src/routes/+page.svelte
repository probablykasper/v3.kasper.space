<script lang="ts">
	import { PUBLIC_EMAIL } from '$env/static/public'
	import { onMount } from 'svelte'
	import jq$ from 'jquery'
	import './global.sass'

	export let data

	// Responsive YT thumbnails/SC covers
	function resizeStuff() {
		const width = jq$('section.adjust-height .item').width()
		if (width) {
			const newHeight = (width / 16) * 9
			console.log(width)
			jq$('section.adjust-height .item').css('height', newHeight + 'px')
		}

		const newHeight2 = jq$('section:not(.adjust-height) .item').width()
		if (newHeight2) {
			jq$('section:not(.adjust-height) .item').css('height', newHeight2 + 'px')
		}
	}

	onMount(() => {
		resizeStuff()

		// Image hover z-index fix
		var high = 3
		jq$('.item').hover(function () {
			jq$(this).css({ 'z-index': high })
			high++
		})

		// Chevron scroller
		var spacerHeight
		jq$('.chevron').on('click', function () {
			spacerHeight = jq$('.spacer').height()
			console.log(spacerHeight)
			window.scroll({ top: spacerHeight, left: 0, behavior: 'smooth' })
		})

		// Discord link popup
		jq$('body').on('click', function (e) {
			// Stop if input field was clicked
			if (!jq$(e.target).hasClass('popup-input')) {
				// If icon was clicked
				if (jq$(e.target).hasClass('discord')) {
					// Select text if hidden
					if (jq$(e.target).children('.popup').hasClass('hidden')) {
						jq$(e.target).children('.popup').children('input').select()
					}
					// Toggle visibility
					jq$(e.target).children('.popup').toggleClass('hidden')
				}
				// If hidden and icon was not clicked
				if (!jq$('.discord .popup').hasClass('hidden') && !jq$(e.target).hasClass('discord')) {
					// Hide
					jq$('.discord .popup').addClass('hidden')
				}
			}
		})
		// Email link popup
		jq$('body').on('click', function (e) {
			// Stop if input field was clicked
			if (!jq$(e.target).hasClass('popup-input')) {
				// If icon was clicked
				if (jq$(e.target).hasClass('email')) {
					// Select text if hidden
					if (jq$(e.target).children('.popup').hasClass('hidden')) {
						jq$(e.target).children('.popup').children('input').select()
					}
					// Toggle visibility
					jq$(e.target).children('.popup').toggleClass('hidden')
				}
				// If hidden and icon was not clicked
				if (!jq$('.email .popup').hasClass('hidden') && !jq$(e.target).hasClass('email')) {
					// Hide
					jq$('.email .popup').addClass('hidden')
				}
			}
		})
	})
</script>

<svelte:window on:resize={resizeStuff} />

<div class="top">
	<header class="page">
		<img src="/logos/kh-transparent.png" />
		<p class="one">Hi.</p>
	</header>
	<p class="two">I make things.</p>
	<section class="projects flex-row">
		<div class="chevron"></div>
		<p class="three">Let me show you.</p>
	</section>
</div>
<div class="bottom">
	<div class="spacer">
		<div class="personal-links flex-row">
			<a target="_blank" class="twitter" title="Twitter" href="https://twitter.com/SpectralKH"></a>
			<a class="discord" title="Discord">
				<div class="popup hidden">
					<input readonly class="popup-input" value="KH | Shrive &amp; Lacuna#6425" />
				</div>
			</a>
			<a
				target="_blank"
				class="facebook"
				title="Facebook"
				href="https://www.facebook.com/SpectralKH"
			></a>
			<a target="_blank" class="youtube" title="YouTube" href="https://youtube.com/SpectralKH"></a>
			<a
				target="_blank"
				class="soundcloud"
				title="SoundCloud"
				href="https://soundcloud.com/SpectralKH"
			></a>
			<a target="_blank" class="github" title="GitHub" href="https://github.com/SpectralKH"></a>
			<a target="_blank" class="instagram" title="Instagram" href="https://www.instagram.com/spckh/"
			></a>
			<a class="email" title="Email">
				<div class="popup hidden">
					<input readonly class="popup-input" value={PUBLIC_EMAIL} />
				</div>
			</a>
		</div>
	</div>

	<section class="shrive adjust-height">
		<header class="flex-row">
			<a target="_blank" href="https://www.youtube.com/Shrive">
				<img src="/logos/project/shrive.png" />
			</a>
			<div class="text r">
				<p class="title">
					<a target="_blank" href="https://www.youtube.com/Shrive">Shrive</a>
				</p>
				<p class="description">
					A YouTube channel where I curate all kinds of music, every Monday, Wednesday and Friday.
				</p>
			</div>
		</header>
		<main class="adjust-height flex-row">
			{#each data.shrive_videos.slice(0, 8) as video}
				<a target="_blank" class="item" href="https://www.youtube.com/watch?v={video.id}">
					<div class="overlay"></div>
					<p class="title">{video.title}</p>
					<div
						class="img"
						style:background-image="url(https://i.ytimg.com/vi/{video.id}/hqdefault.jpg)"
					></div>
				</a>
			{/each}
		</main>
	</section>

	<section class="lacuna">
		<header class="flex-row">
			<div class="text l">
				<p class="title">
					<a target="_blank" href="https://soundcloud.com/LacunaRecords">Lacuna Records</a>
				</p>
				<p class="description">
					I am a co-owner of this independent indie record label, with a nice community behind it.
				</p>
			</div>
			<a target="_blank" href="https://soundcloud.com/LacunaRecords">
				<img src="/logos/project/lacuna.png" />
			</a>
		</header>
		<main class="flex-row">
			{#each Array(8) as _}
				<a target="_blank" class="item">
					<div class="overlay"></div>
					<p class="title"></p>
					<div class="img"></div>
				</a>
			{/each}
		</main>
	</section>

	<section class="trap-united adjust-height">
		<header class="flex-row">
			<a target="_blank" href="https://www.youtube.com/TrapUnited">
				<img src="/logos/project/trap-united.png" />
			</a>
			<div class="text r">
				<p class="title">
					<a target="_blank" href="https://www.youtube.com/TrapUnited">Trap United</a>
				</p>
				<p class="description">
					Another music curation channel, this one with daily trap music uploads, and part of to the
					"United" channel network.
				</p>
			</div>
		</header>
		<main class="adjust-height flex-row">
			{#each data.trap_united_videos.slice(0, 8) as video}
				<a target="_blank" class="item" href="https://www.youtube.com/watch?v={video.id}">
					<div class="overlay"></div>
					<p class="title">{video.title}</p>
					<div
						class="img"
						style:background-image="url(https://i.ytimg.com/vi/{video.id}/hqdefault.jpg)"
					></div>
				</a>
			{/each}
		</main>
	</section>

	<section class="dev">
		<header class="flex-row">
			<div class="text l">
				<p class="title">
					<a target="_blank" href="https://github.com/SpectralKH">Dev</a>
				</p>
				<p class="description">HTML5, Sass, JS, jQuery, PHP, MySQL. It's a start.</p>
			</div>
			<a target="_blank" href="https://github.com/SpectralKH">
				<img src="/logos/project/github.png" />
			</a>
		</header>
		<main class="adjust-height flex-row">
			<div class="item">
				<div class="overlay"></div>
				<p class="title">Nelation</p>
				<p class="description">Website for the record label Nelation.</p>
				<div class="links">
					<a class="link" href=""></a>
					<a class="github-link" href=""></a>
				</div>
				<div class="img"></div>
			</div>
			<div class="item">
				<div class="overlay"></div>
				<p class="title">Personal Website</p>
				<p class="description">I think it's self explanatory</p>
				<div class="links">
					<a class="link" href="http://kh.henningsen.se/"></a>
					<a class="github-link" href=""></a>
				</div>
				<div class="img"></div>
			</div>
		</main>
	</section>

	<section class="video adjust-height">
		<header class="flex-row">
			<a target="_blank" href="https://www.youtube.com/user/SpectralKH">
				<img src="/logos/project/youtube.png" />
			</a>
			<div class="text r">
				<p class="title">
					<a target="_blank" href="https://www.youtube.com/user/SpectralKH">Video</a>
				</p>
				<p class="description">
					I'm experienced with After Effects and Final Cut. My personal YouTube channel has audio
					visualizers, animations, sketches etc.
				</p>
			</div>
		</header>
		<main class="adjust-height flex-row">
			{#each data.personal_videos.slice(0, 8) as video}
				<a target="_blank" class="item" href="https://www.youtube.com/watch?v={video.id}">
					<div class="overlay"></div>
					<p class="title">{video.title}</p>
					<div
						class="img"
						style:background-image="url(https://i.ytimg.com/vi/{video.id}/hqdefault.jpg)"
					></div>
				</a>
			{/each}
		</main>
	</section>

	<!-- <section class="minecraft">
    <header class="flex-row">
      <div class="text l">
        <p class="title">
          <a target="_blank"
            href="http://www.planetminecraft.com/member/SpectralKH/">Minecraft</a>
        </p>
        <p class="description">Minecraft was a big part of my life previously. I
          gathered lots of friends, and had fun with different projects.</p>
      </div>
      <a target="_blank" href="http://www.planetminecraft.com/member/SpectralKH/">
        <img src="/logos/project/minecraft.png">
      </a>
    </header>
    <main>
      Maybe I'll care to add something here eventually.<br>
      http://www.planetminecraft.com/member/spectralkh/<br>
      http://www.planetminecraft.com/mod/spectralguns/<br>
      http://www.planetminecraft.com/member/nectoxbt/<br>
    </main>
  </section> -->
</div>
