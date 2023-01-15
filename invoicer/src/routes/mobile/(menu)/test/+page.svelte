<script>
	let touchstartX = 0,
		touchstartY = 0;
	let touchendX = 0,
		touchendY = 0;

	function checkDirection() {
		if (touchendX < touchstartX) {
			console.log('left ' + Math.abs(touchendX - touchstartX));
		}
		if (touchendX > touchstartX) {
			console.log('right ' + Math.abs(touchendX - touchstartX));
		}
		if (touchendY > touchstartY) {
			console.log('bottom ' + Math.abs(touchendY - touchstartY));
		}
		if (touchendY < touchstartY) {
			console.log('top ' + Math.abs(touchendY - touchstartY));
		}
	}

	document.addEventListener('touchstart', (e) => {
		touchstartX = e.changedTouches[0].screenX;
		touchstartY = e.changedTouches[0].screenY;
	});

	document.addEventListener('touchmove', (e) => {
		touchendX = e.changedTouches[0].screenX;
		touchendY = e.changedTouches[0].screenY;
		checkDirection();
	});
</script>

style="transition-duration: 0ms; transform: translate3d(-1700px, 0px, 0px);"
