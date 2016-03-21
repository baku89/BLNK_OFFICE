'use strict';

/* global __dirname, process */

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();
// require('electron-debug')()

var host = 'http://localhost:9999';
var indexFile = host + '/server/index.html';

var mainWindow = void 0;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	var window = new BrowserWindow({
		width: 600,
		height: 400
	});

	// window.toggleDevTools()

	window.loadUrl(indexFile);
	window.on('closed', onClosed);

	return window;
}

app.on('windowdow-all-closed', function () {
	app.quit();
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFNLE1BQU0sUUFBUSxLQUFSLENBQU47QUFDTixJQUFNLGdCQUFnQixRQUFRLGdCQUFSLENBQWhCOztBQUVOLFFBQVEsZ0JBQVIsRUFBMEIsS0FBMUI7OztBQUdBLElBQUksT0FBTyx1QkFBUDtBQUNKLElBQUksWUFBZSwyQkFBZjs7QUFFSixJQUFJLG1CQUFKOztBQUVBLFNBQVMsUUFBVCxHQUFvQjtBQUNuQixjQUFhLElBQWIsQ0FEbUI7Q0FBcEI7O0FBSUEsU0FBUyxnQkFBVCxHQUE0QjtBQUMzQixLQUFNLFNBQVMsSUFBSSxhQUFKLENBQWtCO0FBQ2hDLFNBQU8sR0FBUDtBQUNBLFVBQVEsR0FBUjtFQUZjLENBQVQ7Ozs7QUFEcUIsT0FRM0IsQ0FBTyxPQUFQLENBQWUsU0FBZixFQVIyQjtBQVMzQixRQUFPLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFFBQXBCLEVBVDJCOztBQVczQixRQUFPLE1BQVAsQ0FYMkI7Q0FBNUI7O0FBY0EsSUFBSSxFQUFKLENBQU8sc0JBQVAsRUFBK0IsWUFBTTtBQUNwQyxLQUFJLElBQUosR0FEb0M7Q0FBTixDQUEvQjs7QUFJQSxJQUFJLEVBQUosQ0FBTywrQkFBUCxFQUF3QyxZQUFNO0FBQzdDLEtBQUksQ0FBQyxVQUFELEVBQWE7QUFDaEIsZUFBYSxrQkFBYixDQURnQjtFQUFqQjtDQUR1QyxDQUF4Qzs7QUFNQSxJQUFJLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFlBQU07QUFDckIsY0FBYSxrQkFBYixDQURxQjtDQUFOLENBQWhCIiwiZmlsZSI6ImVsZWN0cm9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIF9fZGlybmFtZSwgcHJvY2VzcyAqL1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCdhcHAnKVxuY29uc3QgQnJvd3NlcldpbmRvdyA9IHJlcXVpcmUoJ2Jyb3dzZXItd2luZG93JylcblxucmVxdWlyZSgnY3Jhc2gtcmVwb3J0ZXInKS5zdGFydCgpXG4vLyByZXF1aXJlKCdlbGVjdHJvbi1kZWJ1ZycpKClcblxubGV0IGhvc3QgPSAnaHR0cDovL2xvY2FsaG9zdDo5OTk5J1xubGV0IGluZGV4RmlsZSA9IGAke2hvc3R9L3NlcnZlci9pbmRleC5odG1sYFxuXG5sZXQgbWFpbldpbmRvd1xuXG5mdW5jdGlvbiBvbkNsb3NlZCgpIHtcblx0bWFpbldpbmRvdyA9IG51bGxcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFpbldpbmRvdygpIHtcblx0Y29uc3Qgd2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuXHRcdHdpZHRoOiA2MDAsXG5cdFx0aGVpZ2h0OiA0MDBcblx0fSlcblxuXHQvLyB3aW5kb3cudG9nZ2xlRGV2VG9vbHMoKVxuXG5cdHdpbmRvdy5sb2FkVXJsKGluZGV4RmlsZSlcblx0d2luZG93Lm9uKCdjbG9zZWQnLCBvbkNsb3NlZClcblxuXHRyZXR1cm4gd2luZG93XG59XG5cbmFwcC5vbignd2luZG93ZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7XG5cdGFwcC5xdWl0KClcbn0pXG5cbmFwcC5vbignYWN0aXZhdGUtd2l0aC1uby1vcGVuLXdpbmRvd3MnLCAoKSA9PiB7XG5cdGlmICghbWFpbldpbmRvdykge1xuXHRcdG1haW5XaW5kb3cgPSBjcmVhdGVNYWluV2luZG93KClcblx0fVxufSlcblxuYXBwLm9uKCdyZWFkeScsICgpID0+IHtcblx0bWFpbldpbmRvdyA9IGNyZWF0ZU1haW5XaW5kb3coKVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==