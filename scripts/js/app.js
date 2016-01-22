	particlesJS('particles', {
		  particles: {
			color: '#fff',
			shape: 'circle', // "circle", "edge" or "triangle"
			opacity: 0.9,
			size: 4,
			size_random: true,
			nb: 100,
			line_linked: {
			  enable_auto: true,
			  distance: 100,
			  color: '#fff',
			  opacity: 1,
			  width: 1,
			  condensed_mode: {
				enable: false,
				rotateX: 600,
				rotateY: 600
			  }
			},
			anim: {
			  enable: true,
			  speed: 2
			}
		  },
		  interactivity: {
			enable: true,
			mouse: {
			  distance: 250
			},
			detect_on: 'canvas', // "canvas" or "window"
			mode: 'grab',
			line_linked: {
			  opacity: .6
			},
			events: {
			  onclick: {
				enable: true,
				mode: 'push', // "push" or "remove" (particles)
				nb: 4
			  }
			}
		  },
		  /* Retina Display Support */
		  retina_detect: true
		});